"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, BookOpen, MapPin, Compass, ShieldCheck } from "@phosphor-icons/react";

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
  lang: "vi" | "en";
}

export default function AboutModal({ open, onClose, lang }: AboutModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
          {/* Header */}
          <div className="modal-header">
            <div className="modal-brand">
              <div className="brand-mark" style={{ width: 36, height: 36, fontSize: 16 }}>村</div>
              <div>
                <h2 className="modal-title">
                  {lang === "en" ? "About 'Village in the City'" : "Về dự án 'Làng Trong Phố'"}
                </h2>
                <div className="modal-sub">
                  {lang === "en"
                    ? "Heritage Digitalization of 4 Ancient Villages · Hanoi"
                    : "Số hóa di sản 4 làng cổ ven sông Tô Lịch · Hà Nội"}
                </div>
              </div>
            </div>
            <button className="panel-close" onClick={onClose} aria-label="Đóng">
              <X size={16} weight="bold" />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <section className="modal-section">
              <h3 className="modal-heading">
                <BookOpen size={16} className="text-gold" />
                {lang === "en" ? "Historical Narrative" : "Bối cảnh Lịch sử"}
              </h3>
              <p>
                {lang === "en"
                  ? "Nestled along the historic Tô Lịch River south of the ancient Thăng Long Citadel, the four villages—Khương Hạ (姜下), Khương Trung (姜中), Khương Đình (姜亭), and Khương Thượng (姜上)—represent centuries of traditional Northern Vietnamese agrarian community life. Notably, Khương Thượng was the staging ground of the historic 1789 Battle of Ngọc Hồi–Đống Đa led by Emperor Quang Trung."
                  : "Nằm ven dòng sông Tô Lịch cổ kính ở phía nam kinh thành Thăng Long, cụm 4 làng cổ Khương Hạ (姜下), Khương Trung (姜中), Khương Đình (姜亭) và Khương Thượng (姜上) là chứng nhân của hàng trăm năm văn hoá làng quê đồng bằng Bắc Bộ. Đặc biệt, Khương Thượng là chiến địa gắn liền với chiến thắng Ngọc Hồi - Đống Đa oanh liệt mùa xuân Kỷ Dậu (1789) của nghĩa quân Tây Sơn do Hoàng đế Quang Trung chỉ huy."}
              </p>
            </section>

            <section className="modal-section">
              <h3 className="modal-heading">
                <MapPin size={16} className="text-gold" />
                {lang === "en" ? "Heritage Preservation in Modern Urbanization" : "Bảo tồn Ký ức Làng trong Lòng Đô thị"}
              </h3>
              <p>
                {lang === "en"
                  ? "Under the rapid urban expansion of Hanoi into modern high-density districts (Thanh Xuân, Đống Đa), traditional boundaries and spatial markers risk fading. This web map preserves the intangible and tangible memory: communal houses (đình), pagodas (chùa), village gates (cổng làng), historic wells (giếng cổ), and village ponds (ao làng)."
                  : "Trong tiến trình đô thị hoá thần tốc, các làng cổ dần hòa vào các quận nội thành sầm uất (Thanh Xuân, Đống Đa). Bản đồ số 'Làng Trong Phố' hướng tới lưu trữ, hiển thị không gian văn hóa sống động: đình làng, chùa cổ, cổng làng, giếng làng ngàn năm, và những ngõ ngách lưu giữ cấu trúc làng truyền thống."}
              </p>
            </section>

            <section className="modal-section">
              <h3 className="modal-heading">
                <Compass size={16} className="text-gold" />
                {lang === "en" ? "Data Sources & Methodology" : "Nguồn Dữ liệu & Phương pháp"}
              </h3>
              <ul className="modal-list">
                <li>
                  <strong>{lang === "en" ? "Historical Records: " : "Tư liệu địa chí cổ: "}</strong>
                  {lang === "en"
                    ? "Đồng Khánh Địa Dư Chí, French colonial survey maps (1902–1925), and local village genealogical records."
                    : "Đồng Khánh địa dư chí, Bản đồ Hà Nội thời Pháp (1902–1925), các văn bia đình làng và tộc phả dòng họ."}
                </li>
                <li>
                  <strong>{lang === "en" ? "Field Surveys: " : "Khảo sát thực địa: "}</strong>
                  {lang === "en"
                    ? "GPS ground-truthing in 2023–2024 with oral tradition recordings from village elders."
                    : "Đo đạc toạ độ GPS thực tế năm 2023–2024 kết hợp phỏng vấn các vị cao niên và thủ từ bản địa."}
                </li>
                <li>
                  <strong>{lang === "en" ? "Mapping Engine: " : "Nền tảng công nghệ: "}</strong>
                  {lang === "en"
                    ? "MapLibre GL JS, Vector/Raster Carto Dark Tiles, Next.js, and GeoJSON boundaries."
                    : "MapLibre GL JS, Carto Dark Matter, Next.js và hệ thống ranh giới GeoJSON chuẩn xác."}
                </li>
              </ul>
            </section>

            <div className="modal-footer">
              <ShieldCheck size={16} className="text-gold" />
              <span>
                {lang === "en"
                  ? "Open-access cultural heritage research project."
                  : "Dự án nghiên cứu & số hóa di sản phi lợi nhuận vì cộng đồng."}
              </span>
            </div>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
