"use client";

import { Globe } from "@phosphor-icons/react";

export type ViewMode = "2d" | "3d" | "street";

interface NavbarProps {
  lang: "vi" | "en";
  setLang: (l: "vi" | "en") => void;
  onOpenAbout: () => void;
  viewMode: ViewMode;
  onSetViewMode: (mode: ViewMode) => void;
  is3D?: boolean;
  onToggle3D?: () => void;
}

export default function Navbar({
  lang,
  setLang,
  onOpenAbout,
  viewMode,
  onSetViewMode,
}: NavbarProps) {
  return (
    <nav className="navbar" role="navigation" aria-label="Điều hướng chính">
      {/* Brand */}
      <a href="/" className="navbar-brand" aria-label="Trang chủ Làng Trong Phố">
        <div className="brand-mark" aria-hidden="true">村</div>
        <div>
          <div className="brand-text-vi">Làng Trong Phố</div>
          <div className="brand-text-en">Village in the City · Hà Nội</div>
        </div>
      </a>

      {/* Right controls */}
      <div className="navbar-right">
        {/* 2D / 3D / Street View Mode Switcher */}
        <div className="nav-view-toggle" role="group" aria-label="Chuyển chế độ hiển thị 2D / 3D / Street View">
          <button
            id="btn-nav-2d"
            className={`nav-view-tab${viewMode === "2d" ? " active" : ""}`}
            onClick={() => onSetViewMode("2d")}
            aria-pressed={viewMode === "2d"}
            title="Bản đồ 2D phẳng toàn cảnh"
          >
            <span aria-hidden="true">🗺️</span>
            <span>2D</span>
          </button>
          <button
            id="btn-nav-3d"
            className={`nav-view-tab${viewMode === "3d" ? " active" : ""}`}
            onClick={() => onSetViewMode("3d")}
            aria-pressed={viewMode === "3d"}
            title="Phối cảnh không gian 3D đô thị"
          >
            <span aria-hidden="true">🏛️</span>
            <span>3D</span>
          </button>
          <button
            id="btn-nav-street"
            className={`nav-view-tab nav-tab-street${viewMode === "street" ? " active" : ""}`}
            onClick={() => onSetViewMode("street")}
            aria-pressed={viewMode === "street"}
            title="Chế độ Street View dạo phố tầm mắt"
          >
            <span aria-hidden="true">🚶</span>
            <span>Street View</span>
          </button>
        </div>

        {/* Language toggle */}
        <button
          id="lang-toggle"
          className="ctrl-btn"
          onClick={() => setLang(lang === "vi" ? "en" : "vi")}
          aria-label={lang === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt"}
        >
          <Globe size={15} />
          <span>{lang === "vi" ? "EN" : "VI"}</span>
        </button>

        {/* About */}
        <button
          id="nav-about"
          className="ctrl-btn"
          onClick={onOpenAbout}
          aria-label={lang === "en" ? "About the project" : "Về dự án"}
        >
          {lang === "en" ? "About" : "Giới thiệu"}
        </button>
      </div>
    </nav>
  );
}
