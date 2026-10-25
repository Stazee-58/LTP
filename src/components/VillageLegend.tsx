"use client";

import type { Village } from "@/data/villages";

interface VillageLegendProps {
  villages: Village[];
  onSelect: (slug: string) => void;
  lang?: "vi" | "en";
}

export default function VillageLegend({ villages, onSelect, lang = "vi" }: VillageLegendProps) {
  return (
    <div
      className="village-legend"
      role="navigation"
      aria-label={lang === "en" ? "Administrative and heritage zones" : "Phân khu địa giới & di sản"}
    >
      <div className="legend-header-wrapper">
        <div className="legend-seal" aria-hidden="true">京</div>
        <div>
          <div className="legend-title">
            {lang === "en" ? "Administrative & Heritage Zones" : "ĐỊA GIỚI & DI SẢN 4 KHƯƠNG"}
          </div>
          <div className="legend-subtitle">
            {lang === "en" ? "Hanoi Urban Boundary 2025" : "Bản đồ quy hoạch sáp nhập 2025"}
          </div>
        </div>
      </div>

      <div className="legend-list">
        {villages.map((v) => {
          const p = v.properties;
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
                  <span className="legend-area">{p.area_ha} ha</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
