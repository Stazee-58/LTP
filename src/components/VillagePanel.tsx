"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Buildings, Clock, MapTrifold, Sparkle } from "@phosphor-icons/react";
import { CATEGORY_LABELS, type Place } from "@/data/places";
import type { Village } from "@/data/villages";

interface VillagePanelProps {
  village: Village;
  places: Place[];
  lang: "vi" | "en";
  onClose: () => void;
  onOpenPlace: (p: Place) => void;
}

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

export default function VillagePanel({
  village,
  places,
  lang,
  onClose,
  onOpenPlace,
}: VillagePanelProps) {
  const p = village.properties;

  // Count by category
  const categoryCounts = places.reduce<Record<string, number>>((acc, pl) => {
    acc[pl.category] = (acc[pl.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <AnimatePresence>
      <motion.div
        className="detail-panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 280, damping: 32 }}
        role="complementary"
        aria-label={`Thông tin làng ${p.name}`}
      >
        {/* Close */}
        <button
          className="panel-close"
          style={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}
          onClick={onClose}
          aria-label="Đóng panel"
          id="village-panel-close"
        >
          <X size={16} weight="bold" />
        </button>

        <div className="panel-body" style={{ paddingTop: 28 }}>
          {/* Village header */}
          <div className="village-panel-header" style={{ padding: 0, marginBottom: 20 }}>
            <div
              className="village-color-strip"
              style={{ background: p.color }}
            />
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
              <h1 className="village-panel-name">{p.name}</h1>
              <span style={{ fontSize: "0.8rem", color: p.color, fontWeight: 600 }}>
                {p.district}
              </span>
              {p.region_name && (
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "rgba(255, 255, 255, 0.75)",
                    background: "rgba(255, 255, 255, 0.08)",
                    padding: "2px 8px",
                    borderRadius: 999,
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                >
                  {p.region_name.split("(")[0].trim()}
                </span>
              )}
            </div>
            <p className="village-panel-han">{p.name_han_nom}</p>
            {p.name_old && (
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 6 }}>
                {lang === "en" ? "Historical name" : "Địa danh cổ"}: {p.name_old}
              </p>
            )}

            {/* Craft Tradition Highlight Box */}
            {p.craft_tradition && (
              <div
                style={{
                  marginTop: 10,
                  padding: "10px 14px",
                  background: `${p.color}15`,
                  border: `1px solid ${p.color}35`,
                  borderRadius: 8,
                  fontSize: "0.82rem",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  lineHeight: 1.4,
                }}
              >
                <Sparkle size={18} weight="fill" style={{ color: p.color, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: p.color, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
                    {lang === "en" ? "Cultural Heritage & Craft" : "Đặc trưng di sản & Làng nghề"}
                  </div>
                  <div style={{ fontWeight: 500 }}>{p.craft_tradition}</div>
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="village-stats">
            <div className="stat-box">
              <div className="stat-value">{p.area_ha} ha</div>
              <div className="stat-label">{lang === "en" ? "Area" : "Diện tích"}</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{p.established}</div>
              <div className="stat-label">{lang === "en" ? "Est." : "Thành lập"}</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{places.length}</div>
              <div className="stat-label">{lang === "en" ? "Heritage & Schools" : "Địa điểm"}</div>
            </div>
            <div className="stat-box">
              <div className="stat-value" style={{ color: "var(--sage-400)" }}>
                {Object.keys(categoryCounts).length}
              </div>
              <div className="stat-label">{lang === "en" ? "Categories" : "Loại hình"}</div>
            </div>
          </div>

          {/* 2025 Administrative Merger Card */}
          {p.administrative_merger_2025 && (
            <div
              style={{
                marginTop: 18,
                padding: "12px 14px",
                background: "rgba(56, 189, 248, 0.08)",
                border: "1px solid rgba(56, 189, 248, 0.25)",
                borderRadius: 8,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  🏛️ {lang === "en" ? "Administrative Merger" : "Địa giới hành chính & Sáp nhập"}
                </span>
                {p.merger_badge && (
                  <span style={{ fontSize: "0.68rem", fontWeight: 600, color: p.color, background: `${p.color}20`, padding: "2px 8px", borderRadius: 999 }}>
                    {p.merger_badge}
                  </span>
                )}
              </div>
              {p.new_administrative_name && (
                <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
                  {lang === "en" ? "New Name: " : "Đơn vị hành chính: "}
                  <span style={{ color: "#38bdf8" }}>{p.new_administrative_name}</span>
                </div>
              )}
              <p style={{ fontSize: "0.775rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                {p.administrative_merger_2025}
              </p>
            </div>
          )}

          {/* Summary */}
          <div className="panel-section-title" style={{ marginTop: 20 }}>
            <Buildings size={12} style={{ display: "inline", marginRight: 5 }} />
            {lang === "en" ? "Overview" : "Tổng quan lịch sử"}
          </div>
          <p className="panel-description">{p.summary}</p>

          {/* Categories breakdown */}
          {Object.keys(categoryCounts).length > 0 && (
            <>
              <div className="panel-section-title">
                <MapTrifold size={12} style={{ display: "inline", marginRight: 5 }} />
                {lang === "en" ? "Heritage by type" : "Di tích theo loại"}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {Object.entries(categoryCounts).map(([cat, count]) => {
                  const label = CATEGORY_LABELS[cat];
                  return (
                    <div
                      key={cat}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "4px 10px",
                        background: `${CATEGORY_COLORS[cat] || "#C9A84C"}18`,
                        border: `1px solid ${CATEGORY_COLORS[cat] || "#C9A84C"}44`,
                        borderRadius: 100,
                        fontSize: "0.75rem",
                        color: CATEGORY_COLORS[cat] || "#C9A84C",
                      }}
                    >
                      <span>{label?.icon}</span>
                      <span>{lang === "en" ? label?.en : label?.vi}</span>
                      <span
                        style={{
                          background: CATEGORY_COLORS[cat] || "#C9A84C",
                          color: "#050d18",
                          borderRadius: 100,
                          padding: "1px 6px",
                          fontWeight: 600,
                          fontSize: "0.65rem",
                        }}
                      >
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Place list */}
          <div className="panel-section-title">
            <Clock size={12} style={{ display: "inline", marginRight: 5 }} />
            {lang === "en" ? "Heritage Sites" : "Danh sách di tích"}
          </div>
          <div>
            {places.map((pl) => {
              const cat = CATEGORY_LABELS[pl.category];
              const color = CATEGORY_COLORS[pl.category] || "#C9A84C";
              return (
                <div
                  key={pl.id}
                  className="place-list-item"
                  onClick={() => onOpenPlace(pl)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && onOpenPlace(pl)}
                  aria-label={`Xem chi tiết ${pl.name}`}
                >
                  <div
                    className="place-list-icon"
                    style={{ borderColor: `${color}44`, background: `${color}18` }}
                  >
                    {cat?.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="place-list-name">{pl.name}</div>
                    <div className="place-list-meta">
                      {lang === "en" ? cat?.en : cat?.vi}
                      {pl.built_year ? ` · ${pl.built_year}` : ""}
                    </div>
                  </div>
                  {pl.rank && (
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#C9A84C",
                        flexShrink: 0,
                      }}
                      title={pl.rank}
                    />
                  )}
                </div>
              );
            })}
            {places.length === 0 && (
              <p className="panel-description" style={{ color: "var(--text-muted)" }}>
                {lang === "en"
                  ? "No heritage sites recorded yet for this village."
                  : "Chưa có di tích nào được ghi chép cho làng này."}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
