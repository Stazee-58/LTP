"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { VILLAGES_GEOJSON, VILLAGES_CENTER, type Village } from "@/data/villages";
import { SAMPLE_PLACES, CATEGORY_LABELS, type Place } from "@/data/places";
import VillagePanel from "@/components/VillagePanel";
import PlacePanel from "@/components/PlacePanel";
import SearchBar from "@/components/SearchBar";
import Navbar, { type ViewMode } from "@/components/Navbar";
import FilterBar from "@/components/FilterBar";
import VillageLegend from "@/components/VillageLegend";
import LoadingScreen from "@/components/LoadingScreen";
import AboutModal from "@/components/AboutModal";
import GoogleStreetView from "@/components/GoogleStreetView";
import { BUILDINGS_3D_GEOJSON, LANDMARK_3D_POINTS } from "@/data/buildings3d";

type PanelState =
  | { kind: "none" }
  | { kind: "village"; data: Village }
  | { kind: "place"; data: Place };

// ── Tuyến phố & Điểm dừng Street View thực tế
export interface StreetViewPreset {
  id: string;
  name: string;
  short_name: string;
  icon: string;
  village: string;
  desc: string;
  center: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
  image: string;
  image_caption: string;
  google_street_url: string;
}

export const STREET_VIEW_PRESETS: StreetViewPreset[] = [
  {
    id: "khuong-ha",
    name: "Phố Khương Hạ (Làng Gừng)",
    short_name: "Phố Khương Hạ",
    icon: "🛣️",
    village: "Khương Hạ · 姜下",
    desc: "Trục xương sống di sản Làng Gừng: Đình Khương Hạ - Chùa Phụng Lộc - Giếng cổ - Cụm trường học ven sông Tô Lịch.",
    center: [105.8153, 20.9912],
    zoom: 18.2,
    pitch: 78,
    bearing: -15,
    image: "/images/ngo_khuong_ha_real.jpg",
    image_caption: "Ngõ phố Khương Hạ cổ kính với tường gạch đỏ truyền thống",
    google_street_url: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=20.9912,105.8153",
  },
  {
    id: "khuong-trung",
    name: "Phố Khương Trung (Cổ Thôn)",
    short_name: "Phố Khương Trung",
    icon: "🛣️",
    village: "Khương Trung · 姜中",
    desc: "Tuyến phố sầm uất với Cổng làng cổ ngõ 211, Cụm di tích Đình - Chùa Tiêu Dao.",
    center: [105.8202, 20.9982],
    zoom: 18.1,
    pitch: 78,
    bearing: -35,
    image: "/images/chua_khuong_trung_real.jpg",
    image_caption: "Cổng di tích và phố Khương Trung ngõ 211",
    google_street_url: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=20.9982,105.8202",
  },
  {
    id: "bui-xuong-trach",
    name: "Phố Bùi Xương Trạch",
    short_name: "Phố Bùi Xương Trạch",
    icon: "🛣️",
    village: "Khương Đình · 姜亭",
    desc: "Trục dân cư & văn hóa Khương Đình: Cổng làng Đình Khương Đình - Cổ tự Chùa Tam Huyền.",
    center: [105.8188, 20.9882],
    zoom: 18.2,
    pitch: 78,
    bearing: 25,
    image: "/images/pho_khuong_dinh_real.jpg",
    image_caption: "Phố Bùi Xương Trạch và cụm di tích Khương Đình",
    google_street_url: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=20.9882,105.8188",
  },
  {
    id: "vu-tong-phan",
    name: "Đường Vũ Tông Phan (Sông Tô Lịch)",
    short_name: "Đường Vũ Tông Phan",
    icon: "🌊",
    village: "Ven Sông Tô Lịch",
    desc: "Tuyến đường cảnh quan sinh thái dọc dòng sông Tô Lịch lịch sử phía nam Thăng Long xưa.",
    center: [105.8150, 20.9935],
    zoom: 18.0,
    pitch: 76,
    bearing: -25,
    image: "/images/song_to_lich_real.jpg",
    image_caption: "Đoạn sông Tô Lịch và hàng cây xanh đường Vũ Tông Phan",
    google_street_url: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=20.9935,105.8150",
  },
  {
    id: "chua-boc-tay-son",
    name: "Phố Chùa Bộc - Tây Sơn",
    short_name: "Chùa Bộc - Tây Sơn",
    icon: "🛣️",
    village: "Khương Thượng · 姜上",
    desc: "Trục học thuật & chiến địa di tích: Chùa Bộc, ĐH Thủy Lợi, ĐH Y Hà Nội và dấu tích chiến thắng Đống Đa.",
    center: [105.8265, 21.0055],
    zoom: 18.0,
    pitch: 78,
    bearing: -38,
    image: "/images/pho_chua_boc_real.jpg",
    image_caption: "Phố Chùa Bộc tấp nập bên tường rào di tích Chùa Bộc",
    google_street_url: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=21.0055,105.8265",
  },
  {
    id: "cong-khuong-dinh",
    name: "Cổng Làng Cổ Khương Đình",
    short_name: "Cổng Làng Khương Đình",
    icon: "🚪",
    village: "Khương Đình · 姜亭",
    desc: "Không gian cổng làng cổ kính ngõ 125 kết nối bờ sông Tô Lịch vào đình làng Khương Đình linh thiêng.",
    center: [105.8166, 20.9880],
    zoom: 18.3,
    pitch: 80,
    bearing: 42,
    image: "/images/cong_khuong_dinh_real.jpg",
    image_caption: "Cổng làng cổ Khương Đình rêu phong hàng trăm năm",
    google_street_url: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=20.9880,105.8166",
  },
  {
    id: "dinh-khuong-thuong",
    name: "Phố Khương Thượng & Hồ Làng Cổ",
    short_name: "Phố Khương Thượng",
    icon: "🏛️",
    village: "Khương Thượng · 姜上",
    desc: "Không gian làng cổ Khương Thượng ven hồ: Đình Khương Thượng số 165 - Miếu Quy Sơn (Gò Rùa thần).",
    center: [105.8247, 21.0036],
    zoom: 18.2,
    pitch: 78,
    bearing: 0,
    image: "/images/dinh_khuong_thuong_real.jpg",
    image_caption: "Đình làng Khương Thượng soi bóng bên hồ nước cổ",
    google_street_url: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=21.0036,105.8247",
  },
  {
    id: "go-dong-da",
    name: "Đường Tây Sơn & Di tích Gò Đống Đa",
    short_name: "Tây Sơn - Gò Đống Đa",
    icon: "⛰️",
    village: "Khương Thượng · 姜上",
    desc: "Di tích Quốc gia Đặc biệt Gò Đống Đa, Chùa Đồng Quang, Đền Trung Liệt và tượng đài Vua Quang Trung.",
    center: [105.8236, 21.0115],
    zoom: 18.0,
    pitch: 76,
    bearing: 15,
    image: "/images/go_dong_da_real.jpg",
    image_caption: "Gò Đống Đa - Di tích Quốc gia Đặc biệt mùa xuân Kỷ Dậu 1789",
    google_street_url: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=21.0115,105.8236",
  },
];

// ── Nhãn tên đường phố 3D nổi bật kiểu Google Maps
export const STREET_LABELS_GEOJSON = {
  type: "FeatureCollection" as const,
  features: [
    { type: "Feature" as const, properties: { name: "PHỐ KHƯƠNG HẠ", color: "#FBBF24" }, geometry: { type: "Point" as const, coordinates: [105.8153, 20.9912] } },
    { type: "Feature" as const, properties: { name: "PHỐ KHƯƠNG TRUNG", color: "#FB923C" }, geometry: { type: "Point" as const, coordinates: [105.8202, 20.9982] } },
    { type: "Feature" as const, properties: { name: "PHỐ BÙI XƯƠNG TRẠCH", color: "#34D399" }, geometry: { type: "Point" as const, coordinates: [105.8190, 20.9885] } },
    { type: "Feature" as const, properties: { name: "ĐƯỜNG VŨ TÔNG PHAN", color: "#38BDF8" }, geometry: { type: "Point" as const, coordinates: [105.8145, 20.9930] } },
    { type: "Feature" as const, properties: { name: "PHỐ CHÙA BỘC", color: "#C084FC" }, geometry: { type: "Point" as const, coordinates: [105.8270, 21.0084] } },
    { type: "Feature" as const, properties: { name: "ĐƯỜNG TÂY SƠN", color: "#C084FC" }, geometry: { type: "Point" as const, coordinates: [105.8228, 21.0060] } },
    { type: "Feature" as const, properties: { name: "ĐƯỜNG TRƯỜNG CHINH (VÀNH ĐAI 2)", color: "#F472B6" }, geometry: { type: "Point" as const, coordinates: [105.8260, 21.0016] } },
    { type: "Feature" as const, properties: { name: "PHỐ TÔN THẤT TÙNG", color: "#C084FC" }, geometry: { type: "Point" as const, coordinates: [105.8305, 21.0045] } },
    { type: "Feature" as const, properties: { name: "ĐƯỜNG KIM GIANG", color: "#38BDF8" }, geometry: { type: "Point" as const, coordinates: [105.8138, 20.9860] } },
    { type: "Feature" as const, properties: { name: "PHỐ VƯƠNG THỪA VŨ", color: "#FB923C" }, geometry: { type: "Point" as const, coordinates: [105.8245, 21.0000] } },
  ],
};

export default function MapPage() {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("2d");
  const is3D = viewMode === "3d" || viewMode === "street";
  const [currentStreet, setCurrentStreet] = useState<StreetViewPreset>(STREET_VIEW_PRESETS[0]);
  const [isAutoWalk, setIsAutoWalk] = useState(false);
  const [showStreetPhoto, setShowStreetPhoto] = useState(false);
  const [panel, setPanel] = useState<PanelState>({ kind: "none" });
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const [aboutOpen, setAboutOpen] = useState(false);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const markers3DRef = useRef<maplibregl.Marker[]>([]);
  const popupRef = useRef<maplibregl.Popup | null>(null);

  // ── Build category color map
  const CATEGORY_COLORS: Record<string, string> = {
    dinh: "#C9A84C",
    chua: "#E07B54",
    mieu: "#8A7DC8",
    gieng: "#6BAF92",
    cong_lang: "#e8a87c",
    ao: "#5bb8d4",
    truong_hoc: "#38bdf8",
    nha_tho_ho: "#d4a0c0",
  };

  // ── Helper: Tạo HTML cho 3D Architectural Card Popup với Ảnh thực tế
  const create3DPopupHTML = (p: any) => {
    const typeMap: Record<string, string> = {
      dinh: "🏛️ Đình làng cổ",
      chua: "⛩️ Chùa cổ tôn giáo",
      cong_lang: "🚪 Cổng làng cổ",
      truong_hoc: "🏫 Trường học chuẩn QG",
      dai_hoc: "🎓 Viện Đại học",
    };
    const typeBadge = typeMap[p.type] || "🏛️ Công trình 3D";
    const image = p.image || "/images/den_khuong_ha_gate_real.jpg";
    const hanNom = p.name_han_nom
      ? `<span style="color:#C9A84C;font-family:serif;font-weight:normal;margin-left:4px;">(${p.name_han_nom})</span>`
      : "";

    return `
      <div class="card-popup-3d">
        <div class="card-popup-3d-img-wrapper">
          <img src="${image}" alt="${p.name}" class="card-popup-3d-img" />
          <span class="card-popup-3d-badge" style="color:${p.color || '#C9A84C'};">${typeBadge}</span>
          <span class="card-popup-3d-badge-real">📷 Ảnh chụp thực tế</span>
          <span class="card-popup-3d-height-tag">📐 Cao: ${p.height}m</span>
        </div>
        <div class="card-popup-3d-body">
          <div class="card-popup-3d-village">📍 ${p.village || "Làng trong Phố"}</div>
          <div class="card-popup-3d-title">${p.name} ${hanNom}</div>
          <div class="card-popup-3d-desc">${p.desc || "Mô hình kiến trúc 3D chuẩn xác thực địa với ảnh chụp thực tế."}</div>
          ${
            viewMode === "2d"
              ? `<button id="btn-popup-open-3d" class="card-popup-3d-btn" style="background: linear-gradient(135deg, #c9a84c, #f59e0b); color: #000; font-weight: 700; margin-bottom: 6px;">🏛️ Mở xem mô hình 3D chi tiết →</button>`
              : ""
          }
          ${
            p.place_slug
              ? `<button id="btn-popup-view-place" class="card-popup-3d-btn">Khám phá chi tiết di tích →</button>`
              : ""
          }
        </div>
      </div>
    `;
  };

  // ── Khám phá trực tiếp công trình 3D (tự động bật 3D nếu đang ở 2D)
  const focusBuilding3D = useCallback((p: any, force3D = true) => {
    const map = mapRef.current;
    if (!map) return;

    if (force3D) {
      setViewMode("3d");
      const container = mapContainerRef.current;
      container?.classList.add("mode-3d-active");
      if (map.getLayer("osm-buildings-3d")) {
        map.setPaintProperty("osm-buildings-3d", "fill-extrusion-opacity", 0.92);
      }
      if (map.getLayer("buildings-3d-layer")) {
        map.setPaintProperty("buildings-3d-layer", "fill-extrusion-opacity", 0.95);
      }
      if (map.getLayer("street-3d-labels")) {
        map.setPaintProperty("street-3d-labels", "text-opacity", 0.95);
      }
    }

    map.flyTo({
      center: p.center,
      zoom: 17.2,
      pitch: 58,
      bearing: -20,
      offset: [0, 90],
      duration: 1000,
      essential: true,
    });
    popupRef.current?.remove();
    popupRef.current = new maplibregl.Popup({
      offset: 16,
      closeButton: true,
      maxWidth: "320px",
    })
      .setLngLat(p.center)
      .setHTML(create3DPopupHTML(p))
      .addTo(map);

    setTimeout(() => {
      const btn3d = document.getElementById("btn-popup-open-3d");
      if (btn3d) {
        btn3d.onclick = () => {
          focusBuilding3D(p, true);
        };
      }
      const btn = document.getElementById("btn-popup-view-place");
      if (btn && p.place_slug) {
        btn.onclick = () => {
          const found = SAMPLE_PLACES.find((x) => x.slug === p.place_slug);
          if (found) {
            setPanel({ kind: "place", data: found });
            popupRef.current?.remove();
          }
        };
      }
    }, 50);
  }, [viewMode]);

  // ── Render elevated 3D landmark tags trực tiếp trên nóc mỗi công trình (Hiện ở cả 2D & 3D)
  const render3DMarkers = useCallback(
    (map: maplibregl.Map, visible: boolean) => {
      markers3DRef.current.forEach((m) => m.remove());
      markers3DRef.current = [];

      if (!visible) return;

      LANDMARK_3D_POINTS.forEach((prop) => {
        const el = document.createElement("div");
        el.className = `marker-3d-tag type-${prop.type}`;
        el.setAttribute("data-building-id", prop.id);
        el.innerHTML = `
          <div class="marker-3d-card" style="border-top: 3px solid ${prop.color};">
            <div class="marker-3d-main">
              <span class="marker-3d-icon">${prop.icon}</span>
              <span class="marker-3d-name">${prop.short_name}</span>
              <span class="marker-3d-height" style="color: ${prop.color};">${prop.height}m</span>
            </div>
            <div class="marker-3d-sub">${prop.village}</div>
          </div>
          <div class="marker-3d-stem" style="background: ${prop.color};"></div>
          <div class="marker-3d-dot" style="background: ${prop.color}; box-shadow: 0 0 10px ${prop.color};"></div>
        `;

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          const isMobile = window.innerWidth <= 768 || window.matchMedia("(hover: none)").matches;
          if (isMobile) {
            const wasActive = el.classList.contains("is-active");
            document.querySelectorAll(".marker-3d-tag.is-active").forEach((m) => {
              if (m !== el) m.classList.remove("is-active");
            });
            if (!wasActive) {
              el.classList.add("is-active");
            }
          }
          focusBuilding3D(prop, true);
        });

        const marker = new maplibregl.Marker({
          element: el,
          anchor: "bottom",
        })
          .setLngLat(prop.center)
          .addTo(map);

        markers3DRef.current.push(marker);
      });
    },
    [focusBuilding3D]
  );

  // ── Render markers whenever places/filter changes
  const renderMarkers = useCallback(
    (map: maplibregl.Map, categories: Set<string>) => {
      // Clear existing
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      const filtered =
        categories.size === 0
          ? SAMPLE_PLACES
          : SAMPLE_PLACES.filter((p) => categories.has(p.category));

      filtered.forEach((place) => {
        const color = CATEGORY_COLORS[place.category] || "#C9A84C";
        const cat = CATEGORY_LABELS[place.category];
        const icon = cat?.icon || "📍";

        // Custom marker element
        const el = document.createElement("div");
        el.className = "place-marker";
        el.style.cssText = `
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          background: ${color};
          border: 2px solid rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s, filter 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        `;

        const inner = document.createElement("div");
        inner.style.cssText = `
          transform: rotate(45deg);
          font-size: 13px;
          line-height: 1;
          pointer-events: none;
        `;
        inner.textContent = icon;
        el.appendChild(inner);

        el.addEventListener("mouseenter", () => {
          el.style.transform = "rotate(-45deg) scale(1.25)";
          el.style.filter = "brightness(1.2)";
        });
        el.addEventListener("mouseleave", () => {
          el.style.transform = "rotate(-45deg) scale(1)";
          el.style.filter = "brightness(1)";
        });

        el.addEventListener("click", () => {
          // Remove existing popup
          popupRef.current?.remove();

          // Fly to place
          map.flyTo({
            center: [place.lng, place.lat],
            zoom: Math.max(map.getZoom(), 17),
            duration: 800,
            essential: true,
          });

          setPanel({ kind: "place", data: place });
        });

        const marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
          .setLngLat([place.lng, place.lat])
          .addTo(map);

        markersRef.current.push(marker);
      });
    },
    []
  );

  // ── Init map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    if (typeof window !== "undefined" && maplibregl.setWorkerUrl) {
      maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");
    }

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        glyphs: "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
        sources: {
          "osm-dark": {
            type: "raster",
            tiles: [
              "https://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
              "https://b.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
              "https://c.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors, OSM France",
            maxzoom: 19,
          },
        },
        layers: [
          {
            id: "background",
            type: "background",
            paint: { "background-color": "#060e18" },
          },
          {
            id: "osm-raster",
            type: "raster",
            source: "osm-dark",
            paint: {
              "raster-opacity": 0.85,
              "raster-saturation": -0.88,
              "raster-contrast": 0.2,
              "raster-brightness-min": 0.04,
              "raster-brightness-max": 0.45,
            },
          },
        ],
      },
      center: VILLAGES_CENTER,
      zoom: 15.2,
      minZoom: 13,
      maxZoom: 20,
    });

    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), "bottom-right");
    map.addControl(new maplibregl.ScaleControl({ unit: "metric" }), "bottom-left");

    map.on("load", () => {
      // ── Village fill + outline
      map.addSource("villages", {
        type: "geojson",
        data: VILLAGES_GEOJSON as GeoJSON.FeatureCollection,
      });

      map.addLayer({
        id: "villages-fill",
        type: "fill",
        source: "villages",
        paint: {
          "fill-color": ["get", "color"],
          "fill-opacity": 0.18,
        },
      });

      map.addLayer({
        id: "villages-line",
        type: "line",
        source: "villages",
        paint: {
          "line-color": ["get", "color"],
          "line-width": 2.5,
          "line-opacity": 0.95,
          "line-dasharray": [4, 2], // Vẽ đường nét đứt chuẩn bản đồ địa giới
        },
      });

      // Dedicated single center point for each village label to prevent tile repeating
      map.addSource("villages-centers", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { name: "Khương Thượng · 姜上\n(P. Khương Thượng mở rộng)", color: "#C084FC" },
              geometry: { type: "Point", coordinates: [105.8265, 21.0048] },
            },
            {
              type: "Feature",
              properties: { name: "Khương Trung · 姜中\n(P. Khương Trung)", color: "#FB923C" },
              geometry: { type: "Point", coordinates: [105.8210, 20.9975] },
            },
            {
              type: "Feature",
              properties: { name: "Khương Đình · 姜亭\n(P. Khương Đình)", color: "#34D399" },
              geometry: { type: "Point", coordinates: [105.8195, 20.9885] },
            },
            {
              type: "Feature",
              properties: { name: "Làng Khương Hạ · 姜下\n(Sáp nhập P. Khương Đình)", color: "#FBBF24" },
              geometry: { type: "Point", coordinates: [105.8152, 20.9912] },
            },
          ],
        },
      });

      map.addLayer({
        id: "villages-label",
        type: "symbol",
        source: "villages-centers",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Open Sans Bold"],
          "text-size": 14,
          "text-anchor": "center",
          "text-offset": [0, 0],
        },
        paint: {
          "text-color": ["get", "color"],
          "text-halo-color": "#050d18",
          "text-halo-width": 3,
          "text-opacity": 0.95,
        },
      });

      // ── Click village fill → open panel
      map.on("click", "villages-fill", (e) => {
        if (!e.features || !e.features.length) return;
        const props = e.features[0].properties as Village["properties"];

        // Fit to village bounds
        const coords = (e.features[0].geometry as GeoJSON.Polygon).coordinates[0];
        const lngs = coords.map((c) => c[0]);
        const lats = coords.map((c) => c[1]);
        map.fitBounds(
          [
            [Math.min(...lngs) - 0.002, Math.min(...lats) - 0.002],
            [Math.max(...lngs) + 0.002, Math.max(...lats) + 0.002],
          ],
          { padding: { top: 80, bottom: 80, left: 80, right: 440 }, duration: 800 }
        );

        setPanel({
          kind: "village",
          data: e.features[0] as unknown as Village,
        });
      });

      map.on("mouseenter", "villages-fill", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "villages-fill", () => {
        map.getCanvas().style.cursor = "";
      });

      // Dismiss active 3D tag on map click
      map.on("click", () => {
        document.querySelectorAll(".marker-3d-tag.is-active").forEach((m) => {
          m.classList.remove("is-active");
        });
      });

      // ── 1. Toàn bộ 9,167 khối nhà đô thị 3D thực tế theo bản đồ (OpenStreetMap 3D Fabric)
      map.addSource("osm-buildings", {
        type: "geojson",
        data: "/data/osm_buildings_3d.json",
      });

      map.addLayer({
        id: "osm-buildings-3d",
        type: "fill-extrusion",
        source: "osm-buildings",
        minzoom: 13,
        paint: {
          "fill-extrusion-color": [
            "interpolate",
            ["linear"],
            ["get", "h"],
            9, "#182230",
            13, "#1e2b3c",
            18, "#28394e",
            26, "#344964",
            42, "#435d7e",
          ],
          "fill-extrusion-height": ["get", "h"],
          "fill-extrusion-base": 0,
          "fill-extrusion-opacity": is3D ? 0.92 : 0.55,
          "fill-extrusion-vertical-gradient": true,
        },
      });

      // Click vào khối nhà phố để xem thông tin
      map.on("click", "osm-buildings-3d", (e) => {
        if (!e.features || !e.features.length) return;
        const name = e.features[0].properties?.name;
        const h = e.features[0].properties?.h;
        if (name) {
          popupRef.current?.remove();
          popupRef.current = new maplibregl.Popup({
            offset: 12,
            closeButton: true,
            maxWidth: "260px",
          })
            .setLngLat(e.lngLat)
            .setHTML(`
              <div style="padding: 10px 14px; background: #0c1829; border-radius: 8px; color: #fff; font-size: 13px; border: 1px solid rgba(56,189,248,0.3);">
                <div style="font-weight: 600; color: #38bdf8; margin-bottom: 3px;">🏢 ${name}</div>
                <div style="font-size: 11px; color: #94a3b8;">Độ cao khối nhà: ~${h}m · Khu dân cư đô thị</div>
              </div>
            `)
            .addTo(map);
        }
      });

      // ── 2. Nhãn tên đường phố 3D nổi bật kiểu Google Maps
      map.addSource("street-labels", {
        type: "geojson",
        data: STREET_LABELS_GEOJSON,
      });

      map.addLayer({
        id: "street-3d-labels",
        type: "symbol",
        source: "street-labels",
        minzoom: 14.2,
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Open Sans Bold"],
          "text-size": 11,
          "text-letter-spacing": 0.06,
          "text-transform": "uppercase",
        },
        paint: {
          "text-color": ["get", "color"],
          "text-halo-color": "#060e18",
          "text-halo-width": 2.5,
          "text-opacity": is3D ? 0.95 : 0.75,
        },
      });

      // ── 3. 14 Công trình Di tích & Giáo dục Kiến trúc Đặc thù (Landmark 3D Models)
      map.addSource("buildings-3d", {
        type: "geojson",
        data: BUILDINGS_3D_GEOJSON as GeoJSON.FeatureCollection,
      });

      // Ground footprint demarcation border
      map.addLayer({
        id: "buildings-3d-outline",
        type: "line",
        source: "buildings-3d",
        paint: {
          "line-color": ["get", "color"],
          "line-width": 1.5,
          "line-opacity": 0.85,
        },
      });

      // 3D Architectural Volume with dynamic shading
      map.addLayer({
        id: "buildings-3d-layer",
        type: "fill-extrusion",
        source: "buildings-3d",
        paint: {
          "fill-extrusion-color": ["get", "color"],
          "fill-extrusion-height": ["get", "height"],
          "fill-extrusion-base": ["get", "base_height"],
          "fill-extrusion-opacity": is3D ? 0.95 : 0.88,
          "fill-extrusion-vertical-gradient": true,
        },
      });

      // Ambient directional light for natural architectural volume
      map.setLight({
        anchor: "map",
        color: "#fffcf2",
        intensity: 0.55,
        position: [1.3, 215, 50],
      });

      map.on("mouseenter", "buildings-3d-layer", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "buildings-3d-layer", () => {
        map.getCanvas().style.cursor = "";
      });
      map.on("click", "buildings-3d-layer", (e) => {
        if (!e.features || !e.features.length) return;
        const p = e.features[0].properties;
        if (p) {
          popupRef.current?.remove();
          popupRef.current = new maplibregl.Popup({
            offset: 16,
            closeButton: true,
            maxWidth: "320px",
          })
            .setLngLat(e.lngLat)
            .setHTML(create3DPopupHTML(p))
            .addTo(map);

          setTimeout(() => {
            const btn3d = document.getElementById("btn-popup-open-3d");
            if (btn3d) {
              btn3d.onclick = () => {
                focusBuilding3D(p, true);
              };
            }
            const btn = document.getElementById("btn-popup-view-place");
            if (btn && p.place_slug) {
              btn.onclick = () => {
                const found = SAMPLE_PLACES.find((x) => x.slug === p.place_slug);
                if (found) {
                  setPanel({ kind: "place", data: found });
                  popupRef.current?.remove();
                }
              };
            }
          }, 50);
        }
      });

      // ── Render place markers
      renderMarkers(map, new Set());
      // ── Render 3D landmark markers in both 2D and 3D!
      render3DMarkers(map, true);
      setMapLoaded(true);
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markers3DRef.current.forEach((m) => m.remove());
      map.remove();
      mapRef.current = null;
    };
  }, [renderMarkers, render3DMarkers, is3D, focusBuilding3D]);

  // ── Re-render markers when filter changes
  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      renderMarkers(mapRef.current, activeCategories);
    }
  }, [activeCategories, mapLoaded, renderMarkers]);

  // ── Auto walk effect for Street View
  useEffect(() => {
    if (!isAutoWalk || viewMode !== "street") return;
    const interval = setInterval(() => {
      const map = mapRef.current;
      if (!map) return;
      map.setBearing(map.getBearing() + 0.35);
    }, 45);
    return () => clearInterval(interval);
  }, [isAutoWalk, viewMode]);

  // ── Switch View Mode (2D / 3D / Street View)
  const handleSetViewMode = useCallback(
    (mode: ViewMode) => {
      setViewMode(mode);
      const map = mapRef.current;
      if (!map) return;

      const container = mapContainerRef.current;

      if (mode === "2d") {
        container?.classList.remove("mode-3d-active");
        setIsAutoWalk(false);
        setShowStreetPhoto(false);
        map.easeTo({
          pitch: 0,
          bearing: 0,
          duration: 900,
        });
        if (map.getLayer("osm-buildings-3d")) {
          map.setPaintProperty("osm-buildings-3d", "fill-extrusion-opacity", 0.55);
        }
        if (map.getLayer("buildings-3d-layer")) {
          map.setPaintProperty("buildings-3d-layer", "fill-extrusion-opacity", 0.88);
        }
        if (map.getLayer("street-3d-labels")) {
          map.setPaintProperty("street-3d-labels", "text-opacity", 0.75);
        }
        render3DMarkers(map, true);
        popupRef.current?.remove();
      } else if (mode === "3d") {
        container?.classList.add("mode-3d-active");
        setIsAutoWalk(false);
        setShowStreetPhoto(false);
        map.easeTo({
          pitch: 60,
          bearing: -22,
          zoom: Math.max(map.getZoom(), 15.8),
          duration: 1200,
        });
        if (map.getLayer("osm-buildings-3d")) {
          map.setPaintProperty("osm-buildings-3d", "fill-extrusion-opacity", 0.92);
        }
        if (map.getLayer("buildings-3d-layer")) {
          map.setPaintProperty("buildings-3d-layer", "fill-extrusion-opacity", 0.95);
        }
        if (map.getLayer("street-3d-labels")) {
          map.setPaintProperty("street-3d-labels", "text-opacity", 0.95);
        }
        render3DMarkers(map, true);
      } else if (mode === "street") {
        container?.classList.remove("mode-3d-active");
        popupRef.current?.remove();
      }
    },
    [render3DMarkers]
  );

  const selectStreet = useCallback((street: StreetViewPreset) => {
    setCurrentStreet(street);
    setShowStreetPhoto(false);
    setIsAutoWalk(false);
    const map = mapRef.current;
    if (!map) return;
    map.flyTo({
      center: street.center,
      pitch: street.pitch,
      bearing: street.bearing,
      zoom: street.zoom,
      duration: 1300,
      essential: true,
    });
  }, []);

  const toggleAutoWalk = () => {
    setIsAutoWalk((prev) => !prev);
  };

  const toggle3D = useCallback(() => {
    handleSetViewMode(viewMode === "2d" ? "3d" : "2d");
  }, [handleSetViewMode, viewMode]);

  // ── flyTo from search
  const handleSearchSelect = useCallback(
    (item: Place | Village["properties"]) => {
      const map = mapRef.current;
      if (!map) return;

      if ("slug" in item && "category" in item) {
        // Place
        const place = item as Place;
        map.flyTo({
          center: [place.lng, place.lat],
          zoom: 17.5,
          duration: 900,
          essential: true,
        });
        setPanel({ kind: "place", data: place });
      } else {
        // Village — find feature
        const feat = VILLAGES_GEOJSON.features.find(
          (f) => f.properties.slug === (item as Village["properties"]).slug
        );
        if (feat) {
          const coords = (feat.geometry as GeoJSON.Polygon).coordinates[0];
          const lngs = coords.map((c) => c[0]);
          const lats = coords.map((c) => c[1]);
          map.fitBounds(
            [
              [Math.min(...lngs) - 0.003, Math.min(...lats) - 0.003],
              [Math.max(...lngs) + 0.003, Math.max(...lats) + 0.003],
            ],
            { padding: { top: 80, bottom: 80, left: 80, right: 440 }, duration: 900 }
          );
          setPanel({ kind: "village", data: feat as unknown as Village });
        }
      }
    },
    []
  );

  const toggleCategory = (cat: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const flyToVillage = (slug: string) => {
    const feat = VILLAGES_GEOJSON.features.find((f) => f.properties.slug === slug);
    if (!feat || !mapRef.current) return;
    const coords = (feat.geometry as GeoJSON.Polygon).coordinates[0];
    const lngs = coords.map((c) => c[0]);
    const lats = coords.map((c) => c[1]);
    mapRef.current.fitBounds(
      [
        [Math.min(...lngs) - 0.002, Math.min(...lats) - 0.002],
        [Math.max(...lngs) + 0.002, Math.max(...lats) + 0.002],
      ],
      { padding: { top: 80, bottom: 80, left: 80, right: 440 }, duration: 800 }
    );
    setPanel({ kind: "village", data: feat as unknown as Village });
  };

  const openPlace = (place: Place) => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo({
      center: [place.lng, place.lat],
      zoom: Math.max(map.getZoom(), 17),
      duration: 700,
      essential: true,
    });
    setPanel({ kind: "place", data: place });
  };

  return (
    <>
      {!mapLoaded && <LoadingScreen />}

      {/* Map canvas */}
      <div id="map-container" ref={mapContainerRef} />

      {/* Street View Mode - Google Maps 100% Authentic 360 Experience */}
      {viewMode === "street" && (
        <GoogleStreetView
          street={currentStreet}
          allStreets={STREET_VIEW_PRESETS}
          onSelectStreet={selectStreet}
          onClose={() => handleSetViewMode("3d")}
        />
      )}

      {/* UI Overlay (Normal 2D & 3D modes) */}
      {viewMode !== "street" && (
        <div id="ui-overlay">
          {/* Top navbar */}
          <Navbar
            lang={lang}
            setLang={setLang}
            onOpenAbout={() => setAboutOpen(true)}
            viewMode={viewMode}
            onSetViewMode={handleSetViewMode}
          />

          {/* Search bar */}
          <SearchBar
            lang={lang}
            onSelect={handleSearchSelect}
            places={SAMPLE_PLACES}
            villages={VILLAGES_GEOJSON.features}
            hasPanel={panel.kind !== "none"}
          />

          {/* 3D Heritage Explorer Ribbon - Hiện ở cả 2D và 3D */}
          <div className={`bar-3d-explorer${panel.kind !== "none" ? " has-panel" : ""}`}>
            <div className="bar-3d-header">
              <span className="bar-3d-dot" />
              <span className="bar-3d-title">
                {viewMode === "2d"
                  ? `MÔ HÌNH KIẾN TRÚC 3D (${LANDMARK_3D_POINTS.length}) · BẤM ĐỂ MỞ XEM 3D`
                  : `KIẾN TRÚC 3D (${LANDMARK_3D_POINTS.length})`}
              </span>
            </div>
            <div className="bar-3d-scroll">
              {LANDMARK_3D_POINTS.map((f) => (
                <button
                  key={f.id}
                  className="bar-3d-chip"
                  onClick={() => focusBuilding3D(f, true)}
                  title={f.name}
                >
                  <span className="bar-3d-chip-icon">{f.icon}</span>
                  <span className="bar-3d-chip-name">{f.short_name}</span>
                  <span className="bar-3d-chip-height">{f.height}m</span>
                  {viewMode === "2d" && (
                    <span style={{ fontSize: "0.65rem", color: "#38bdf8", marginLeft: "4px" }}>
                      [Xem 3D]
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

        {/* Category filter */}
        <FilterBar
          active={activeCategories}
          onToggle={toggleCategory}
          lang={lang}
        />

        {/* Village legend */}
        <VillageLegend
          villages={VILLAGES_GEOJSON.features}
          onSelect={(slug) => flyToVillage(slug)}
          lang={lang}
        />

        {/* Side panels */}
        {panel.kind === "village" && (
          <VillagePanel
            village={panel.data}
            places={SAMPLE_PLACES.filter(
              (p) => p.village_slug === panel.data.properties.slug
            )}
            lang={lang}
            onClose={() => setPanel({ kind: "none" })}
            onOpenPlace={openPlace}
          />
        )}
        {panel.kind === "place" && (
          <PlacePanel
            place={panel.data}
            lang={lang}
            onClose={() => setPanel({ kind: "none" })}
            onOpenStreetView={(p) => {
              const matchedPreset = STREET_VIEW_PRESETS.find(
                (s) => s.id === p.slug || Math.hypot(s.center[0] - p.lng, s.center[1] - p.lat) < 0.003
              );
              if (matchedPreset) {
                selectStreet(matchedPreset);
              } else {
                selectStreet({
                  id: p.slug,
                  name: p.name,
                  short_name: p.name,
                  icon: CATEGORY_LABELS[p.category]?.icon || "🏛️",
                  village:
                    p.village_slug === "khuong-ha"
                      ? "Khương Hạ · 姜下"
                      : p.village_slug === "khuong-trung"
                      ? "Khương Trung · 姜中"
                      : p.village_slug === "khuong-dinh"
                      ? "Khương Đình · 姜亭"
                      : "Khương Thượng · 姜上",
                  desc: p.description,
                  center: [p.lng, p.lat],
                  zoom: 18.2,
                  pitch: 78,
                  bearing: 0,
                  image: p.images[0]?.url || "/images/dinh_khuong_ha_real.jpg",
                  image_caption: p.images[0]?.caption || p.name,
                  google_street_url: `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${p.lat},${p.lng}`,
                });
              }
              handleSetViewMode("street");
            }}
          />
        )}
      </div>
      )}

      {/* About Project Modal */}
      <AboutModal
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        lang={lang}
      />
    </>
  );
}
