"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { VILLAGES_GEOJSON, VILLAGES_CENTER, type Village } from "@/data/villages";
import { SAMPLE_PLACES, CATEGORY_LABELS, type Place } from "@/data/places";
import VillagePanel from "@/components/VillagePanel";
import PlacePanel from "@/components/PlacePanel";
import SearchBar from "@/components/SearchBar";
import Navbar from "@/components/Navbar";
import FilterBar from "@/components/FilterBar";
import VillageLegend from "@/components/VillageLegend";
import LoadingScreen from "@/components/LoadingScreen";
import AboutModal from "@/components/AboutModal";
import { BUILDINGS_3D_GEOJSON, LANDMARK_3D_POINTS } from "@/data/buildings3d";

type PanelState =
  | { kind: "none" }
  | { kind: "village"; data: Village }
  | { kind: "place"; data: Place };

const VIEW_2D = { pitch: 0, bearing: 0 };
const VIEW_3D = { pitch: 55, bearing: -25 };

export default function MapPage() {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [is3D, setIs3D] = useState(false);
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
            p.place_slug
              ? `<button id="btn-popup-view-place" class="card-popup-3d-btn">Khám phá chi tiết di tích →</button>`
              : ""
          }
        </div>
      </div>
    `;
  };

  const setup3DPopupAction = useCallback((p: any) => {
    setTimeout(() => {
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
  }, []);

  // ── Khám phá trực tiếp công trình 3D từ thanh điều hướng
  const focusBuilding3D = useCallback((p: any) => {
    const map = mapRef.current;
    if (!map) return;
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

    setup3DPopupAction(p);
  }, [setup3DPopupAction]);

  // ── Render elevated 3D landmark tags trực tiếp trên nóc mỗi công trình
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
          focusBuilding3D(prop);
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
          "line-opacity": 0.9,
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
              properties: { name: "Khương Thượng · 姜上", color: "#C084FC" },
              geometry: { type: "Point", coordinates: [105.8265, 21.0048] },
            },
            {
              type: "Feature",
              properties: { name: "Khương Trung · 姜中", color: "#FB923C" },
              geometry: { type: "Point", coordinates: [105.8210, 20.9975] },
            },
            {
              type: "Feature",
              properties: { name: "Khương Đình · 姜亭", color: "#34D399" },
              geometry: { type: "Point", coordinates: [105.8190, 20.9880] },
            },
            {
              type: "Feature",
              properties: { name: "Làng Khương Hạ · 姜下", color: "#FBBF24" },
              geometry: { type: "Point", coordinates: [105.8160, 20.9912] },
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

      // ── 3D Buildings Footprint Outline & Extrusion Layer
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
          "fill-extrusion-opacity": is3D ? 0.95 : 0.4,
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

          setup3DPopupAction(p);
        }
      });

      // ── Render place markers
      renderMarkers(map, new Set());
      if (is3D) {
        render3DMarkers(map, true);
      }
      setMapLoaded(true);
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markers3DRef.current.forEach((m) => m.remove());
      map.remove();
      mapRef.current = null;
    };
  }, [renderMarkers, setup3DPopupAction, render3DMarkers, is3D]);

  // ── Re-render markers when filter changes
  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      renderMarkers(mapRef.current, activeCategories);
    }
  }, [activeCategories, mapLoaded, renderMarkers]);

  // ── Toggle 2D / 3D
  const toggle3D = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    const next = !is3D;
    setIs3D(next);
    const container = mapContainerRef.current;
    if (next) {
      container?.classList.add("mode-3d-active");
      map.easeTo({
        pitch: 62,
        bearing: -22,
        zoom: Math.max(map.getZoom(), 16),
        duration: 1200,
      });
      if (map.getLayer("buildings-3d-layer")) {
        map.setPaintProperty("buildings-3d-layer", "fill-extrusion-opacity", 0.95);
      }
      render3DMarkers(map, true);
    } else {
      container?.classList.remove("mode-3d-active");
      map.easeTo({
        pitch: 0,
        bearing: 0,
        duration: 900,
      });
      if (map.getLayer("buildings-3d-layer")) {
        map.setPaintProperty("buildings-3d-layer", "fill-extrusion-opacity", 0.35);
      }
      render3DMarkers(map, false);
      popupRef.current?.remove();
    }
  }, [is3D, render3DMarkers]);

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

      {/* UI Overlay */}
      <div id="ui-overlay">
        {/* Top navbar */}
        <Navbar
          lang={lang}
          setLang={setLang}
          onOpenAbout={() => setAboutOpen(true)}
          is3D={is3D}
          onToggle3D={toggle3D}
        />

        {/* Search bar */}
        <SearchBar
          lang={lang}
          onSelect={handleSearchSelect}
          places={SAMPLE_PLACES}
          villages={VILLAGES_GEOJSON.features}
          hasPanel={panel.kind !== "none"}
        />

        {/* 3D Heritage Explorer Ribbon */}
        {is3D && (
          <div className={`bar-3d-explorer${panel.kind !== "none" ? " has-panel" : ""}`}>
            <div className="bar-3d-header">
              <span className="bar-3d-dot" />
              <span className="bar-3d-title">KIẾN TRÚC 3D ({LANDMARK_3D_POINTS.length})</span>
            </div>
            <div className="bar-3d-scroll">
              {LANDMARK_3D_POINTS.map((f) => (
                <button
                  key={f.id}
                  className="bar-3d-chip"
                  onClick={() => focusBuilding3D(f)}
                  title={f.name}
                >
                  <span className="bar-3d-chip-icon">{f.icon}</span>
                  <span className="bar-3d-chip-name">{f.short_name}</span>
                  <span className="bar-3d-chip-height">{f.height}m</span>
                </button>
              ))}
            </div>
          </div>
        )}

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
          />
        )}
      </div>

      {/* About Project Modal */}
      <AboutModal
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        lang={lang}
      />
    </>
  );
}
