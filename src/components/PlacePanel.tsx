"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Calendar, Star, BookOpen, MusicNotes } from "@phosphor-icons/react";
import { CATEGORY_LABELS, type Place } from "@/data/places";

interface PlacePanelProps {
  place: Place;
  lang: "vi" | "en";
  onClose: () => void;
}

const CONFIDENCE_LABELS = {
  1: { vi: "Chưa xác minh", en: "Unverified" },
  2: { vi: "Truyền miệng", en: "Oral tradition" },
  3: { vi: "Sơ bộ", en: "Preliminary" },
  4: { vi: "Đã xác minh", en: "Verified" },
  5: { vi: "Tư liệu gốc", en: "Primary source" },
};

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

export default function PlacePanel({ place, lang, onClose }: PlacePanelProps) {
  const [panelLang, setPanelLang] = useState<"vi" | "en">(lang);

  useEffect(() => {
    setPanelLang(lang);
  }, [lang]);

  const cat = CATEGORY_LABELS[place.category];
  const color = CATEGORY_COLORS[place.category] || "#C9A84C";
  const desc = panelLang === "en" && place.description_en ? place.description_en : place.description;
  const confidence = CONFIDENCE_LABELS[place.confidence as keyof typeof CONFIDENCE_LABELS];
  const img = place.images[0];

  return (
    <AnimatePresence>
      <motion.div
        className="detail-panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 280, damping: 32 }}
        role="complementary"
        aria-label={`Chi tiết: ${place.name}`}
      >
        {/* Hero image */}
        <div className="panel-header">
          {img && (
            <img
              className="panel-header-img"
              src={img.url}
              alt={img.caption}
              loading="lazy"
            />
          )}
          <div className="panel-header-overlay" />
          <button
            className="panel-close"
            onClick={onClose}
            aria-label="Đóng panel"
            id="place-panel-close"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        {/* Body */}
        <div className="panel-body">
          {/* Category badge */}
          <div
            className="panel-category-badge"
            style={{
              background: `${color}22`,
              border: `1px solid ${color}66`,
              color: color,
            }}
          >
            <span>{cat?.icon}</span>
            <span>{lang === "en" ? cat?.en : cat?.vi}</span>
          </div>

          {/* Names */}
          <h2 className="panel-name-vi">{place.name}</h2>
          {place.name_han_nom && (
            <p className="panel-name-han">{place.name_han_nom}</p>
          )}

          {/* Meta chips */}
          <div className="panel-meta-row">
            {place.built_year && (
              <div className="meta-chip">
                <Calendar size={12} />
                <span>{lang === "en" ? "Built" : "Xây dựng"} {place.built_year}</span>
              </div>
            )}
            {place.deity && (
              <div className="meta-chip">
                <Star size={12} />
                <span>{place.deity}</span>
              </div>
            )}
            {place.rank && (
              <div className="rank-badge">
                <Star size={11} weight="fill" />
                {place.rank}
              </div>
            )}
          </div>

          {/* Description with lang toggle */}
          {place.description_en && (
            <div className="panel-lang-toggle">
              <button
                id="place-lang-vi"
                className={`lang-btn${panelLang === "vi" ? " active" : ""}`}
                onClick={() => setPanelLang("vi")}
              >
                Tiếng Việt
              </button>
              <button
                id="place-lang-en"
                className={`lang-btn${panelLang === "en" ? " active" : ""}`}
                onClick={() => setPanelLang("en")}
              >
                English
              </button>
            </div>
          )}

          <div
            className="panel-section-title"
            style={{ borderTop: "none", marginTop: 0, paddingTop: 0 }}
          >
            <BookOpen size={12} style={{ display: "inline", marginRight: 5 }} />
            {lang === "en" ? "About" : "Lịch sử & Mô tả"}
          </div>
          <p className="panel-description">{desc}</p>

          {/* Festivals */}
          {place.festivals.length > 0 && (
            <>
              <div className="panel-section-title">
                <MusicNotes size={12} style={{ display: "inline", marginRight: 5 }} />
                {lang === "en" ? "Festivals & Events" : "Lễ hội"}
              </div>
              <div>
                {place.festivals.map((f) => (
                  <span key={f} className="festival-tag">{f}</span>
                ))}
              </div>
            </>
          )}

          {/* Location */}
          <div className="panel-section-title">
            <MapPin size={12} style={{ display: "inline", marginRight: 5 }} />
            {lang === "en" ? "Location" : "Vị trí"}
          </div>
          <p className="panel-description" style={{ fontSize: "0.8rem" }}>
            {place.lat.toFixed(6)}°N, {place.lng.toFixed(6)}°E
            <br />
            {lang === "en" ? "Village" : "Làng"}: {
              place.village_slug.split("-").map((w) =>
                w.charAt(0).toUpperCase() + w.slice(1)
              ).join(" ")
            }
          </p>

          {/* Sources & confidence */}
          <div className="panel-section-title">
            {lang === "en" ? "Sources & Reliability" : "Nguồn tư liệu & Độ tin cậy"}
          </div>
          <div className="confidence-bar">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`confidence-dot${i <= place.confidence ? " filled" : ""}`}
              />
            ))}
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginLeft: 6 }}>
              {lang === "en" ? confidence?.en : confidence?.vi}
            </span>
          </div>
          {place.sources.map((src, i) => (
            <p key={i} className="panel-description" style={{ fontSize: "0.75rem", marginTop: 8 }}>
              {src.citation}
              {src.url && (
                <a href={src.url} target="_blank" rel="noopener" style={{ color: "var(--amber-400)" }}>
                  {" ↗"}
                </a>
              )}
            </p>
          ))}

          {/* Photo credit */}
          {img?.credit && (
            <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: 16 }}>
              {lang === "en" ? "Photo" : "Ảnh"}: {img.credit}
              {img.year ? `, ${img.year}` : ""}
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
