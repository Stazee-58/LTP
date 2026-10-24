"use client";

import { CATEGORY_LABELS } from "@/data/places";

interface FilterBarProps {
  active: Set<string>;
  onToggle: (cat: string) => void;
  lang: "vi" | "en";
}

export default function FilterBar({ active, onToggle, lang }: FilterBarProps) {
  return (
    <div
      className="filter-bar"
      role="group"
      aria-label={lang === "en" ? "Filter by heritage category" : "Lọc theo loại di tích"}
    >
      {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
        <button
          key={key}
          id={`filter-${key}`}
          className={`filter-pill${active.has(key) ? " active" : ""}`}
          onClick={() => onToggle(key)}
          aria-pressed={active.has(key)}
          title={lang === "en" ? label.en : label.vi}
        >
          <span aria-hidden="true">{label.icon}</span>
          <span>{lang === "en" ? label.en : label.vi}</span>
        </button>
      ))}
    </div>
  );
}
