"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, BookOpen, MapPin, Compass, ShieldCheck, Buildings, GraduationCap, Image as ImageIcon } from "@phosphor-icons/react";

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
  lang: "vi" | "en";
}

export default function AboutModal({ open, onClose, lang }: AboutModalProps) {
  const [activeTab, setActiveTab] = useState<"history" | "merger" | "method">("history");

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
            {/* Header Hero Banner with authentic village image */}
            <div className="modal-hero-wrapper">
              <img
                src="/images/den_khuong_ha_gate_real.jpg"
                alt="Cổng làng cổ Bắc Bộ"
                className="modal-hero-img"
              />
              <div className="modal-hero-overlay" />
              <button className="panel-close modal-hero-close" onClick={onClose} aria-label="Đóng">
                <X size={16} weight="bold" />
              </button>
              <div className="modal-hero-content">
                <div className="brand-mark" style={{ width: 38, height: 38, fontSize: 17, background: "rgba(5,13,24,0.7)" }}>
                  村
                </div>
                <div>
                  <h2 className="modal-title">
                    {lang === "en" ? "Village in the City · Hanoi" : "Làng Trong Phố · Hà Nội"}
                  </h2>
                  <div className="modal-sub">
                    {lang === "en"
                      ? "Heritage Digitalization & 2025 Administrative Boundary Preservation"
                      : "Bản đồ số di sản 4 làng cổ & Ký ức địa danh Thăng Long"}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="modal-tabs">
              <button
                className={`modal-tab${activeTab === "history" ? " active" : ""}`}
                onClick={() => setActiveTab("history")}
              >
                <BookOpen size={14} />
                <span>{lang === "en" ? "History & Culture" : "Lịch sử & Di sản"}</span>
              </button>
              <button
                className={`modal-tab${activeTab === "merger" ? " active" : ""}`}
                onClick={() => setActiveTab("merger")}
              >
                <Buildings size={14} />
                <span>{lang === "en" ? "2024-2025 Mergers" : "Sáp nhập 2024–2025"}</span>
              </button>
              <button
                className={`modal-tab${activeTab === "method" ? " active" : ""}`}
                onClick={() => setActiveTab("method")}
              >
                <Compass size={14} />
                <span>{lang === "en" ? "GIS & Methodology" : "Phương pháp GIS"}</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              {activeTab === "history" && (
                <>
                  <section className="modal-section">
                    <h3 className="modal-heading">
                      <BookOpen size={16} className="text-gold" />
                      {lang === "en" ? "4 Ancient Villages of To Lich Basin" : "4 Làng cổ ven sông Tô Lịch"}
                    </h3>
                    <p>
                      {lang === "en"
                        ? "South of the ancient Thang Long citadel along the To Lich River, four historic villages flourished: Khuong Ha (Ginger Village Lower), Khuong Trung (Ginger Village Center), Khuong Dinh, and Khuong Thuong. Each village possessed its own communal house (dinh), Buddhist pagoda (chua), ancient wells, brick gates, and clan temples."
                        : "Nằm ở phía nam kinh thành Thăng Long ven dòng sông Tô Lịch lịch sử, 4 làng cổ Khương Hạ (làng Gừng Hạ), Khương Trung (làng Gừng Trung), Khương Đình và Khương Thượng là những tế bào văn hoá làng quê đồng bằng Bắc Bộ lâu đời, hội tụ đầy đủ thiết chế: Đình - Đền - Chùa - Miếu - Giếng cổ - Cổng làng - Nhà thờ họ."}
                    </p>
                  </section>

                  {/* Photo Showcase */}
                  <div className="modal-gallery-grid">
                    <div className="gallery-card">
                      <img src="/images/dinh_khuong_ha_real.jpg" alt="Lễ hội truyền thống Đình Khương Hạ" />
                      <div className="gallery-caption">
                        {lang === "en" ? "Traditional Festival at Khuong Ha" : "Lễ hội truyền thống Đình Khương Hạ"}
                      </div>
                    </div>
                    <div className="gallery-card">
                      <img src="/images/dinh_khuong_trung_real.jpg" alt="Đình làng Khương Trung và cây đa cổ" />
                      <div className="gallery-caption">
                        {lang === "en" ? "Khuong Trung Communal House & Banyan" : "Đình Khương Trung số 245 & Cây đa cổ"}
                      </div>
                    </div>
                  </div>

                  <section className="modal-section">
                    <h3 className="modal-heading">
                      <GraduationCap size={16} className="text-gold" />
                      {lang === "en" ? "Tradition of Education & Schools" : "Truyền thống Khoa bảng & Thiết chế Giáo dục"}
                    </h3>
                    <p>
                      {lang === "en"
                        ? "In addition to religious landmarks, the villages boast centuries of scholarly reverence. The project now maps educational institutions—from primary and secondary schools in Khuong Ha, Khuong Trung, Khuong Dinh to prestigious national centers like Hanoi Medical University and Thuy Loi University adjacent to Khuong Thuong."
                        : "Bên cạnh các di tích tín ngưỡng, cụm làng Khương nổi tiếng với truyền thống hiếu học. Dự án đã cập nhật hệ thống trường học các cấp: THCS/THPT Khương Hạ, Khương Trung, Khương Đình cùng các trường đại học trọng điểm quốc gia như Đại học Y Hà Nội (1902) và Đại học Thủy Lợi (1959) kề cận làng Khương Thượng."}
                    </p>
                  </section>
                </>
              )}

              {activeTab === "merger" && (
                <>
                  <div className="modal-callout">
                    <div className="callout-title">
                      🏛️ {lang === "en" ? "2024–2025 Administrative Reorganization in Hanoi" : "Nghị quyết sắp xếp đơn vị hành chính cấp xã (hiệu lực 2025)"}
                    </div>
                    <p className="callout-text">
                      {lang === "en"
                        ? "Under Resolution No. 1286/NQ-UBTVQH15 of the National Assembly Standing Committee on urban administrative restructuring for the 2023–2025 period in Hanoi, several historic wards have merged into new administrative units."
                        : "Thực hiện Nghị quyết số 1286/NQ-UBTVQH15 của Ủy ban Thường vụ Quốc hội về việc sắp xếp các đơn vị hành chính cấp xã giai đoạn 2023–2025 tại thành phố Hà Nội, địa giới hành chính của nhiều phường đã được tái cấu trúc quy mô lớn."}
                    </p>
                  </div>

                  <div className="merger-details-list">
                    <div className="merger-card">
                      <div className="merger-badge">Quận Đống Đa</div>
                      <h4>Phường Khương Thượng → Phường Kim Liên (Mới)</h4>
                      <p>
                        {lang === "en"
                          ? "Khuong Thuong Ward has officially merged with Kim Lien Ward and parts of Trung Tu to form the new Kim Lien Ward. The historic village boundary of Khuong Thuong (dating back to the 1789 Dong Da battle) is preserved on this map."
                          : "Toàn bộ phường Khương Thượng cùng phường Kim Liên và một phần Trung Tự sáp nhập thành Phường Kim Liên mới. Bản đồ 'Làng Trong Phố' lưu giữ chính xác ranh giới lịch sử làng Khương Thượng quanh hồ Khương Thượng và phố Chùa Bộc."}
                      </p>
                    </div>

                    <div className="merger-card">
                      <div className="merger-badge">Quận Thanh Xuân</div>
                      <h4>Sáp nhập Phường Kim Giang vào Phường Hạ Đình</h4>
                      <p>
                        {lang === "en"
                          ? "Kim Giang Ward merged into Ha Dinh Ward; Khuong Dinh and Khuong Trung boundaries are streamlined along the To Lich River and Dam Hong ecological corridor."
                          : "Phường Kim Giang sáp nhập nguyên trạng vào phường Hạ Đình. Không gian phường Khương Đình và Khương Trung được kiện toàn địa giới, đồng bộ hóa quy hoạch đô thị ven sông Tô Lịch."}
                      </p>
                    </div>
                  </div>

                  <section className="modal-section" style={{ marginTop: 10 }}>
                    <h3 className="modal-heading">
                      <ShieldCheck size={16} className="text-gold" />
                      {lang === "en" ? "Mission of 'Village in the City'" : "Ý nghĩa bảo tồn của dự án"}
                    </h3>
                    <p>
                      {lang === "en"
                        ? "While administrative names and ward demarcations evolve over time, the cultural geography, ancestral shrines, communal ponds, and social cohesion of the villages endure. This web map ensures these historical identities remain accessible and unforgettable to future generations."
                        : "Dù tên gọi hành chính trên giấy tờ thay đổi theo từng thời kỳ, không gian văn hóa, đình chùa, giếng làng và ký ức lịch sử ngàn năm vẫn là linh hồn không thể thay thế. Dự án định vị chính xác từng tọa độ để thế hệ trẻ luôn biết về cội nguồn 'Làng trong phố'."}
                    </p>
                  </section>
                </>
              )}

              {activeTab === "method" && (
                <>
                  <section className="modal-section">
                    <h3 className="modal-heading">
                      <Compass size={16} className="text-gold" />
                      {lang === "en" ? "Data Sources & GPS Ground-Truthing" : "Khảo sát Thực địa GPS & Đối chiếu Địa bạ"}
                    </h3>
                    <ul className="modal-list">
                      <li>
                        <strong>{lang === "en" ? "Field GPS Coordinates: " : "Đo đạc toạ độ GPS thực tế: "}</strong>
                        {lang === "en"
                          ? "All coordinates for communal houses, pagodas, village gates, and schools have been calibrated via OpenStreetMap and direct 2024 field survey verification."
                          : "Toàn bộ toạ độ của Đình Khương Hạ, Đình Khương Trung, Cổng làng ngõ 211, Đình Khương Thượng, Chùa Bộc và các trường học được đo đạc chuẩn xác theo vệ tinh OpenStreetMap & thực tế 2024."}
                      </li>
                      <li>
                        <strong>{lang === "en" ? "3D Architectural Volumes: " : "Mô hình không gian 3D: "}</strong>
                        {lang === "en"
                          ? "MapLibre GL fill-extrusion with real building heights, dynamic lighting, and distinctive roof styling for heritage sites vs residential alleys."
                          : "Tích hợp lớp 3D fill-extrusion với chiều cao kiến trúc thực tế, ánh sáng bản đồ động và màu sắc phân biệt đình chùa cổ (mái ngói vàng hoàng thổ/đỏ đất) và khối nhà đô thị."}
                      </li>
                      <li>
                        <strong>{lang === "en" ? "Offline-first Architecture: " : "Kiến trúc dữ liệu tối ưu: "}</strong>
                        {lang === "en"
                          ? "Next.js App Router, GeoJSON data structures, High-detail OSM France midnight raster tiles with zero API limits."
                          : "Next.js App Router, GeoJSON chuẩn OGC, bản đồ đêm OSM France sắc nét từng ngõ ngách không giới hạn băng thông."}
                      </li>
                    </ul>
                  </section>
                </>
              )}

              <div className="modal-footer">
                <ShieldCheck size={16} className="text-gold" />
                <span>
                  {lang === "en"
                    ? "Open cultural heritage initiative · Preserving Hanoi's Living Memories."
                    : "Dự án số hóa di sản phi lợi nhuận · Giữ gìn ký ức sống của Thủ đô Hà Nội."}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
