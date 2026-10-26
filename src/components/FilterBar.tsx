"use client";

import { useState } from "react";
import { Funnel, X, Check } from "@phosphor-icons/react";
import { CATEGORY_LABELS } from "@/data/places";

interface FilterBarProps {
  active: Set<string>;
  onToggle: (cat: string) => void;
  lang: "vi" | "en";
}

const CATEGORY_COUNTS: Record<string, number> = {
  dinh: 5,
  chua: 7,
  mieu: 11,
  gieng: 8,
  ao: 8,
  cong_lang: 20,
  truong_hoc: 19,
  nha_tho_ho: 15,
};

export default function FilterBar({ active, onToggle, lang }: FilterBarProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const isAll = active.size === 0;

  const handleClearAll = () => {
    // If some are active, clear all by toggling each active one
    if (active.size > 0) {
      active.forEach((k) => onToggle(k));
    }
  };

  return (
    <div
      className={`filter-container${mobileExpanded ? " is-mobile-open" : ""}`}
      role="group"
      aria-label={lang === "en" ? "Filter by heritage category" : "Lọc theo loại di tích"}
    >
      {/* Mobile trigger button */}
      <button
        className="filter-mobile-toggle"
        onClick={() => setMobileExpanded(!mobileExpanded)}
        aria-expanded={mobileExpanded}
        aria-label="Mở bộ lọc di tích"
      >
        <Funnel size={14} weight="bold" />
        <span>
          {lang === "en" ? "Filter" : "Bộ lọc"} {active.size > 0 ? `(${active.size})` : "(Tất cả)"}
        </span>
      </button>

      {/* Filter list */}
      <div className="filter-bar">
        {/* All option */}
        <button
          id="filter-all"
          className={`filter-pill filter-pill-all${isAll ? " active" : ""}`}
          onClick={handleClearAll}
          aria-pressed={isAll}
          title={lang === "en" ? "Show all heritage sites" : "Hiện tất cả 93 di tích"}
        >
          <span className="filter-pill-check">
            {isAll ? <Check size={12} weight="bold" /> : null}
          </span>
          <span className="filter-pill-name">{lang === "en" ? "All Heritage" : "Tất cả di tích"}</span>
          <span className="filter-pill-count">93</span>
        </button>

        {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
          const isSelected = active.has(key);
          const count = CATEGORY_COUNTS[key] || 0;
          return (
            <button
              key={key}
              id={`filter-${key}`}
              className={`filter-pill${isSelected ? " active" : ""}`}
              onClick={() => onToggle(key)}
              aria-pressed={isSelected}
              title={lang === "en" ? label.en : label.vi}
            >
              <span className="filter-pill-icon" aria-hidden="true">{label.icon}</span>
              <span className="filter-pill-name">{lang === "en" ? label.en : label.vi}</span>
              <span className="filter-pill-count">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

