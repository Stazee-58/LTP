"use client";

import { Globe, Info, MapTrifold, Buildings, Compass } from "@phosphor-icons/react";

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
        <div className="brand-mark" aria-hidden="true">
          <span>村</span>
        </div>
        <div className="brand-copy">
          <div className="brand-heading-row">
            <span className="brand-text-vi">LÀNG TRONG PHỐ</span>
            <span className="brand-badge-count">58 Làng Di sản</span>
          </div>
          <div className="brand-text-en">
            {lang === "en" ? "Hanoi Heritage GIS · 7 Regions" : "Bản đồ Di sản 7 Vùng Làng Cổ Hà Nội"}
          </div>
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
            <MapTrifold size={15} weight={viewMode === "2d" ? "bold" : "regular"} />
            <span>2D</span>
          </button>
          <button
            id="btn-nav-3d"
            className={`nav-view-tab${viewMode === "3d" ? " active" : ""}`}
            onClick={() => onSetViewMode("3d")}
            aria-pressed={viewMode === "3d"}
            title="Phối cảnh không gian 3D đô thị"
          >
            <Buildings size={15} weight={viewMode === "3d" ? "bold" : "regular"} />
            <span>3D</span>
          </button>
          <button
            id="btn-nav-street"
            className={`nav-view-tab nav-tab-street${viewMode === "street" ? " active" : ""}`}
            onClick={() => onSetViewMode("street")}
            aria-pressed={viewMode === "street"}
            title="Chế độ Street View dạo phố tầm mắt"
          >
            <Compass size={15} weight={viewMode === "street" ? "bold" : "regular"} />
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
          <Info size={15} />
          <span className="hidden sm:inline">{lang === "en" ? "About" : "Giới thiệu"}</span>
        </button>
      </div>
    </nav>
  );
}

