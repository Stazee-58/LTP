"use client";

import { useState, useRef, useCallback } from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { CATEGORY_LABELS, type Place } from "@/data/places";
import type { Village } from "@/data/villages";

interface SearchBarProps {
  lang: "vi" | "en";
  places: Place[];
  villages: Village[];
  onSelect: (item: Place | Village["properties"]) => void;
  hasPanel?: boolean;
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function SearchBar({
  lang,
  places,
  villages,
  onSelect,
  hasPanel = false,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const q = normalize(query.trim());

  const matchedPlaces = q.length < 1 ? [] : places.filter((p) => {
    const haystack = normalize(
      [p.name, p.name_han_nom, p.description, p.deity, p.rank].join(" ")
    );
    return haystack.includes(q);
  }).slice(0, 5);

  const matchedVillages = q.length < 1 ? [] : villages.filter((v) => {
    const haystack = normalize(
      [
        v.properties.name,
        v.properties.name_han_nom,
        v.properties.name_old,
        v.properties.district,
        v.properties.summary,
        v.properties.new_administrative_name,
        v.properties.merger_badge,
      ].join(" ")
    );
    return haystack.includes(q);
  }).slice(0, 6);

  const hasResults = matchedPlaces.length > 0 || matchedVillages.length > 0;

  const clear = () => {
    setQuery("");
    setOpen(false);
    inputRef.current?.focus();
  };

  const handleSelect = useCallback(
    (item: Place | Village["properties"]) => {
      onSelect(item);
      setQuery("");
      setOpen(false);
    },
    [onSelect]
  );

  return (
    <div className={`search-wrapper${hasPanel ? " has-panel" : ""}`}>
      <div className="search-input-group">
        <MagnifyingGlass className="search-icon" weight="bold" />
        <input
          ref={inputRef}
          id="search-input"
          className="search-input"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={
            lang === "en"
              ? "Search villages, heritage sites, alleys…"
              : "Tìm làng, di tích, ngõ xóm…"
          }
          autoComplete="off"
          spellCheck={false}
          aria-label={lang === "en" ? "Search the map" : "Tìm kiếm trên bản đồ"}
        />
        {query && (
          <button
            id="search-clear"
            onClick={clear}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              padding: 0,
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Xoá tìm kiếm"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {open && hasResults && (
        <div className="search-results" role="listbox">
          {matchedVillages.length > 0 && (
            <>
              <div
                style={{
                  padding: "6px 16px 2px",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {lang === "en" ? "Villages" : "Làng"}
              </div>
              {matchedVillages.map((v) => (
                <div
                  key={v.properties.slug}
                  className="search-result-item"
                  role="option"
                  aria-selected="false"
                  tabIndex={0}
                  onClick={() => handleSelect(v.properties)}
                  onKeyDown={(e) => e.key === "Enter" && handleSelect(v.properties)}
                  id={`search-result-village-${v.properties.slug}`}
                >
                  <div
                    className="search-result-icon"
                    style={{ background: `${v.properties.color}22`, border: `1px solid ${v.properties.color}55` }}
                  >
                    <span style={{ color: v.properties.color, fontSize: "0.9rem", fontWeight: 700 }}>
                      {v.properties.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="search-result-name">{v.properties.name}</div>
                    <div className="search-result-meta">
                      {v.properties.name_han_nom} · {v.properties.district}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {matchedPlaces.length > 0 && (
            <>
              <div
                style={{
                  padding: "6px 16px 2px",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {lang === "en" ? "Heritage Sites" : "Di tích"}
              </div>
              {matchedPlaces.map((p) => {
                const cat = CATEGORY_LABELS[p.category];
                return (
                  <div
                    key={p.id}
                    className="search-result-item"
                    role="option"
                    aria-selected="false"
                    tabIndex={0}
                    onClick={() => handleSelect(p)}
                    onKeyDown={(e) => e.key === "Enter" && handleSelect(p)}
                    id={`search-result-place-${p.slug}`}
                  >
                    <div
                      className="search-result-icon"
                      style={{ background: "var(--navy-700)", fontSize: "1.1rem" }}
                    >
                      {cat?.icon}
                    </div>
                    <div>
                      <div className="search-result-name">{p.name}</div>
                      <div className="search-result-meta">
                        {lang === "en" ? cat?.en : cat?.vi}
                        {p.built_year ? ` · ${p.built_year}` : ""}
                        {p.rank ? ` · ${lang === "en" ? "Listed" : "Được xếp hạng"}` : ""}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}

      {open && q.length > 0 && !hasResults && (
        <div className="search-results">
          <div
            style={{
              padding: "14px 16px",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              textAlign: "center",
            }}
          >
            {lang === "en"
              ? `No results for "${query}"`
              : `Không tìm thấy kết quả cho "${query}"`}
          </div>
        </div>
      )}
    </div>
  );
}
