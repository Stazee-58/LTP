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
      aria-label={lang === "en" ? "List of 4 ancient villages" : "Danh sách 4 làng cổ"}
    >
      <div className="legend-title">
        {lang === "en" ? "4 Ancient Villages" : "4 Làng Cổ"}
      </div>
      {villages.map((v) => (
        <div
          key={v.properties.slug}
          className="legend-item"
          onClick={() => onSelect(v.properties.slug)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onSelect(v.properties.slug)}
          id={`legend-${v.properties.slug}`}
          aria-label={`Xem làng ${v.properties.name}`}
        >
          <div
            className="legend-dot"
            style={{ background: v.properties.color }}
            aria-hidden="true"
          />
          <div>
            <div className="legend-name">{v.properties.name}</div>
            <div className="legend-name-han">{v.properties.name_han_nom}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
