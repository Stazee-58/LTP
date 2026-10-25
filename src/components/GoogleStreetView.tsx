"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { type StreetViewPreset } from "@/app/page";

interface GoogleStreetViewProps {
  street: StreetViewPreset;
  allStreets: StreetViewPreset[];
  onSelectStreet: (s: StreetViewPreset) => void;
  onClose: () => void;
}

export default function GoogleStreetView({
  street,
  allStreets,
  onSelectStreet,
  onClose,
}: GoogleStreetViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const minimapRef = useRef<HTMLDivElement>(null);
  const [heading, setHeading] = useState<number>(street.bearing || 0);
  const [pitch, setPitch] = useState<number>(0);
  const [zoomFov, setZoomFov] = useState<number>(75);
  const [isAutoTour, setIsAutoTour] = useState<boolean>(false);
  const [showMinimap, setShowMinimap] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Three.js refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereMeshRef = useRef<THREE.Mesh | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Interaction tracking refs
  const isUserInteracting = useRef(false);
  const onPointerDownPointerX = useRef(0);
  const onPointerDownPointerY = useRef(0);
  const onPointerDownLon = useRef(0);
  const onPointerDownLat = useRef(0);
  const lonRef = useRef(street.bearing || 0);
  const latRef = useRef(0);
  const fovRef = useRef(75);

  // ── Init Three.js 360 Panorama Sphere
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(fovRef.current, width / height, 1, 1200);
    const target = new THREE.Vector3(0, 0, 0);
    cameraRef.current = camera;

    // Inverted Sphere for 360 Interior Panorama
    const geometry = new THREE.SphereGeometry(500, 64, 40);
    geometry.scale(-1, 1, 1);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(street.image, () => {
      setIsTransitioning(false);
    });
    texture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphereMesh = new THREE.Mesh(geometry, material);
    scene.add(sphereMesh);
    sphereMeshRef.current = sphereMesh;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Render loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      // Lat clamp
      latRef.current = Math.max(-82, Math.min(82, latRef.current));

      const phi = THREE.MathUtils.degToRad(90 - latRef.current);
      const theta = THREE.MathUtils.degToRad(lonRef.current);

      target.x = 500 * Math.sin(phi) * Math.cos(theta);
      target.y = 500 * Math.cos(phi);
      target.z = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(target);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []); // Run once on mount

  // ── Change street texture when selected street changes
  useEffect(() => {
    if (!sphereMeshRef.current) return;
    setIsTransitioning(true);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      street.image,
      (newTexture) => {
        newTexture.colorSpace = THREE.SRGBColorSpace;
        if (sphereMeshRef.current) {
          const mat = sphereMeshRef.current.material as THREE.MeshBasicMaterial;
          mat.map?.dispose();
          mat.map = newTexture;
          mat.needsUpdate = true;
        }
        setIsTransitioning(false);
      },
      undefined,
      () => {
        setIsTransitioning(false);
      }
    );
    lonRef.current = street.bearing || 0;
    latRef.current = 0;
    setHeading(street.bearing || 0);
    setPitch(0);
  }, [street]);

  // ── Auto Walk / Tour Loop
  useEffect(() => {
    if (!isAutoTour) return;
    const interval = setInterval(() => {
      lonRef.current = (lonRef.current + 0.25) % 360;
      setHeading(Math.round(lonRef.current));
    }, 30);
    return () => clearInterval(interval);
  }, [isAutoTour]);

  // ── Mouse & Touch Event Handlers for 360 drag
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    isUserInteracting.current = true;
    onPointerDownPointerX.current = e.clientX;
    onPointerDownPointerY.current = e.clientY;
    onPointerDownLon.current = lonRef.current;
    onPointerDownLat.current = latRef.current;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isUserInteracting.current) return;
    const sensitivity = (fovRef.current / 75) * 0.18;
    lonRef.current =
      (onPointerDownPointerX.current - e.clientX) * sensitivity + onPointerDownLon.current;
    latRef.current =
      (e.clientY - onPointerDownPointerY.current) * sensitivity + onPointerDownLat.current;

    setHeading(Math.round(((lonRef.current % 360) + 360) % 360));
    setPitch(Math.round(latRef.current));
  }, []);

  const onPointerUp = useCallback(() => {
    isUserInteracting.current = false;
  }, []);

  const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFov = Math.max(38, Math.min(95, fovRef.current + e.deltaY * 0.05));
    fovRef.current = newFov;
    setZoomFov(Math.round(newFov));
    if (cameraRef.current) {
      cameraRef.current.fov = newFov;
      cameraRef.current.updateProjectionMatrix();
    }
  }, []);

  // ── Navigation Controls
  const handleZoom = (delta: number) => {
    const newFov = Math.max(38, Math.min(95, fovRef.current + delta));
    fovRef.current = newFov;
    setZoomFov(Math.round(newFov));
    if (cameraRef.current) {
      cameraRef.current.fov = newFov;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  const handleResetNorth = () => {
    lonRef.current = 0;
    latRef.current = 0;
    setHeading(0);
    setPitch(0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.parentElement?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Step to next street preset (Floor navigation chevron)
  const handleStepForward = () => {
    const currentIndex = allStreets.findIndex((s) => s.id === street.id);
    const nextIndex = (currentIndex + 1) % allStreets.length;
    onSelectStreet(allStreets[nextIndex]);
  };

  return (
    <div className="google-streetview-root">
      {/* 360 WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        className="google-streetview-canvas"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      />

      {/* Street View Transition Fade */}
      {isTransitioning && (
        <div className="google-streetview-loader">
          <div className="google-loader-spinner" />
          <div className="google-loader-text">Đang tải góc nhìn 360° {street.short_name}...</div>
        </div>
      )}

      {/* ── TOP-LEFT: Google Maps Street View Exact Header Card */}
      <div className="google-streetview-topbar">
        <button
          className="google-streetview-back-btn"
          onClick={onClose}
          title="Quay lại bản đồ di tích Làng Trong Phố"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        <div className="google-streetview-info-box">
          <div className="google-streetview-title-row">
            <h1 className="google-streetview-title">{street.name}</h1>
            <span className="google-streetview-badge-360">Ảnh 360°</span>
          </div>
          <div className="google-streetview-subtitle">
            <span>📍 {street.village}</span>
            <span className="google-dot-sep">·</span>
            <span>Hà Nội, Việt Nam</span>
          </div>
          <div className="google-streetview-meta">
            <span className="google-meta-tag">Google Maps & Thực địa Di sản</span>
            <span className="google-dot-sep">·</span>
            <span>Thg 5/2024</span>
          </div>
        </div>

        <div className="google-streetview-top-actions">
          <button
            className={`google-action-pill ${isAutoTour ? "active" : ""}`}
            onClick={() => setIsAutoTour(!isAutoTour)}
            title="Tự động xoay dạo phố"
          >
            <span>{isAutoTour ? "⏸️ Dừng dạo" : "🚶 Dạo phố tự động"}</span>
          </button>
          <a
            href={street.google_street_url}
            target="_blank"
            rel="noopener noreferrer"
            className="google-action-pill google-pill-external"
            title="Mở toàn cảnh 360 trực tiếp trên Google Maps"
          >
            <span>🌐 Xem trên Google Maps</span>
            <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>↗</span>
          </a>
        </div>
      </div>

      {/* ── CENTER GROUND: Google Maps Chevrons / Floor Navigation Arrow */}
      <div className="google-streetview-floor-arrow" onClick={handleStepForward} title="Bước tiếp sang điểm phố kế tiếp">
        <div className="floor-chevron-disc">
          <div className="floor-chevron-arrow">▲</div>
          <div className="floor-chevron-sub">Đi tiếp phố di sản</div>
        </div>
      </div>

      {/* ── BOTTOM-LEFT: Google Maps Radar Minimap (Picture-in-Picture) */}
      <div className={`google-streetview-minimap-wrapper ${showMinimap ? "expanded" : "collapsed"}`}>
        <div className="google-minimap-header">
          <span className="google-minimap-title">VỊ TRÍ TRÊN BẢN ĐỒ</span>
          <button
            className="google-minimap-toggle"
            onClick={() => setShowMinimap(!showMinimap)}
            title={showMinimap ? "Thu nhỏ bản đồ" : "Mở rộng bản đồ"}
          >
            {showMinimap ? "↙" : "↗"}
          </button>
        </div>

        {showMinimap && (
          <div ref={minimapRef} className="google-minimap-body">
            {/* Radar Circle Representation */}
            <div className="google-radar-container">
              {/* Village Map Schematic Background */}
              <div className="google-radar-grid" />
              <div className="google-radar-street-line line-horizontal" />
              <div className="google-radar-street-line line-vertical" />

              {/* Surrounding Landmark Dots */}
              <div className="radar-landmark-dot lm-1" title="Đình Khương Hạ">🏛️</div>
              <div className="radar-landmark-dot lm-2" title="Chùa Phụng Lộc">⛩️</div>
              <div className="radar-landmark-dot lm-3" title="Sông Tô Lịch">🌊</div>

              {/* User Center Position with Rotating Radar Cone */}
              <div className="google-radar-user">
                <div
                  className="google-radar-cone"
                  style={{
                    transform: `rotate(${heading}deg)`,
                  }}
                />
                <div className="google-pegman-marker" title="Vị trí của bạn (Góc nhìn tầm mắt)">
                  🚶
                </div>
              </div>
            </div>

            <div className="google-radar-footer">
              <span>Góc nhìn: {heading}° ({heading >= 315 || heading < 45 ? "Bắc" : heading < 135 ? "Đông" : heading < 225 ? "Nam" : "Tây"})</span>
              <span className="google-dot-sep">·</span>
              <span>Độ cao: 1.7m</span>
            </div>
          </div>
        )}
      </div>

      {/* ── BOTTOM-RIGHT: Google Maps Navigation Controls */}
      <div className="google-streetview-controls">
        {/* Compass Dial */}
        <button
          className="google-ctrl-btn google-compass-btn"
          onClick={handleResetNorth}
          title="Xoay về hướng chính Bắc (0°)"
        >
          <div
            className="google-compass-needle"
            style={{ transform: `rotate(${-heading}deg)` }}
          >
            <div className="compass-n">▲</div>
            <div className="compass-s">▼</div>
          </div>
        </button>

        {/* Zoom In & Out Pill */}
        <div className="google-zoom-group">
          <button
            className="google-ctrl-btn google-zoom-btn"
            onClick={() => handleZoom(-10)}
            title="Phóng to góc nhìn"
          >
            +
          </button>
          <div className="google-ctrl-divider" />
          <button
            className="google-ctrl-btn google-zoom-btn"
            onClick={() => handleZoom(10)}
            title="Thu nhỏ góc nhìn"
          >
            −
          </button>
        </div>

        {/* Fullscreen Button */}
        <button
          className="google-ctrl-btn google-fullscreen-btn"
          onClick={toggleFullscreen}
          title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
        >
          {isFullscreen ? "⤓" : "⛶"}
        </button>
      </div>

      {/* ── BOTTOM: Google Maps Street Carousel / Time Machine Filmstrip */}
      <div className="google-streetview-carousel">
        <div className="google-carousel-label">
          <span>CHỌN TUYẾN PHỐ DI SẢN ({allStreets.length} ĐIỂM)</span>
        </div>
        <div className="google-carousel-scroll">
          {allStreets.map((s) => (
            <button
              key={s.id}
              className={`google-carousel-card ${s.id === street.id ? "active" : ""}`}
              onClick={() => onSelectStreet(s)}
            >
              <div className="google-card-thumb-wrapper">
                <img src={s.image} alt={s.name} className="google-card-thumb" />
                <span className="google-card-badge">{s.icon}</span>
                {s.id === street.id && <span className="google-card-active-glow">ĐANG XEM</span>}
              </div>
              <div className="google-card-meta">
                <div className="google-card-name">{s.short_name}</div>
                <div className="google-card-sub">{s.village.split("·")[0].trim()}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
