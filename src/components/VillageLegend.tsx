"use client";

import { useState } from "react";
import { CaretDown, CaretUp, MapPin } from "@phosphor-icons/react";
import type { Village } from "@/data/villages";

interface VillageLegendProps {
  villages: Village[];
  onSelect: (slug: string) => void;
  lang?: "vi" | "en";
}

const VILLAGE_PLACE_COUNTS: Record<string, number> = {
  "khuong-ha": 22,
  "khuong-trung": 22,
  "khuong-dinh": 23,
  "khuong-thuong": 26,
};

export default function VillageLegend({ villages, onSelect, lang = "vi" }: VillageLegendProps) {
  const [collapsed, setCollapsed] = useState(false);

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
            {lang === "en" ? "4 Ancient Villages" : "ĐỊA GIỚI & DI SẢN 4 KHƯƠNG"}
          </div>
          <div className="legend-subtitle">
            {lang === "en" ? "Hanoi Urban Demarcation 2025" : "Quy hoạch địa giới hành chính 2025"}
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
        <div className="legend-list">
          {villages.map((v) => {
            const p = v.properties;
            const count = VILLAGE_PLACE_COUNTS[p.slug] || 0;
            return (
              <div
                key={p.slug}
                className="legend-item"
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
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

