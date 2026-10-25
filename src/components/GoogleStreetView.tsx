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

// Danh mục các điểm di tích hiển thị nhãn nổi trong không gian 360° theo góc phương vị
interface StreetHotspot {
  id: string;
  title: string;
  icon: string;
  azimuth: number; // góc độ theo phương ngang (0-360)
  pitch: number;   // góc độ theo phương dọc (-30 đến +30)
  distance: string;
}

const STREET_HOTSPOTS: Record<string, StreetHotspot[]> = {
  "khuong-ha": [
    { id: "dinh-kh", title: "Đình Khương Hạ (Đình Gừng)", icon: "🏛️", azimuth: 15, pitch: 4, distance: "35m" },
    { id: "chua-pl", title: "Chùa Phụng Lộc (Cổ tự 1690)", icon: "⛩️", azimuth: 140, pitch: 2, distance: "120m" },
    { id: "gieng-kh", title: "Giếng cổ ngõ 29 Kẻ Gừng", icon: "🪣", azimuth: 260, pitch: -6, distance: "50m" },
    { id: "truong-kh", title: "Tổ hợp trường học Khương Hạ", icon: "🏫", azimuth: 320, pitch: 5, distance: "180m" },
  ],
  "khuong-trung": [
    { id: "cong-kt", title: "Cổng làng Khương Trung Cổ Thôn", icon: "🚪", azimuth: 345, pitch: 8, distance: "15m" },
    { id: "dinh-kt", title: "Đình làng Khương Trung", icon: "🏛️", azimuth: 65, pitch: 3, distance: "60m" },
    { id: "chua-td", title: "Chùa Tiêu Dao (Sùng Phúc Tự)", icon: "⛩️", azimuth: 110, pitch: 5, distance: "75m" },
    { id: "dam-hong", title: "Công viên hồ Đầm Hồng", icon: "💧", azimuth: 220, pitch: -2, distance: "250m" },
  ],
  "bui-xuong-trach": [
    { id: "dinh-kd", title: "Đình Khương Đình (Thế kỷ XVII)", icon: "🏛️", azimuth: 25, pitch: 5, distance: "45m" },
    { id: "chua-th", title: "Chùa Tam Huyền (Thời Lý XI)", icon: "⛩️", azimuth: 90, pitch: 4, distance: "80m" },
    { id: "ho-bui", title: "Nhà thờ họ Bùi (Bùi Xương Trạch)", icon: "🏠", azimuth: 195, pitch: 2, distance: "110m" },
    { id: "xom-cham", title: "Cổng Xóm Đức Long Chàm", icon: "🚪", azimuth: 280, pitch: 6, distance: "140m" },
  ],
  "vu-tong-phan": [
    { id: "song-to", title: "Dòng sông Tô Lịch lịch sử", icon: "🌊", azimuth: 180, pitch: -10, distance: "10m" },
    { id: "cau-kd", title: "Cầu Khương Đình & ngã ba sông", icon: "🌉", azimuth: 350, pitch: 1, distance: "90m" },
    { id: "bo-ha-dinh", title: "Phường Hạ Đình (bờ đối diện)", icon: "📍", azimuth: 225, pitch: 2, distance: "40m" },
  ],
  "chua-boc-tay-son": [
    { id: "chua-boc-hs", title: "Chùa Bộc (Di tích QG Đặc biệt)", icon: "⛩️", azimuth: 30, pitch: 6, distance: "25m" },
    { id: "dai-hoc-tl", title: "Đại học Thủy Lợi (Tháp T35)", icon: "🎓", azimuth: 310, pitch: 12, distance: "150m" },
    { id: "dai-hoc-y", title: "Đại học Y Hà Nội (1902)", icon: "🏥", azimuth: 125, pitch: 8, distance: "220m" },
    { id: "go-dd", title: "Gò Đống Đa - Đền Trung Liệt", icon: "⛰️", azimuth: 275, pitch: 5, distance: "300m" },
  ],
  "cong-khuong-dinh": [
    { id: "cong-co", title: "Cổng làng Cổ Khương Đình (Ngõ 125)", icon: "🚪", azimuth: 5, pitch: 8, distance: "10m" },
    { id: "dinh-kd-ngan", title: "Lối vào Đình Khương Đình", icon: "🏛️", azimuth: 45, pitch: 2, distance: "50m" },
    { id: "song-to-lich", title: "Bờ sông Tô Lịch (Đường Vũ Tông Phan)", icon: "🌊", azimuth: 185, pitch: -4, distance: "30m" },
  ],
  "dinh-khuong-thuong": [
    { id: "dinh-kt-165", title: "Đình Khương Thượng số 165", icon: "🏛️", azimuth: 0, pitch: 6, distance: "20m" },
    { id: "mieu-quy-son-hs", title: "Miếu Quy Sơn (Gò Rùa thần)", icon: "⛩️", azimuth: 75, pitch: 3, distance: "40m" },
    { id: "ho-kt", title: "Hồ làng Khương Thượng", icon: "💧", azimuth: 175, pitch: -8, distance: "15m" },
  ],
  "go-dong-da": [
    { id: "go-dd-hs", title: "Gò Đống Đa (Di tích Quốc gia Đặc biệt)", icon: "⛰️", azimuth: 10, pitch: 10, distance: "30m" },
    { id: "chua-dq", title: "Chùa Đồng Quang (Chùa Đống Đa 1840)", icon: "⛩️", azimuth: 195, pitch: 4, distance: "60m" },
    { id: "tuong-qt", title: "Tượng đài Hoàng đế Quang Trung", icon: "👑", azimuth: 110, pitch: 7, distance: "70m" },
  ],
};

export default function GoogleStreetView({
  street,
  allStreets,
  onSelectStreet,
  onClose,
}: GoogleStreetViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [heading, setHeading] = useState<number>(street.bearing || 0);
  const [pitch, setPitch] = useState<number>(0);
  const [zoomFov, setZoomFov] = useState<number>(75);
  const [isAutoTour, setIsAutoTour] = useState<boolean>(false);
  const [showMinimap, setShowMinimap] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<StreetHotspot | null>(null);

  // Three.js scene refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cylinderMeshRef = useRef<THREE.Mesh | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Smooth inertial physics tracking
  const isPointerDown = useRef(false);
  const pointerStartX = useRef(0);
  const pointerStartY = useRef(0);
  const targetLon = useRef(street.bearing || 0);
  const targetLat = useRef(0);
  const targetFov = useRef(75);
  const currentLon = useRef(street.bearing || 0);
  const currentLat = useRef(0);
  const currentFov = useRef(75);

  // ── Khởi tạo Three.js Cylindrical Studio (Phẳng mượt, Không méo cột, Không giật mép)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060b13);
    sceneRef.current = scene;

    // 2. Camera góc rộng tự nhiên
    const camera = new THREE.PerspectiveCamera(currentFov.current, width / height, 1, 2000);
    cameraRef.current = camera;

    // 3. Cylinder Geometry: Không bị bóp nhọn 2 cực như hình cầu
    // Bán kính 500, cao 620, 128 phân đoạn tròn
    const cylinderGeo = new THREE.CylinderGeometry(500, 500, 620, 128, 1, true);
    cylinderGeo.scale(-1, 1, 1); // Đảo mặt vào trong để quan sát từ tâm

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(street.image, () => {
      setIsTransitioning(false);
    });
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = false; // Giữ nguyên độ sắc nét gốc 6.6MB, không dither hột
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.wrapS = THREE.MirroredRepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(2, 1); // Ghép đối xứng mượt mà, triệt tiêu 100% đường nối seam

    const cylinderMat = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    });
    const cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat);
    scene.add(cylinderMesh);
    cylinderMeshRef.current = cylinderMesh;

    // 4. Mặt đường bê tông/nhựa đường chân thực ở đáy (y = -310)
    const groundGeo = new THREE.CircleGeometry(500, 64);
    const groundCanvas = document.createElement("canvas");
    groundCanvas.width = 512;
    groundCanvas.height = 512;
    const gctx = groundCanvas.getContext("2d");
    if (gctx) {
      gctx.fillStyle = "#1e242d";
      gctx.fillRect(0, 0, 512, 512);
      // Vạch sơn đường vàng nhạt
      gctx.strokeStyle = "rgba(245, 158, 11, 0.45)";
      gctx.lineWidth = 14;
      gctx.beginPath();
      gctx.arc(256, 256, 220, 0, Math.PI * 2);
      gctx.stroke();
      // Tâm điểm vị trí đứng
      gctx.fillStyle = "rgba(56, 189, 248, 0.3)";
      gctx.beginPath();
      gctx.arc(256, 256, 45, 0, Math.PI * 2);
      gctx.fill();
    }
    const groundTexture = new THREE.CanvasTexture(groundCanvas);
    const groundMat = new THREE.MeshBasicMaterial({
      map: groundTexture,
      side: THREE.FrontSide,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -309;
    scene.add(groundMesh);

    // 5. Vòm trời tự nhiên ở trần (y = +310)
    const skyGeo = new THREE.CircleGeometry(500, 64);
    const skyCanvas = document.createElement("canvas");
    skyCanvas.width = 256;
    skyCanvas.height = 256;
    const sctx = skyCanvas.getContext("2d");
    if (sctx) {
      const grad = sctx.createRadialGradient(128, 128, 10, 128, 128, 128);
      grad.addColorStop(0, "#bae6fd");
      grad.addColorStop(0.6, "#7dd3fc");
      grad.addColorStop(1, "#38bdf8");
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, 256, 256);
    }
    const skyTexture = new THREE.CanvasTexture(skyCanvas);
    const skyMat = new THREE.MeshBasicMaterial({
      map: skyTexture,
      side: THREE.BackSide,
    });
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    skyMesh.rotation.x = Math.PI / 2;
    skyMesh.position.y = 309;
    scene.add(skyMesh);

    // 6. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 7. Xử lý Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 8. Vòng lặp vật lý camera 60FPS siêu mượt (Smooth Spring Damping)
    const targetLookAt = new THREE.Vector3();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      // Quán tính góc nhìn ngang và dọc
      currentLon.current += (targetLon.current - currentLon.current) * 0.12;
      currentLat.current += (targetLat.current - currentLat.current) * 0.12;
      currentFov.current += (targetFov.current - currentFov.current) * 0.15;

      // Giới hạn góc ngước lên / nhìn xuống tự nhiên
      currentLat.current = Math.max(-42, Math.min(42, currentLat.current));

      // Cập nhật FOV zoom
      camera.fov = currentFov.current;
      camera.updateProjectionMatrix();

      // Tính toán vector nhìn
      const phi = THREE.MathUtils.degToRad(currentLat.current);
      const theta = THREE.MathUtils.degToRad(currentLon.current);

      targetLookAt.x = 480 * Math.sin(theta) * Math.cos(phi);
      targetLookAt.y = 480 * Math.sin(phi);
      targetLookAt.z = 480 * Math.cos(theta) * Math.cos(phi);

      camera.lookAt(targetLookAt);
      renderer.render(scene, camera);

      // Cập nhật State cho HUD minimap
      const normHeading = Math.round(((currentLon.current % 360) + 360) % 360);
      setHeading(normHeading);
      setPitch(Math.round(currentLat.current));
      setZoomFov(Math.round(currentFov.current));
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      cylinderGeo.dispose();
      cylinderMat.dispose();
      texture.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      skyGeo.dispose();
      skyMat.dispose();
      renderer.dispose();
    };
  }, []);

  // ── Chuyển đổi Texture khi chọn tuyến phố khác (Siêu nét, không nháy)
  useEffect(() => {
    if (!cylinderMeshRef.current) return;
    setIsTransitioning(true);
    setActiveHotspot(null);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      street.image,
      (newTexture) => {
        newTexture.colorSpace = THREE.SRGBColorSpace;
        newTexture.generateMipmaps = false;
        newTexture.minFilter = THREE.LinearFilter;
        newTexture.magFilter = THREE.LinearFilter;
        newTexture.wrapS = THREE.MirroredRepeatWrapping;
        newTexture.wrapT = THREE.ClampToEdgeWrapping;
        newTexture.repeat.set(2, 1);

        if (cylinderMeshRef.current) {
          const mat = cylinderMeshRef.current.material as THREE.MeshBasicMaterial;
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

    targetLon.current = street.bearing || 0;
    targetLat.current = 0;
  }, [street]);

  // ── Auto Walk / Tour
  useEffect(() => {
    if (!isAutoTour) return;
    const interval = setInterval(() => {
      targetLon.current = (targetLon.current + 0.35) % 360;
    }, 30);
    return () => clearInterval(interval);
  }, [isAutoTour]);

  // ── Kéo chuột / Vuốt màn hình 360 độ siêu nhạy & mượt
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    isPointerDown.current = true;
    pointerStartX.current = e.clientX;
    pointerStartY.current = e.clientY;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;
    const deltaX = e.clientX - pointerStartX.current;
    const deltaY = e.clientY - pointerStartY.current;

    pointerStartX.current = e.clientX;
    pointerStartY.current = e.clientY;

    const sens = (currentFov.current / 75) * 0.22;
    targetLon.current -= deltaX * sens;
    targetLat.current += deltaY * sens;
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDown.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
  }, []);

  // ── Cuộn chuột để Zoom In / Zoom Out
  const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    targetFov.current = Math.max(35, Math.min(88, targetFov.current + e.deltaY * 0.04));
  }, []);

  // ── Nút điều khiển Zoom
  const handleZoom = (delta: number) => {
    targetFov.current = Math.max(35, Math.min(88, targetFov.current + delta));
  };

  // ── Nút xoay về hướng Bắc (0°)
  const handleResetNorth = () => {
    targetLon.current = 0;
    targetLat.current = 0;
  };

  // ── Toàn màn hình
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.parentElement?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // ── Bước tiếp sang điểm phố kế tiếp (Hiệu ứng Zoom-step Google Maps)
  const handleStepForward = () => {
    const currentIndex = allStreets.findIndex((s) => s.id === street.id);
    const nextIndex = (currentIndex + 1) % allStreets.length;

    // Hiệu ứng lao về phía trước trước khi đổi cảnh
    targetFov.current = Math.max(30, targetFov.current - 18);
    setTimeout(() => {
      onSelectStreet(allStreets[nextIndex]);
      targetFov.current = 75;
    }, 280);
  };

  // Lấy danh sách điểm di tích của tuyến phố hiện tại
  const currentHotspots = STREET_HOTSPOTS[street.id] || [];

  return (
    <div className="google-streetview-root">
      {/* 360 WebGL Cylindrical Viewport */}
      <div
        ref={containerRef}
        className="google-streetview-canvas"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      />

      {/* Hiệu ứng chuyển cảnh loading mượt mà */}
      {isTransitioning && (
        <div className="google-streetview-loader">
          <div className="google-loader-spinner" />
          <div className="google-loader-text">Đang tải góc nhìn toàn cảnh 360° {street.short_name}...</div>
        </div>
      )}

      {/* ── TOP-LEFT: Google Maps Street View Official Card */}
      <div className="google-streetview-topbar">
        <button
          className="google-streetview-back-btn"
          onClick={onClose}
          title="Quay lại Bản đồ Di sản 3D Làng Trong Phố"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        <div className="google-streetview-info-box">
          <div className="google-streetview-title-row">
            <h1 className="google-streetview-title">{street.name}</h1>
            <span className="google-streetview-badge-360">Toàn cảnh 360°</span>
          </div>
          <div className="google-streetview-subtitle">
            <span>📍 {street.village}</span>
            <span className="google-dot-sep">·</span>
            <span>Hà Nội, Việt Nam</span>
          </div>
          <div className="google-streetview-meta">
            <span className="google-meta-tag">Ảnh thực địa sắc nét & Di sản Google Maps</span>
            <span className="google-dot-sep">·</span>
            <span>Tháng 5/2024</span>
          </div>
        </div>

        <div className="google-streetview-top-actions">
          <button
            className={`google-action-pill ${isAutoTour ? "active" : ""}`}
            onClick={() => setIsAutoTour(!isAutoTour)}
            title="Bật/Tắt tự động dạo phố xoay 360°"
          >
            <span>{isAutoTour ? "⏸️ Dừng dạo phố" : "🚶 Tự động dạo phố"}</span>
          </button>
          <a
            href={street.google_street_url}
            target="_blank"
            rel="noopener noreferrer"
            className="google-action-pill google-pill-external"
            title="Mở tọa độ chính thức trên Google Maps Street View"
          >
            <span>🗺️ Mở Google Maps ↗</span>
          </a>
        </div>
      </div>

      {/* ── GROUND NAVIGATION DISC: Nút mũi tên bước tiếp trên mặt đường kiểu Google Maps */}
      <div
        className="google-streetview-floor-arrow"
        onClick={handleStepForward}
        title="Bước tiếp sang đoạn phố di sản tiếp theo"
      >
        <div className="floor-chevron-disc">
          <span className="floor-chevron-arrow">▲</span>
          <span className="floor-chevron-sub">Đi tiếp</span>
        </div>
      </div>

      {/* ── FLOATING HOTSPOTS OVERLAY: Các điểm di tích nổi trực quan theo góc nhìn */}
      <div className="google-hotspots-container">
        {currentHotspots.map((h) => {
          // Tính khoảng cách góc nhìn so với camera hiện tại
          const diffAzimuth = ((h.azimuth - heading + 540) % 360) - 180;
          const isVisible = Math.abs(diffAzimuth) < (zoomFov / 2) * 1.2;

          if (!isVisible) return null;

          // Vị trí phần trăm trên màn hình
          const screenX = 50 + (diffAzimuth / (zoomFov / 2)) * 45;
          const screenY = 50 - ((h.pitch - pitch) / 35) * 35;

          return (
            <div
              key={h.id}
              className={`google-hotspot-badge ${activeHotspot?.id === h.id ? "active" : ""}`}
              style={{ left: `${screenX}%`, top: `${screenY}%` }}
              onClick={() => setActiveHotspot(activeHotspot?.id === h.id ? null : h)}
            >
              <span className="hotspot-icon">{h.icon}</span>
              <span className="hotspot-text">{h.title}</span>
              <span className="hotspot-dist">{h.distance}</span>
            </div>
          );
        })}
      </div>

      {/* ── BOTTOM-LEFT: Radar Minimap định vị vệ tinh với nón FOV và Pegman */}
      <div className={`google-streetview-minimap-wrapper ${showMinimap ? "expanded" : "collapsed"}`}>
        <div className="google-minimap-header">
          <span className="google-minimap-title">ĐỊNH VỊ VỆ TINH · RADAR PHỐ</span>
          <button
            className="google-minimap-toggle"
            onClick={() => setShowMinimap(!showMinimap)}
            title={showMinimap ? "Thu nhỏ radar" : "Mở rộng radar"}
          >
            {showMinimap ? "↙" : "↗"}
          </button>
        </div>

        {showMinimap && (
          <div className="google-minimap-body">
            <div className="google-radar-container">
              {/* Lưới tọa độ radar */}
              <div className="google-radar-grid" />
              <div className="google-radar-street-line line-horizontal" />
              <div className="google-radar-street-line line-vertical" />

              {/* Các điểm mốc quanh tuyến phố */}
              <div className="radar-landmark-dot lm-1" title="Điểm di tích A">🏛️</div>
              <div className="radar-landmark-dot lm-2" title="Điểm di tích B">⛩️</div>
              <div className="radar-landmark-dot lm-3" title="Sông Tô Lịch">🌊</div>

              {/* Pegman đứng ở tâm cùng nón tầm mắt xoay live theo camera */}
              <div className="google-radar-user">
                <div
                  className="google-radar-cone"
                  style={{
                    transform: `rotate(${heading}deg)`,
                  }}
                />
                <div className="google-pegman-marker" title="Bạn đang đứng tại đây">
                  🚶
                </div>
              </div>
            </div>

            <div className="google-radar-footer">
              <span>Hướng: {heading}° ({heading >= 315 || heading < 45 ? "Bắc" : heading < 135 ? "Đông" : heading < 225 ? "Nam" : "Tây"})</span>
              <span className="google-dot-sep">·</span>
              <span>Cao độ: 1.7m</span>
            </div>
          </div>
        )}
      </div>

      {/* ── BOTTOM-RIGHT: Cụm điều khiển Google Maps chuẩn */}
      <div className="google-streetview-controls">
        {/* La bàn Bắc snap */}
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

        {/* Cụm Zoom In / Zoom Out */}
        <div className="google-zoom-group">
          <button
            className="google-ctrl-btn google-zoom-btn"
            onClick={() => handleZoom(-10)}
            title="Phóng to góc nhìn (+)"
          >
            +
          </button>
          <div className="google-ctrl-divider" />
          <button
            className="google-ctrl-btn google-zoom-btn"
            onClick={() => handleZoom(10)}
            title="Thu nhỏ góc nhìn (−)"
          >
            −
          </button>
        </div>

        {/* Nút Toàn màn hình */}
        <button
          className="google-ctrl-btn google-fullscreen-btn"
          onClick={toggleFullscreen}
          title={isFullscreen ? "Thoát toàn màn hình" : "Chế độ toàn màn hình"}
        >
          {isFullscreen ? "⤓" : "⛶"}
        </button>
      </div>

      {/* ── BOTTOM: Carousel danh sách 8 tuyến phố di sản có xem trước thực tế */}
      <div className="google-streetview-carousel">
        <div className="google-carousel-label">
          <span>TUYẾN PHỐ DI SẢN LÀNG TRONG PHỐ ({allStreets.length} ĐIỂM)</span>
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
