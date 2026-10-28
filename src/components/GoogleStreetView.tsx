"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { type StreetViewPreset } from "@/app/page";

interface GoogleStreetViewProps {
  street: StreetViewPreset;
  allStreets: StreetViewPreset[];
  onSelectStreet: (s: StreetViewPreset) => void;
  onClose: () => void;
}

interface StreetHotspot {
  id: string;
  title: string;
  icon: string;
  posX: number;
  posY: number;
  distance: string;
}

const STREET_HOTSPOTS: Record<string, StreetHotspot[]> = {
  "khuong-ha": [
    { id: "dinh-kh", title: "Đình Khương Hạ (Đình Gừng)", icon: "🏛️", posX: 22, posY: 42, distance: "35m" },
    { id: "chua-pl", title: "Chùa Phụng Lộc (Cổ tự 1690)", icon: "⛩️", posX: 68, posY: 38, distance: "120m" },
    { id: "gieng-kh", title: "Giếng cổ ngõ 29 Kẻ Gừng", icon: "🪣", posX: 45, posY: 55, distance: "50m" },
    { id: "truong-kh", title: "Tổ hợp trường học Khương Hạ", icon: "🏫", posX: 80, posY: 32, distance: "180m" },
  ],
  "khuong-trung": [
    { id: "cong-kt", title: "Cổng làng Khương Trung Cổ Thôn", icon: "🚪", posX: 18, posY: 44, distance: "15m" },
    { id: "dinh-kt", title: "Đình làng Khương Trung", icon: "🏛️", posX: 55, posY: 38, distance: "60m" },
    { id: "chua-td", title: "Chùa Tiêu Dao (Sùng Phúc Tự)", icon: "⛩️", posX: 72, posY: 35, distance: "75m" },
    { id: "dam-hong", title: "Công viên hồ Đầm Hồng", icon: "💧", posX: 40, posY: 60, distance: "250m" },
  ],
  "bui-xuong-trach": [
    { id: "dinh-kd", title: "Đình Khương Đình (Thế kỷ XVII)", icon: "🏛️", posX: 25, posY: 40, distance: "45m" },
    { id: "chua-th", title: "Chùa Tam Huyền (Thời Lý XI)", icon: "⛩️", posX: 60, posY: 36, distance: "80m" },
    { id: "ho-bui", title: "Nhà thờ họ Bùi (Bùi Xương Trạch)", icon: "🏠", posX: 78, posY: 42, distance: "110m" },
    { id: "xom-cham", title: "Cổng Xóm Đức Long Chàm", icon: "🚪", posX: 42, posY: 55, distance: "140m" },
  ],
  "vu-tong-phan": [
    { id: "song-to", title: "Dòng sông Tô Lịch lịch sử", icon: "🌊", posX: 30, posY: 62, distance: "10m" },
    { id: "cau-kd", title: "Cầu Khương Đình & ngã ba sông", icon: "🌉", posX: 65, posY: 40, distance: "90m" },
    { id: "bo-ha-dinh", title: "Phường Hạ Đình (bờ đối diện)", icon: "📍", posX: 50, posY: 45, distance: "40m" },
  ],
  "chua-boc-tay-son": [
    { id: "chua-boc-hs", title: "Chùa Bộc (Di tích QG Đặc biệt)", icon: "⛩️", posX: 20, posY: 38, distance: "25m" },
    { id: "dai-hoc-tl", title: "Đại học Thủy Lợi (Tháp T35)", icon: "🎓", posX: 72, posY: 28, distance: "150m" },
    { id: "dai-hoc-y", title: "Đại học Y Hà Nội (1902)", icon: "🏥", posX: 48, posY: 34, distance: "220m" },
    { id: "go-dd", title: "Gò Đống Đa - Đền Trung Liệt", icon: "⛰️", posX: 82, posY: 38, distance: "300m" },
  ],
  "cong-khuong-dinh": [
    { id: "cong-co", title: "Cổng làng Cổ Khương Đình (Ngõ 125)", icon: "🚪", posX: 42, posY: 36, distance: "10m" },
    { id: "dinh-kd-ngan", title: "Lối vào Đình Khương Đình", icon: "🏛️", posX: 22, posY: 44, distance: "50m" },
    { id: "song-to-lich", title: "Bờ sông Tô Lịch (Đường Vũ Tông Phan)", icon: "🌊", posX: 75, posY: 56, distance: "30m" },
  ],
  "dinh-khuong-thuong": [
    { id: "dinh-kt-165", title: "Đình Khương Thượng số 165", icon: "🏛️", posX: 35, posY: 36, distance: "20m" },
    { id: "mieu-quy-son-hs", title: "Miếu Quy Sơn (Gò Rùa thần)", icon: "⛩️", posX: 65, posY: 40, distance: "40m" },
    { id: "ho-kt", title: "Hồ làng Khương Thượng", icon: "💧", posX: 50, posY: 62, distance: "15m" },
  ],
  "go-dong-da": [
    { id: "go-dd-hs", title: "Gò Đống Đa (Di tích Quốc gia Đặc biệt)", icon: "⛰️", posX: 30, posY: 32, distance: "30m" },
    { id: "chua-dq", title: "Chùa Đồng Quang (Chùa Đống Đa 1840)", icon: "⛩️", posX: 68, posY: 42, distance: "60m" },
    { id: "tuong-qt", title: "Tượng đài Hoàng đế Quang Trung", icon: "👑", posX: 50, posY: 38, distance: "70m" },
  ],
};

const KEN_BURNS_PRESETS = [
  { fromScale: 1.05, toScale: 1.18, fromX: "0%", toX: "-5%", fromY: "0%", toY: "-3%" },
  { fromScale: 1.12, toScale: 1.04, fromX: "-4%", toX: "2%", fromY: "-2%", toY: "1%" },
  { fromScale: 1.08, toScale: 1.16, fromX: "3%", toX: "-3%", fromY: "1%", toY: "-2%" },
  { fromScale: 1.15, toScale: 1.06, fromX: "-2%", toX: "4%", fromY: "-3%", toY: "0%" },
  { fromScale: 1.06, toScale: 1.14, fromX: "0%", toX: "-4%", fromY: "2%", toY: "-1%" },
  { fromScale: 1.10, toScale: 1.04, fromX: "-3%", toX: "2%", fromY: "0%", toY: "2%" },
  { fromScale: 1.04, toScale: 1.15, fromX: "2%", toX: "-2%", fromY: "-1%", toY: "2%" },
  { fromScale: 1.13, toScale: 1.05, fromX: "0%", toX: "3%", fromY: "-2%", toY: "1%" },
];

export default function GoogleStreetView({
  street,
  allStreets,
  onSelectStreet,
  onClose,
}: GoogleStreetViewProps) {
  const [heading, setHeading] = useState<number>(street.bearing || 0);
  const [isAutoTour, setIsAutoTour] = useState<boolean>(false);
  const [showMinimap, setShowMinimap] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<StreetHotspot | null>(null);
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [kenBurnsKey, setKenBurnsKey] = useState<number>(0);
  const [panX, setPanX] = useState(50);
  const [panY, setPanY] = useState(50);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [wasDragged, setWasDragged] = useState(false);

  const isDragging = useRef(false);
  const startDragX = useRef(0);
  const startDragY = useRef(0);
  const startPanX = useRef(50);
  const startPanY = useRef(50);
  const autoTourRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const streetIndex = allStreets.findIndex((s) => s.id === street.id);
  const preset = KEN_BURNS_PRESETS[Math.abs(streetIndex) % KEN_BURNS_PRESETS.length];

  useEffect(() => {
    setIsTransitioning(true);
    setImgLoaded(false);
    setActiveHotspot(null);
    setPanX(50);
    setPanY(50);
    setWasDragged(false);

    const img = new Image();
    img.src = street.image;
    img.onload = () => {
      setImgLoaded(true);
      setIsTransitioning(false);
      setKenBurnsKey((k) => k + 1);
    };
    img.onerror = () => {
      setImgLoaded(true);
      setIsTransitioning(false);
    };
    return () => { img.onload = null; img.onerror = null; };
  }, [street]);

  useEffect(() => {
    if (autoTourRef.current) clearInterval(autoTourRef.current);
    if (!isAutoTour) return;
    autoTourRef.current = setInterval(() => {
      setPanX((x) => { const next = x + 0.1; return next > 68 ? 32 : next; });
      setHeading((h) => Math.round(((h + 1) % 360 + 360) % 360));
    }, 50);
    return () => { if (autoTourRef.current) clearInterval(autoTourRef.current); };
  }, [isAutoTour]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const tgt = e.target as HTMLElement;
    if (tgt.closest(".google-hotspot-badge, .google-streetview-topbar, .google-streetview-controls, .google-streetview-minimap-wrapper, .google-streetview-carousel, .google-streetview-floor-arrow")) return;
    isDragging.current = true;
    startDragX.current = e.clientX;
    startDragY.current = e.clientY;
    startPanX.current = panX;
    startPanY.current = panY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [panX, panY]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startDragX.current;
    const dy = e.clientY - startDragY.current;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) setWasDragged(true);
    const sens = 0.03;
    const newX = Math.max(28, Math.min(72, startPanX.current - dx * sens));
    const newY = Math.max(28, Math.min(72, startPanY.current - dy * sens));
    setPanX(newX);
    setPanY(newY);
    setHeading(Math.round(((newX - 50) * 3.6 + 180 + 360) % 360));
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
  }, []);

  const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    setZoomLevel((z) => Math.max(0.85, Math.min(1.65, z - e.deltaY * 0.001)));
  }, []);

  const handleResetNorth = () => { setPanX(50); setPanY(50); setHeading(street.bearing || 0); };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const handleStepForward = () => {
    const idx = allStreets.findIndex((s) => s.id === street.id);
    const nextIdx = (idx + 1) % allStreets.length;
    setIsTransitioning(true);
    setTimeout(() => onSelectStreet(allStreets[nextIdx]), 200);
  };

  const currentHotspots = STREET_HOTSPOTS[street.id] || [];

  // Mid-animation scale for the draggable layer
  const midScale = ((preset.fromScale + preset.toScale) / 2) * zoomLevel;

  return (
    <div
      className="google-streetview-root"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
      style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
    >
      {/* ── MAIN PHOTO STAGE */}
      <div className="sv-photo-stage">
        {imgLoaded && (
          <div
            key={kenBurnsKey}
            className="sv-photo-bg sv-photo-current"
            style={{
              backgroundImage: `url(${street.image})`,
              backgroundPosition: `${panX}% ${panY}%`,
              transform: `scale(${midScale})`,
              animation: `svKenBurns_${kenBurnsKey % 2} 18s ease-in-out forwards`,
            }}
          />
        )}
        <div className="sv-photo-vignette" />
        <div className="sv-photo-ground-grad" />
        <div className="sv-photo-sky-grad" />
      </div>

      {/* CSS Ken Burns keyframe injection */}
      <style>{`
        @keyframes svKenBurns_0 {
          from { transform: scale(${preset.fromScale * zoomLevel}) translate(${preset.fromX}, ${preset.fromY}); }
          to   { transform: scale(${preset.toScale   * zoomLevel}) translate(${preset.toX},   ${preset.toY}  ); }
        }
        @keyframes svKenBurns_1 {
          from { transform: scale(${preset.fromScale * zoomLevel}) translate(${preset.fromX}, ${preset.fromY}); }
          to   { transform: scale(${preset.toScale   * zoomLevel}) translate(${preset.toX},   ${preset.toY}  ); }
        }
      `}</style>

      {/* Loading overlay */}
      {isTransitioning && (
        <div className="google-streetview-loader">
          <div className="google-loader-spinner" />
          <div className="google-loader-text">Đang tải ảnh thực địa {street.short_name}...</div>
        </div>
      )}

      {/* ── TOP-LEFT: Info Card */}
      <div className="google-streetview-topbar">
        <button className="google-streetview-back-btn" onClick={onClose} title="Quay lại Bản đồ Di sản 3D Làng Trong Phố">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>

        <div className="google-streetview-info-box">
          <div className="google-streetview-title-row">
            <h1 className="google-streetview-title">{street.name}</h1>
            <span className="google-streetview-badge-360">📷 Ảnh Thực Địa</span>
          </div>
          <div className="google-streetview-subtitle">
            <span>📍 {street.village}</span>
            <span className="google-dot-sep">·</span>
            <span>Hà Nội, Việt Nam</span>
          </div>
          <div className="google-streetview-meta">
            <span className="google-meta-tag">{street.image_caption}</span>
            <span className="google-dot-sep">·</span>
            <span>Tháng 5/2024</span>
          </div>
        </div>

        <div className="google-streetview-top-actions">
          <button
            className={`google-action-pill ${isAutoTour ? "active" : ""}`}
            onClick={() => setIsAutoTour(!isAutoTour)}
          >
            <span>{isAutoTour ? "⏸️ Dừng dạo phố" : "🚶 Tự động dạo phố"}</span>
          </button>
          <a
            href={street.google_street_url}
            target="_blank"
            rel="noopener noreferrer"
            className="google-action-pill google-pill-external"
          >
            <span>🗺️ Mở Google Maps ↗</span>
          </a>
        </div>
      </div>

      {/* Drag hint */}
      {imgLoaded && !wasDragged && (
        <div className="sv-drag-hint" aria-hidden>
          <span>↔ Kéo để khám phá · Cuộn để zoom</span>
        </div>
      )}

      {/* ── GROUND NAV DISC */}
      <div className="google-streetview-floor-arrow" onClick={handleStepForward} title="Bước tiếp sang đoạn phố di sản tiếp theo">
        <div className="floor-chevron-disc">
          <span className="floor-chevron-arrow">▲</span>
          <span className="floor-chevron-sub">Đi tiếp</span>
        </div>
      </div>

      {/* ── FLOATING HOTSPOTS */}
      <div className="google-hotspots-container">
        {currentHotspots.map((h) => (
          <div
            key={h.id}
            className={`google-hotspot-badge ${activeHotspot?.id === h.id ? "active" : ""}`}
            style={{ left: `${h.posX}%`, top: `${h.posY}%` }}
            onClick={() => setActiveHotspot(activeHotspot?.id === h.id ? null : h)}
          >
            <span className="hotspot-icon">{h.icon}</span>
            <span className="hotspot-text">{h.title}</span>
            <span className="hotspot-dist">{h.distance}</span>
          </div>
        ))}
      </div>

      {/* ── MINIMAP (Bottom-Left) */}
      <div className={`google-streetview-minimap-wrapper ${showMinimap ? "expanded" : "collapsed"}`}>
        <div className="google-minimap-header">
          <span className="google-minimap-title">ĐỊNH VỊ VỆ TINH · RADAR PHỐ</span>
          <button className="google-minimap-toggle" onClick={() => setShowMinimap(!showMinimap)}>
            {showMinimap ? "↙" : "↗"}
          </button>
        </div>
        {showMinimap && (
          <div className="google-minimap-body">
            <div className="google-radar-container">
              <div className="google-radar-grid" />
              <div className="google-radar-street-line line-horizontal" />
              <div className="google-radar-street-line line-vertical" />
              <div className="radar-landmark-dot lm-1">🏛️</div>
              <div className="radar-landmark-dot lm-2">⛩️</div>
              <div className="radar-landmark-dot lm-3">🌊</div>
              <div className="google-radar-user">
                <div className="google-radar-cone" style={{ transform: `rotate(${heading}deg)` }} />
                <div className="google-pegman-marker">🚶</div>
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

      {/* ── CONTROLS (Bottom-Right) */}
      <div className="google-streetview-controls">
        <button className="google-ctrl-btn google-compass-btn" onClick={handleResetNorth} title="Đặt lại góc nhìn gốc">
          <div className="google-compass-needle" style={{ transform: `rotate(${-heading}deg)` }}>
            <div className="compass-n">▲</div>
            <div className="compass-s">▼</div>
          </div>
        </button>
        <div className="google-zoom-group">
          <button className="google-ctrl-btn google-zoom-btn" onClick={() => setZoomLevel((z) => Math.min(1.65, z + 0.1))} title="Phóng to">+</button>
          <div className="google-ctrl-divider" />
          <button className="google-ctrl-btn google-zoom-btn" onClick={() => setZoomLevel((z) => Math.max(0.85, z - 0.1))} title="Thu nhỏ">−</button>
        </div>
        <button className="google-ctrl-btn google-fullscreen-btn" onClick={toggleFullscreen}>
          {isFullscreen ? "⤓" : "⛶"}
        </button>
      </div>

      {/* ── BOTTOM CAROUSEL */}
      <div className="google-streetview-carousel">
        <div className="google-carousel-label">TUYẾN PHỐ DI SẢN LÀNG TRONG PHỐ ({allStreets.length} ĐIỂM)</div>
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
