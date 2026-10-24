"use client";

import { Globe } from "@phosphor-icons/react";

interface NavbarProps {
  lang: "vi" | "en";
  setLang: (l: "vi" | "en") => void;
  onOpenAbout: () => void;
}

export default function Navbar({ lang, setLang, onOpenAbout }: NavbarProps) {
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
