"use client";

import { useState, useMemo } from "react";
import { CaretDown, CaretUp, MapPin, MagnifyingGlass, X } from "@phosphor-icons/react";
import type { Village } from "@/data/villages";
import { HANOI_DISTRICTS } from "@/data/villages";
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
      if (selectedDistrict !== "all") {
        const distMatch =
          (selectedDistrict === "thanh-xuan" && p.district.includes("Thanh Xuân")) ||
          (selectedDistrict === "dong-da" && p.district.includes("Đống Đa")) ||
          (selectedDistrict === "ba-dinh" && p.district.includes("Ba Đình")) ||
          (selectedDistrict === "cau-giay" && p.district.includes("Cầu Giấy")) ||
          (selectedDistrict === "hoan-kiem" && p.district.includes("Hoàn Kiếm")) ||
          (selectedDistrict === "hai-ba-trung" && p.district.includes("Hai Bà Trưng"));
        if (!distMatch) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const haystack = [p.name, p.name_han_nom, p.name_old, p.district, p.merger_badge]
          .join(" ")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [villages, selectedDistrict, searchQuery]);

  return (
    <div
      className={`village-legend${collapsed ? " is-collapsed" : ""}`}
      role="navigation"
      aria-label={lang === "en" ? "Administrative and heritage zones" : "Phân khu địa giới & di sản"}
    >
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
            {lang === "en" ? "HANOI HERITAGE & WARDS" : "ĐỊA GIỚI & DI SẢN HÀ NỘI"}
          </div>
          <div className="legend-subtitle">
            {lang === "en"
              ? `${villages.length} wards & ancient villages · 6 districts`
              : `${villages.length} làng phường lịch sử · 6 quận nội thành`}
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
          {/* District Filter Tabs */}
          <div className="legend-district-tabs" role="tablist" aria-label="Lọc theo quận">
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

          {/* Quick Search */}
          <div className="legend-search-box">
            <MagnifyingGlass size={13} className="legend-search-icon" weight="bold" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "en" ? "Quick find ward / village..." : "Tìm nhanh phường / làng cổ..."}
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
                {lang === "en" ? "No ward matching" : "Không tìm thấy làng/phường phù hợp"}
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
                      <div className="legend-sub-row">
                        <span className="legend-district">{p.district}</span>
                        <span className="legend-count-chip">
                          <MapPin size={10} weight="fill" />
                          {count} di tích
                        </span>
                      </div>
                      {p.merger_badge && (
                        <div
                          className="legend-merger-chip"
                          style={{
                            marginTop: 4,
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
                          {p.merger_badge}
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
