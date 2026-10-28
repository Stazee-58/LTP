"use client";

import { useState, useMemo } from "react";
import { CaretDown, CaretUp, MapPin, MagnifyingGlass, X, Sparkle, Buildings } from "@phosphor-icons/react";
import type { Village } from "@/data/villages";
import { HANOI_REGIONS, HANOI_DISTRICTS } from "@/data/villages";
import { SAMPLE_PLACES } from "@/data/places";

interface VillageLegendProps {
  villages: Village[];
  onSelect: (slug: string) => void;
  lang?: "vi" | "en";
  activeSlug?: string | null;
}

export default function VillageLegend({
  villages,
  onSelect,
  lang = "vi",
  activeSlug = null,
}: VillageLegendProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [filterMode, setFilterMode] = useState<"region" | "district">("region");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const placeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    SAMPLE_PLACES.forEach((p) => {
      counts[p.village_slug] = (counts[p.village_slug] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredVillages = useMemo(() => {
    return villages.filter((v) => {
      const p = v.properties;

      // Filter by mode
      if (filterMode === "region") {
        if (selectedRegion !== "all" && p.region_id !== selectedRegion) {
          return false;
        }
      } else {
        if (selectedDistrict !== "all") {
          const dist = p.district.toLowerCase();
          const target = selectedDistrict.replace("-", " ");
          if (!dist.includes(target) && !p.district.includes(selectedDistrict)) {
            // Check direct mapping
            const mapMatch: Record<string, string> = {
              "ba-dinh": "Ba Đình",
              "dong-da": "Đống Đa",
              "tay-ho": "Tây Hồ",
              "hai-ba-trung": "Hai Bà Trưng",
              "hoang-mai": "Hoàng Mai",
              "cau-giay": "Cầu Giấy",
              "thanh-xuan": "Thanh Xuân",
              "bac-tu-liem": "Bắc Từ Liêm",
              "nam-tu-liem": "Nam Từ Liêm",
              "ha-dong": "Hà Đông",
            };
            if (mapMatch[selectedDistrict] && !p.district.includes(mapMatch[selectedDistrict])) {
              return false;
            }
          }
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const haystack = [
          p.name,
          p.name_han_nom,
          p.name_old,
          p.district,
          p.region_name,
          p.craft_tradition,
          p.merger_badge,
        ]
          .join(" ")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [villages, filterMode, selectedRegion, selectedDistrict, searchQuery]);

  return (
    <div
      className={`village-legend${collapsed ? " is-collapsed" : ""}`}
      role="navigation"
      aria-label={lang === "en" ? "Administrative and heritage zones" : "7 Vùng di sản làng cổ Hà Nội"}
    >
      {/* Header */}
      <div
        className="legend-header-wrapper"
        onClick={() => setCollapsed(!collapsed)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setCollapsed(!collapsed)}
        aria-expanded={!collapsed}
        title={collapsed ? "Mở rộng bảng phân khu" : "Thu gọn bảng phân khu"}
      >
        <div className="legend-seal" aria-hidden="true">京</div>
        <div className="legend-header-titles">
          <div className="legend-title">
            {lang === "en" ? "7 HANOI HERITAGE VILLAGE REGIONS" : "7 VÙNG DI SẢN LÀNG CỔ HÀ NỘI"}
          </div>
          <div className="legend-subtitle">
            {lang === "en"
              ? `${villages.length} ancient villages across 7 cultural zones`
              : `${villages.length} làng di sản văn hóa · 7 vùng đặc trưng`}
          </div>
        </div>
        <button
          className="legend-collapse-btn"
          aria-label={collapsed ? "Mở rộng" : "Thu gọn"}
          onClick={(e) => {
            e.stopPropagation();
            setCollapsed(!collapsed);
          }}
        >
          {collapsed ? <CaretUp size={14} weight="bold" /> : <CaretDown size={14} weight="bold" />}
        </button>
      </div>

      {!collapsed && (
        <>
          {/* Mode Switcher: 7 Vùng vs Quận/Huyện */}
          <div
            style={{
              display: "flex",
              padding: "6px 12px 2px",
              gap: 6,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <button
              type="button"
              onClick={() => setFilterMode("region")}
              style={{
                flex: 1,
                padding: "6px 8px",
                fontSize: "0.75rem",
                fontWeight: filterMode === "region" ? 700 : 500,
                color: filterMode === "region" ? "#C9A84C" : "rgba(255,255,255,0.55)",
                background: filterMode === "region" ? "rgba(201, 168, 76, 0.12)" : "transparent",
                border: filterMode === "region" ? "1px solid rgba(201, 168, 76, 0.3)" : "1px solid transparent",
                borderRadius: 6,
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <Sparkle size={12} weight={filterMode === "region" ? "fill" : "regular"} />
              <span>{lang === "en" ? "7 Regions" : "7 Vùng Di sản"}</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterMode("district")}
              style={{
                flex: 1,
                padding: "6px 8px",
                fontSize: "0.75rem",
                fontWeight: filterMode === "district" ? 700 : 500,
                color: filterMode === "district" ? "#38bdf8" : "rgba(255,255,255,0.55)",
                background: filterMode === "district" ? "rgba(56, 189, 248, 0.12)" : "transparent",
                border: filterMode === "district" ? "1px solid rgba(56, 189, 248, 0.3)" : "1px solid transparent",
                borderRadius: 6,
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <Buildings size={12} weight={filterMode === "district" ? "fill" : "regular"} />
              <span>{lang === "en" ? "Districts" : "Quận / Huyện"}</span>
            </button>
          </div>

          {/* Region Tabs */}
          {filterMode === "region" && (
            <div className="legend-district-tabs" role="tablist" aria-label="Lọc theo vùng di sản">
              {HANOI_REGIONS.map((r) => {
                const isActive = selectedRegion === r.id;
                return (
                  <button
                    key={r.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`legend-district-tab${isActive ? " is-active" : ""}`}
                    onClick={() => setSelectedRegion(r.id)}
                    style={{
                      borderColor: isActive ? r.color : undefined,
                      color: isActive ? r.color : undefined,
                    }}
                    title={r.desc}
                  >
                    <span>{r.icon} {r.name.replace(/^\d+\.\s*/, "")}</span>
                    <span className="tab-count">{r.count}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* District Tabs */}
          {filterMode === "district" && (
            <div className="legend-district-tabs" role="tablist" aria-label="Lọc theo quận huyện">
              {HANOI_DISTRICTS.map((d) => {
                const isActive = selectedDistrict === d.id;
                return (
                  <button
                    key={d.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`legend-district-tab${isActive ? " is-active" : ""}`}
                    onClick={() => setSelectedDistrict(d.id)}
                  >
                    <span>{d.name.replace("Tất cả Hà Nội", "Tất cả")}</span>
                    <span className="tab-count">{d.count}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Quick Search */}
          <div className="legend-search-box">
            <MagnifyingGlass size={13} className="legend-search-icon" weight="bold" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "en" ? "Search village, craft tradition, district..." : "Tìm làng, làng nghề, đặc sản, quận..."}
              className="legend-search-input"
              spellCheck={false}
            />
            {searchQuery && (
              <button
                type="button"
                className="legend-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Xóa tìm kiếm"
              >
                <X size={12} weight="bold" />
              </button>
            )}
          </div>

          {/* Village List */}
          <div className="legend-list">
            {filteredVillages.length === 0 ? (
              <div className="legend-empty">
                {lang === "en" ? "No village matching" : "Không tìm thấy làng phù hợp"}
              </div>
            ) : (
              filteredVillages.map((v) => {
                const p = v.properties;
                const count = placeCounts[p.slug] || 0;
                const isActive = activeSlug === p.slug;

                return (
                  <div
                    key={p.slug}
                    className={`legend-item${isActive ? " is-active" : ""}`}
                    onClick={() => onSelect(p.slug)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && onSelect(p.slug)}
                    id={`legend-${p.slug}`}
                    aria-label={`Xem phân khu ${p.name}`}
                  >
                    <div
                      className="legend-color-ring"
                      style={{ borderColor: p.color }}
                      aria-hidden="true"
                    >
                      <div
                        className="legend-dot"
                        style={{ background: p.color }}
                      />
                    </div>

                    <div className="legend-info">
                      <div className="legend-top-row">
                        <span className="legend-name">{p.name}</span>
                        <span className="legend-name-han" style={{ color: p.color }}>
                          {p.name_han_nom}
                        </span>
                      </div>

                      {/* Craft tradition highlight pill */}
                      {p.craft_tradition && (
                        <div
                          style={{
                            fontSize: "0.72rem",
                            color: "rgba(255, 255, 255, 0.88)",
                            marginTop: 3,
                            marginBottom: 4,
                            lineHeight: 1.35,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {p.craft_tradition}
                        </div>
                      )}

                      <div className="legend-sub-row">
                        <span className="legend-district" style={{ color: p.color, fontWeight: 500 }}>
                          {p.district}
                        </span>
                        {count > 0 && (
                          <span className="legend-count-chip">
                            <MapPin size={10} weight="fill" />
                            {count} di tích
                          </span>
                        )}
                      </div>

                      {p.region_name && (
                        <div
                          className="legend-merger-chip"
                          style={{
                            marginTop: 5,
                            fontSize: "0.68rem",
                            padding: "2px 7px",
                            borderRadius: 999,
                            width: "fit-content",
                            fontWeight: 600,
                            letterSpacing: "0.02em",
                            color: p.color,
                            background: `${p.color}15`,
                            border: `1px solid ${p.color}35`,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <span style={{ fontSize: "0.62rem", opacity: 0.85 }}>●</span>
                          {p.region_name.split("(")[0].trim()}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}
