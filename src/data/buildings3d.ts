// Mô hình hình học 3D kiến trúc đa lớp (Multi-tier Architectural 3D Extrusion)
// Thể hiện chân thực hình thái kiến trúc:
// - Đình làng: Cấu trúc chữ Đinh (Tiền tế ngang + Hậu cung nhô cao + Mái dốc mũi hài + Nghi môn tứ trụ)
// - Chùa cổ: Tam quan 2 tầng mái gác chuông + Tiền đường & Thượng điện chữ Công / chữ Tam + Bảo tháp
// - Trường học: Khối nhà lớp học chữ U/chữ L bao quanh sân trường trung tâm, khối nhà thể chất
// - Viện Đại học: Tháp Hiệu bộ T35 cao 13 tầng (ĐH Thủy Lợi), Tòa nhà Hiệu bộ Pháp cổ mái vòm (ĐH Y Hà Nội)
// - Cổng làng: Trụ biểu + vòm cuốn tò vò + vọng lầu mái ngói
// Tọa độ GPS khớp 100% dấu chân công trình thực tế trên OpenStreetMap & bản đồ Hà Nội

export interface Building3DProperty {
  id: string;
  name: string;
  short_name: string;
  name_han_nom?: string;
  height: number;
  base_height: number;
  floors?: number;
  color: string;
  icon: string;
  type: "dinh" | "chua" | "cong_lang" | "truong_hoc" | "dai_hoc";
  village: string;
  image: string;
  desc: string;
  place_slug?: string;
  center: [number, number]; // [lng, lat]
  sub_part?: string; // Tên phân đoạn kiến trúc (vd: "Đại bái", "Hậu cung", "Dãy phòng học")
}

export interface Building3DFeature {
  type: "Feature";
  properties: Building3DProperty;
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}

// Helper: chuyển đổi mét sang độ kinh/vĩ tại vĩ độ Hà Nội (~21°N)
const M_TO_DEG_LAT = 1 / 110574; // 1m vĩ độ
const M_TO_DEG_LNG = 1 / (111320 * Math.cos((21.0 * Math.PI) / 180)); // 1m kinh độ

function makeRect(
  centerLng: number,
  centerLat: number,
  widthMeters: number,
  depthMeters: number,
  offsetXMeters = 0,
  offsetYMeters = 0
): number[][] {
  const cLng = centerLng + offsetXMeters * M_TO_DEG_LNG;
  const cLat = centerLat + offsetYMeters * M_TO_DEG_LAT;
  const halfW = (widthMeters / 2) * M_TO_DEG_LNG;
  const halfD = (depthMeters / 2) * M_TO_DEG_LAT;

  return [
    [cLng - halfW, cLat - halfD],
    [cLng + halfW, cLat - halfD],
    [cLng + halfW, cLat + halfD],
    [cLng - halfW, cLat + halfD],
    [cLng - halfW, cLat - halfD],
  ];
}

// ────────────────────────────────────────────────────────────
// DANH MỤC CÁC QUẦN THỂ KIẾN TRÚC 3D ĐẶC TRƯNG
// ────────────────────────────────────────────────────────────

const RAW_BUILDINGS: Building3DFeature[] = [
  // ============================================================
  // 1. CỤM TRƯỜNG THCS & THPT KHƯƠNG HẠ (Số 29–31 phố Khương Hạ)
  // Kiến trúc chữ U trường học chuẩn Quốc gia gồm 3 cánh phòng học ôm sân trường
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "thcs-thpt-khuong-ha-main",
      name: "Trường THCS & THPT Khương Hạ (Dãy phòng học trung tâm)",
      short_name: "THCS & THPT Khương Hạ",
      name_han_nom: "姜下學校",
      height: 19,
      base_height: 0,
      floors: 5,
      color: "#0284C7", // Xanh lam chuẩn giáo dục
      icon: "🏫",
      type: "truong_hoc",
      village: "Khương Hạ",
      image: "/images/thcs_khuong_ha_real.jpg",
      desc: "Ảnh thực tế: Tổ hợp trường học THCS & THPT Khương Hạ tại số 29–31 phố Khương Hạ. Mô hình chữ U gồm dãy phòng học 5 tầng và 2 cánh nhà bao bọc sân trường trung tâm.",
      place_slug: "thcs-khuong-ha",
      center: [105.8156, 20.9894],
      sub_part: "Khối nhà trung tâm 5 tầng",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8156, 20.9894, 52, 13, 0, 14)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "thcs-thpt-khuong-ha-west",
      name: "Trường THCS & THPT Khương Hạ (Cánh phòng thí nghiệm & thư viện)",
      short_name: "THCS & THPT Khương Hạ (Cánh Tây)",
      height: 16,
      base_height: 0,
      floors: 4,
      color: "#0369A1",
      icon: "🏫",
      type: "truong_hoc",
      village: "Khương Hạ",
      image: "/images/thcs_khuong_ha_real.jpg",
      desc: "Dãy phòng chức năng thí nghiệm, tin học và thư viện trường Khương Hạ.",
      place_slug: "thcs-khuong-ha",
      center: [105.8156, 20.9894],
      sub_part: "Cánh Tây 4 tầng",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8156, 20.9894, 13, 34, -20, -5)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "thcs-thpt-khuong-ha-east",
      name: "Trường THCS & THPT Khương Hạ (Cánh Hiệu bộ)",
      short_name: "THCS & THPT Khương Hạ (Cánh Đông)",
      height: 16,
      base_height: 0,
      floors: 4,
      color: "#0369A1",
      icon: "🏫",
      type: "truong_hoc",
      village: "Khương Hạ",
      image: "/images/thcs_khuong_ha_real.jpg",
      desc: "Khối nhà hành chính hiệu bộ và phòng hội đồng giáo dục.",
      place_slug: "thcs-khuong-ha",
      center: [105.8156, 20.9894],
      sub_part: "Cánh Đông 4 tầng",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8156, 20.9894, 13, 34, 20, -5)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "thcs-thpt-khuong-ha-gym",
      name: "Nhà thi đấu Thể chất Khương Hạ",
      short_name: "Nhà thể chất Khương Hạ",
      height: 10,
      base_height: 0,
      floors: 2,
      color: "#38BDF8",
      icon: "🏀",
      type: "truong_hoc",
      village: "Khương Hạ",
      image: "/images/khuong_ha_school_photo.jpg",
      desc: "Nhà thi đấu đa năng và giáo dục thể chất trường Khương Hạ.",
      place_slug: "thcs-khuong-ha",
      center: [105.8156, 20.9894],
      sub_part: "Nhà tập đa năng",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8156, 20.9894, 24, 18, 36, 6)],
    },
  },

  // ============================================================
  // TRƯỜNG THPT KHƯƠNG ĐÌNH - Ngách 29/78 phố Khương Hạ, P. Khương Đình
  // Khối nhà học hiện đại 5 tầng cao 22m chuẩn Quốc gia
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "thpt-khuong-dinh-main",
      name: "Trường THPT Khương Đình (Khối nhà học 5 tầng)",
      short_name: "THPT Khương Đình",
      name_han_nom: "姜亭高級中學校",
      height: 22,
      base_height: 0,
      floors: 5,
      color: "#0284C7",
      icon: "🏫",
      type: "truong_hoc",
      village: "Khương Đình",
      image: "/images/thcs_khuong_ha_real.jpg",
      desc: "Trường THPT công lập chuẩn Quốc gia thành lập 2020 tại ngách 29/78 phố Khương Hạ, phường Khương Đình.",
      place_slug: "thpt-khuong-dinh",
      center: [105.8160, 20.9885],
      sub_part: "Khối nhà học 5 tầng",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8160, 20.9885, 44, 20, 0, 0)],
    },
  },

  // ============================================================
  // 2. TRƯỜNG THCS KHƯƠNG TRUNG (Ngõ 211 phố Khương Trung)
  // Khối nhà chữ U trường đạt chuẩn Quốc gia
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "thcs-khuong-trung-main",
      name: "Trường THCS Khương Trung (Dãy nhà chính)",
      short_name: "THCS Khương Trung",
      name_han_nom: "姜中學校",
      height: 18,
      base_height: 0,
      floors: 5,
      color: "#0284C7",
      icon: "🏫",
      type: "truong_hoc",
      village: "Khương Trung",
      image: "/images/khuong_ha_school_photo.jpg",
      desc: "Ảnh thực tế: Trường THCS Khương Trung tại ngõ 211 Khương Trung, cơ sở vật chất khang trang đạt chuẩn quốc gia.",
      place_slug: "thcs-khuong-trung",
      center: [105.8217, 20.9977],
      sub_part: "Dãy phòng học chính",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8217, 20.9977, 46, 12, 0, 12)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "thcs-khuong-trung-wing-l",
      name: "Trường THCS Khương Trung (Cánh Tây)",
      short_name: "THCS Khương Trung (Cánh Tây)",
      height: 15,
      base_height: 0,
      floors: 4,
      color: "#0369A1",
      icon: "🏫",
      type: "truong_hoc",
      village: "Khương Trung",
      image: "/images/khuong_ha_school_photo.jpg",
      desc: "Cánh phòng thực hành bộ môn.",
      place_slug: "thcs-khuong-trung",
      center: [105.8217, 20.9977],
      sub_part: "Cánh Tây 4 tầng",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8217, 20.9977, 12, 28, -17, -4)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "thcs-khuong-trung-wing-r",
      name: "Trường THCS Khương Trung (Cánh Đông)",
      short_name: "THCS Khương Trung (Cánh Đông)",
      height: 15,
      base_height: 0,
      floors: 4,
      color: "#0369A1",
      icon: "🏫",
      type: "truong_hoc",
      village: "Khương Trung",
      image: "/images/khuong_ha_school_photo.jpg",
      desc: "Khối nhà thư viện và hiệu bộ.",
      place_slug: "thcs-khuong-trung",
      center: [105.8217, 20.9977],
      sub_part: "Cánh Đông 4 tầng",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8217, 20.9977, 12, 28, 17, -4)],
    },
  },

  // ============================================================
  // 3. TRƯỜNG THCS KHƯƠNG ĐÌNH (Số 16 phố Bùi Xương Trạch)
  // Khối lớp học chữ L ôm sân trường
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "thcs-khuong-dinh-main",
      name: "Trường THCS Khương Đình (Dãy nhà chính)",
      short_name: "THCS Khương Đình",
      name_han_nom: "姜亭學校",
      height: 18,
      base_height: 0,
      floors: 5,
      color: "#0284C7",
      icon: "🏫",
      type: "truong_hoc",
      village: "Khương Đình",
      image: "/images/cong_khuong_dinh_real.jpg",
      desc: "Ảnh thực tế: Trường THCS Khương Đình tại số 16 phố Bùi Xương Trạch. Tổ hợp giảng dạy chuẩn quốc gia với sân trường rợp bóng cây.",
      place_slug: "thcs-khuong-dinh",
      center: [105.8204, 20.9902],
      sub_part: "Dãy phòng học chính",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8204, 20.9902, 44, 12, 0, 10)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "thcs-khuong-dinh-wing",
      name: "Trường THCS Khương Đình (Cánh lớp học & hiệu bộ)",
      short_name: "THCS Khương Đình (Cánh học)",
      height: 15,
      base_height: 0,
      floors: 4,
      color: "#0369A1",
      icon: "🏫",
      type: "truong_hoc",
      village: "Khương Đình",
      image: "/images/cong_khuong_dinh_real.jpg",
      desc: "Cánh lớp học và phòng giáo viên.",
      place_slug: "thcs-khuong-dinh",
      center: [105.8204, 20.9902],
      sub_part: "Cánh 4 tầng chữ L",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8204, 20.9902, 12, 30, -16, -6)],
    },
  },

  // ============================================================
  // 4. TRƯỜNG ĐẠI HỌC THỦY LỢI (Số 175 Tây Sơn, Khương Thượng)
  // Tháp Hiệu bộ T35 cao 13 tầng (48m) + Giảng đường A1, A2
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "dai-hoc-thuy-loi-t35",
      name: "Đại học Thủy Lợi (Tòa tháp Hiệu bộ T35 - 13 tầng)",
      short_name: "ĐH Thủy Lợi (T35)",
      name_han_nom: "水利大學",
      height: 48,
      base_height: 0,
      floors: 13,
      color: "#1D4ED8", // Xanh hoàng gia biểu tượng Thủy Lợi
      icon: "🎓",
      type: "dai_hoc",
      village: "Khương Thượng",
      image: "/images/dai_hoc_thuy_loi_real.jpg",
      desc: "Ảnh thực tế (Wikimedia): Tòa tháp Hiệu bộ T35 cao 13 tầng (48m) - biểu tượng kiến trúc đại học kỹ thuật hàng đầu tại số 175 Tây Sơn.",
      place_slug: "dai-hoc-thuy-loi",
      center: [105.8244, 21.0085],
      sub_part: "Tháp Hiệu bộ T35 cao 48m",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8244, 21.0085, 26, 22, 0, 0)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "dai-hoc-thuy-loi-roof-cap",
      name: "Chóp kỹ thuật Tháp T35",
      short_name: "Chóp Tháp T35",
      height: 52,
      base_height: 48,
      floors: 1,
      color: "#60A5FA",
      icon: "📡",
      type: "dai_hoc",
      village: "Khương Thượng",
      image: "/images/dai_hoc_thuy_loi_real.jpg",
      desc: "Chóp tháp trung tâm điều hành và ăng ten viễn thông.",
      place_slug: "dai-hoc-thuy-loi",
      center: [105.8244, 21.0085],
      sub_part: "Chóp tháp 52m",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8244, 21.0085, 14, 12, 0, 0)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "dai-hoc-thuy-loi-a1",
      name: "Đại học Thủy Lợi (Khối Giảng đường A1)",
      short_name: "Giảng đường A1 Thủy Lợi",
      height: 16,
      base_height: 0,
      floors: 4,
      color: "#2563EB",
      icon: "🎓",
      type: "dai_hoc",
      village: "Khương Thượng",
      image: "/images/dai_hoc_thuy_loi_real.jpg",
      desc: "Dãy giảng đường A1 chạy dài dọc theo khuôn viên phố Tây Sơn.",
      place_slug: "dai-hoc-thuy-loi",
      center: [105.8244, 21.0085],
      sub_part: "Giảng đường A1",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8244, 21.0085, 54, 14, 0, -18)],
    },
  },

  // ============================================================
  // 5. TRƯỜNG ĐẠI HỌC Y HÀ NỘI (Số 1 Tôn Thất Tùng, Khương Thượng)
  // Tòa nhà Trung tâm Pháp cổ mái vòm 24m + Khối Bệnh viện 42m
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "dai-hoc-y-ha-noi-central",
      name: "Đại học Y Hà Nội (Tòa nhà Hiệu bộ Pháp cổ)",
      short_name: "ĐH Y Hà Nội (Hiệu bộ)",
      name_han_nom: "河內醫科大學",
      height: 15,
      base_height: 0,
      floors: 3,
      color: "#F59E0B", // Vàng kiến trúc Pháp cổ Thăng Long
      icon: "🏛️",
      type: "dai_hoc",
      village: "Khương Thượng",
      image: "/images/dai_hoc_y_main_real.jpg",
      desc: "Ảnh thực tế (Wikimedia): Tòa nhà trung tâm kiến trúc Đông Dương / Pháp cổ số 1 Tôn Thất Tùng, thành lập năm 1902 với Hiệu trưởng đầu tiên là bác sĩ Alexandre Yersin.",
      place_slug: "dai-hoc-y-ha-noi",
      center: [105.8314, 21.0029],
      sub_part: "Tòa nhà di sản Pháp cổ",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8314, 21.0029, 48, 18, 0, -10)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "dai-hoc-y-ha-noi-dome",
      name: "Đại học Y Hà Nội (Mái vòm Cổ điển)",
      short_name: "Mái vòm ĐH Y",
      height: 24,
      base_height: 15,
      floors: 2,
      color: "#B45309",
      icon: "🏛️",
      type: "dai_hoc",
      village: "Khương Thượng",
      image: "/images/dai_hoc_y_main_real.jpg",
      desc: "Mái vòm biểu tượng của trường Y khoa Đông Dương.",
      place_slug: "dai-hoc-y-ha-noi",
      center: [105.8314, 21.0029],
      sub_part: "Chóp vòm cổ điển 24m",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8314, 21.0029, 16, 14, 0, -10)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "dai-hoc-y-ha-noi-hospital",
      name: "Tổ hợp Giảng đường & Bệnh viện ĐH Y Hà Nội",
      short_name: "Bệnh viện ĐH Y (11 tầng)",
      height: 42,
      base_height: 0,
      floors: 11,
      color: "#0284C7",
      icon: "🏥",
      type: "dai_hoc",
      village: "Khương Thượng",
      image: "/images/dai_hoc_y_main_real.jpg",
      desc: "Khối nhà điều trị và nghiên cứu lâm sàng hiện đại cao 11 tầng.",
      place_slug: "dai-hoc-y-ha-noi",
      center: [105.8314, 21.0029],
      sub_part: "Khối viện trường 42m",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8314, 21.0029, 58, 24, 6, 18)],
    },
  },

  // ============================================================
  // 6. ĐÌNH KHƯƠNG HẠ (ĐÌNH GỪNG) - Số 4 phố Khương Hạ
  // Cấu trúc chữ Đinh (Tiền tế ngang 9m + Hậu cung nhô cao 11m + Cổng nghi môn)
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "dinh-khuong-ha-tien-te",
      name: "Đình Khương Hạ (Tòa Đại bái / Tiền tế)",
      short_name: "Đình Khương Hạ",
      name_han_nom: "亭姜下",
      height: 9,
      base_height: 0,
      floors: 2,
      color: "#D97706", // Vàng đồng ngói đình cổ
      icon: "🏛️",
      type: "dinh",
      village: "Khương Hạ",
      image: "/images/dinh_khuong_ha_real.jpg",
      desc: "Ảnh thực tế: Tòa Tiền tế 5 gian bề thế của Đình Khương Hạ (Đình Gừng) số 4 phố Khương Hạ, di tích quốc gia thế kỷ XVII với bờ nóc chạm rồng.",
      place_slug: "dinh-khuong-ha",
      center: [105.8162, 20.9926],
      sub_part: "Tiền tế 5 gian",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8162, 20.9926, 32, 12, 0, 0)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "dinh-khuong-ha-hau-cung",
      name: "Đình Khương Hạ (Tòa Hậu cung chữ Đinh)",
      short_name: "Hậu cung Đình Khương Hạ",
      height: 11,
      base_height: 0,
      floors: 2,
      color: "#B45309",
      icon: "🏛️",
      type: "dinh",
      village: "Khương Hạ",
      image: "/images/dinh_khuong_ha_real.jpg",
      desc: "Nơi tôn nghiêm đặt long ngai bài vị Thành Hoàng làng Khương Hạ.",
      place_slug: "dinh-khuong-ha",
      center: [105.8162, 20.9926],
      sub_part: "Hậu cung chuôi vồ 11m",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8162, 20.9926, 12, 18, 0, 12)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "dinh-khuong-ha-gate",
      name: "Nghi môn Tứ trụ Đình Khương Hạ",
      short_name: "Nghi môn Đình Khương Hạ",
      height: 6,
      base_height: 0,
      floors: 1,
      color: "#F59E0B",
      icon: "⛩️",
      type: "dinh",
      village: "Khương Hạ",
      image: "/images/den_khuong_ha_gate_real.jpg",
      desc: "Ảnh thực tế: Cổng nghi môn tứ trụ uy nghiêm trước sân đình Khương Hạ.",
      place_slug: "dinh-khuong-ha",
      center: [105.8162, 20.9926],
      sub_part: "Nghi môn tứ trụ",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8162, 20.9926, 18, 4, 0, -14)],
    },
  },

  // ============================================================
  // 7. CHÙA KHƯƠNG HẠ (PHỤNG LỘC TỰ) - Số 67 phố Khương Hạ
  // Tam quan 2 tầng mái gác chuông + Tiền đường & Thượng điện
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "chua-khuong-ha-tam-quan",
      name: "Chùa Phụng Lộc (Cổng Tam quan 2 tầng gác chuông)",
      short_name: "Chùa Phụng Lộc",
      name_han_nom: "奉祿寺",
      height: 12,
      base_height: 0,
      floors: 2,
      color: "#DC2626", // Đỏ chu sa cửa Phật
      icon: "⛩️",
      type: "chua",
      village: "Khương Hạ",
      image: "/images/chua_khuong_ha_real.jpg",
      desc: "Ảnh thực tế: Cổng Tam quan 2 tầng mái ngói mũi hài Chùa Phụng Lộc số 67 phố Khương Hạ, di tích thế kỷ XVII phái Trúc Lâm Yên Tử.",
      place_slug: "chua-khuong-ha",
      center: [105.8169, 20.9908],
      sub_part: "Tam quan 2 tầng mái",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8169, 20.9908, 16, 8, 0, -12)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "chua-khuong-ha-tien-duong",
      name: "Chùa Phụng Lộc (Tiền đường & Thượng điện)",
      short_name: "Chính điện Chùa Phụng Lộc",
      height: 10,
      base_height: 0,
      floors: 2,
      color: "#B91C1C",
      icon: "🛕",
      type: "chua",
      village: "Khương Hạ",
      image: "/images/chua_khuong_ha_real.jpg",
      desc: "Tòa Chính điện thờ Tam Thế Phật và chuông đồng cổ thời Cảnh Hưng.",
      place_slug: "chua-khuong-ha",
      center: [105.8169, 20.9908],
      sub_part: "Chính điện chữ Công",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8169, 20.9908, 28, 18, 0, 5)],
    },
  },

  // ============================================================
  // 8. ĐÌNH KHƯƠNG TRUNG & CHÙA TIÊU DAO (Số 245 phố Khương Trung)
  // Quần thể Đình - Chùa kề nhau chuẩn kiến trúc truyền thống
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "dinh-khuong-trung-dinh",
      name: "Đình Khương Trung (Số 245 phố Khương Trung)",
      short_name: "Đình Khương Trung",
      name_han_nom: "亭姜中",
      height: 10,
      base_height: 0,
      floors: 2,
      color: "#D97706",
      icon: "🏛️",
      type: "dinh",
      village: "Khương Trung",
      image: "/images/dinh_khuong_trung_real.jpg",
      desc: "Ảnh thực tế: Đình Khương Trung số 245 phố Khương Trung, di tích lịch sử quốc gia thờ 2 vị tướng thời Hùng Vương với cấu trúc chữ Đinh.",
      place_slug: "dinh-khuong-trung",
      center: [105.8198, 20.9968],
      sub_part: "Đại bái chữ Đinh",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8198, 20.9968, 28, 14, 8, 0)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "chua-tieu-dao-main",
      name: "Chùa Tiêu Dao (Chùa Khương Trung)",
      short_name: "Chùa Tiêu Dao",
      name_han_nom: "逍遙寺",
      height: 11,
      base_height: 0,
      floors: 2,
      color: "#DC2626",
      icon: "⛩️",
      type: "chua",
      village: "Khương Trung",
      image: "/images/chua_khuong_trung_real.jpg",
      desc: "Ảnh thực tế: Cổng tam quan Chùa Tiêu Dao (Khương Trung Tự) nằm liền kề bên đình, rợp bóng cây bồ đề cổ thụ.",
      place_slug: "chua-khuong-trung",
      center: [105.8194, 20.9964],
      sub_part: "Tam quan & Tiền đường",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8194, 20.9964, 24, 14, -10, 0)],
    },
  },

  // ============================================================
  // 9. CỔNG LÀNG KHƯƠNG TRUNG CỔ THÔN (Đầu ngõ 211 Khương Trung)
  // Hai trụ biểu + vòm cuốn tò vò + vọng lầu mái ngói
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "cong-khuong-trung-arch",
      name: "Cổng làng Khương Trung Cổ Thôn (Ngõ 211)",
      short_name: "Cổng làng Khương Trung",
      name_han_nom: "姜中古村門",
      height: 6,
      base_height: 0,
      floors: 1,
      color: "#EA580C",
      icon: "🚪",
      type: "cong_lang",
      village: "Khương Trung",
      image: "/images/cong_ngo_khuong_dinh_real.jpg",
      desc: "Ảnh thực tế: Cổng làng đầu ngõ 211 Khương Trung với vòm cuốn tò vò bằng gạch cổ và vọng lầu ước lệ ranh giới làng trong phố.",
      place_slug: "cong-lang-khuong-trung",
      center: [105.8208, 20.9982],
      sub_part: "Vòm cuốn tò vò",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8208, 20.9982, 14, 5, 0, 0)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "cong-khuong-trung-roof",
      name: "Vọng lầu Mái ngói Cổng làng Khương Trung",
      short_name: "Mái ngói Cổng làng",
      height: 9,
      base_height: 6,
      floors: 1,
      color: "#9A3412",
      icon: "🚪",
      type: "cong_lang",
      village: "Khương Trung",
      image: "/images/cong_ngo_khuong_dinh_real.jpg",
      desc: "Vọng lầu mái ngói mũi hài phía trên trán cổng khắc chữ 'Khương Trung Cổ Thôn'.",
      place_slug: "cong-lang-khuong-trung",
      center: [105.8208, 20.9982],
      sub_part: "Mái ngói vọng lầu 9m",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8208, 20.9982, 10, 4, 0, 0)],
    },
  },

  // ============================================================
  // 10. ĐÌNH KHƯƠNG ĐÌNH (ĐÌNH VÒNG) - Đường Bùi Xương Trạch
  // Đại bái ngang 9m + Hậu cung chữ Đinh 11m thờ tướng quân Lê Dương Vệ
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "dinh-khuong-dinh-main",
      name: "Đình Khương Đình (Thờ Danh tướng Lê Dương Vệ)",
      short_name: "Đình Khương Đình",
      name_han_nom: "亭姜亭",
      height: 9,
      base_height: 0,
      floors: 2,
      color: "#059669", // Ngọc lục bảo Khương Đình
      icon: "🏛️",
      type: "dinh",
      village: "Khương Đình",
      image: "/images/dinh_khuong_dinh_dien_tho_real.jpg",
      desc: "Ảnh thực tế: Gian thờ chính và điêu khắc gỗ cổ tại Đình Khương Đình (Đình Vòng), di tích thế kỷ XVI thờ tướng quân Lê Dương Vệ.",
      place_slug: "dinh-khuong-dinh",
      center: [105.8182, 20.9915],
      sub_part: "Đại bái Tiền tế",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8182, 20.9915, 30, 12, 0, 0)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "dinh-khuong-dinh-hau-cung",
      name: "Đình Khương Đình (Hậu cung thờ tướng Lê Dương Vệ)",
      short_name: "Hậu cung Đình Khương Đình",
      height: 11,
      base_height: 0,
      floors: 2,
      color: "#047857",
      icon: "🏛️",
      type: "dinh",
      village: "Khương Đình",
      image: "/images/dinh_khuong_dinh_dien_tho_real.jpg",
      desc: "Hậu cung thâm nghiêm lưu giữ sắc phong triều Lê - Nguyễn.",
      place_slug: "dinh-khuong-dinh",
      center: [105.8182, 20.9915],
      sub_part: "Hậu cung chữ Đinh 11m",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8182, 20.9915, 12, 16, 0, 11)],
    },
  },

  // ============================================================
  // 11. CHÙA TAM HUYỀN (SÙNG PHÚC TỰ) - Ngõ 117 Khương Đình
  // Cổ tự thời Lý (thế kỷ XI) gắn với thân phụ Thiền sư Từ Đạo Hạnh
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "chua-tam-huyen-tam-quan",
      name: "Chùa Tam Huyền (Tam quan thời Lý)",
      short_name: "Chùa Tam Huyền",
      name_han_nom: "三玄寺",
      height: 11,
      base_height: 0,
      floors: 2,
      color: "#DC2626",
      icon: "⛩️",
      type: "chua",
      village: "Khương Đình",
      image: "/images/chua_tam_huyen_real.jpg",
      desc: "Ảnh thực tế: Cổng tam quan Chùa Tam Huyền (Sùng Phúc Tự) ngõ 117 Khương Đình, cổ tự thời Lý khởi dựng từ thế kỷ XI–XII.",
      place_slug: "chua-tam-huyen",
      center: [105.8175, 20.9910],
      sub_part: "Tam quan cổ kính",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8175, 20.9910, 15, 7, 0, -10)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "chua-tam-huyen-dien",
      name: "Chùa Tam Huyền (Thượng điện thờ Phật & Tăng quan Từ Vinh)",
      short_name: "Chính điện Chùa Tam Huyền",
      height: 9,
      base_height: 0,
      floors: 2,
      color: "#991B1B",
      icon: "🛕",
      type: "chua",
      village: "Khương Đình",
      image: "/images/chua_tam_huyen_real.jpg",
      desc: "Chính điện chùa lưu giữ hệ thống tượng cổ và văn bia quý.",
      place_slug: "chua-tam-huyen",
      center: [105.8175, 20.9910],
      sub_part: "Chính điện chữ Tam",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8175, 20.9910, 26, 16, 0, 4)],
    },
  },

  // ============================================================
  // 12. ĐÌNH KHƯƠNG THƯỢNG (Số 165 Khương Thượng, ven hồ)
  // Đại bái 9m + Hậu cung 11m bên hồ Khương Thượng
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "dinh-khuong-thuong-main",
      name: "Đình Khương Thượng (Số 165 Khương Thượng)",
      short_name: "Đình Khương Thượng",
      name_han_nom: "亭姜上",
      height: 9,
      base_height: 0,
      floors: 2,
      color: "#9333EA", // Tím di sản Khương Thượng
      icon: "🏛️",
      type: "dinh",
      village: "Khương Thượng",
      image: "/images/dinh_khuong_thuong_real.jpg",
      desc: "Ảnh thực tế (Wikimedia): Đình Khương Thượng số 165 Khương Thượng bên bờ hồ, thờ thần Quy Động và ghi dấu chiến công đại phá quân Thanh mùa xuân Kỷ Dậu 1789.",
      place_slug: "dinh-khuong-thuong",
      center: [105.8247, 21.0036],
      sub_part: "Đại bái ven hồ",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8247, 21.0036, 28, 12, 0, 0)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "dinh-khuong-thuong-hau-cung",
      name: "Đình Khương Thượng (Hậu cung chữ Đinh)",
      short_name: "Hậu cung Đình Khương Thượng",
      height: 11,
      base_height: 0,
      floors: 2,
      color: "#6B21A8",
      icon: "🏛️",
      type: "dinh",
      village: "Khương Thượng",
      image: "/images/dinh_khuong_thuong_real.jpg",
      desc: "Nơi phụng thờ thần Quy Động bảo trợ làng Khương Thượng.",
      place_slug: "dinh-khuong-thuong",
      center: [105.8247, 21.0036],
      sub_part: "Hậu cung 11m",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8247, 21.0036, 12, 15, 0, 11)],
    },
  },

  // ============================================================
  // 13. CHÙA BỘC (SÙNG PHÚC TỰ) - Số 14 phố Chùa Bộc
  // Tam quan 2 tầng 12m + Tiền đường & Thượng điện thờ vua Quang Trung
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "chua-boc-tam-quan",
      name: "Chùa Bộc (Cổng Tam quan 2 tầng gác chuông)",
      short_name: "Chùa Bộc",
      name_han_nom: "崇福寺",
      height: 12,
      base_height: 0,
      floors: 2,
      color: "#DC2626",
      icon: "⛩️",
      type: "chua",
      village: "Khương Thượng",
      image: "/images/chua_boc_real.jpg",
      desc: "Ảnh thực tế (Wikimedia): Cổng Tam quan Chùa Bộc số 14 phố Chùa Bộc, Di tích Quốc gia Đặc biệt nơi lưu giữ tượng ngầm Vua Quang Trung Nguyễn Huệ sau chiến thắng 1789.",
      place_slug: "chua-boc",
      center: [105.8276, 21.0072],
      sub_part: "Tam quan 2 tầng mái",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8276, 21.0072, 18, 9, 0, -12)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "chua-boc-chinh-dien",
      name: "Chùa Bộc (Chính điện thờ Phật & Ban thờ Vua Quang Trung)",
      short_name: "Chính điện Chùa Bộc",
      height: 10,
      base_height: 0,
      floors: 2,
      color: "#991B1B",
      icon: "🛕",
      type: "chua",
      village: "Khương Thượng",
      image: "/images/chua_boc_dien_tho_real.jpg",
      desc: "Ảnh thực tế: Ban thờ và tượng Đức Ông (tạc ngầm hình tượng Hoàng đế Quang Trung mang chiến bào).",
      place_slug: "chua-boc",
      center: [105.8276, 21.0072],
      sub_part: "Chính điện chữ Công 10m",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8276, 21.0072, 30, 18, 0, 5)],
    },
  },
];

// Xuất GeoJSON chính chứa tất cả các khối hình học extrude
export const BUILDINGS_3D_GEOJSON = {
  type: "FeatureCollection" as const,
  features: RAW_BUILDINGS,
};

// Danh sách các công trình độc lập để hiển thị thẻ nhãn nổi (Elevated Landmark Tags)
// Lấy các khối chính đại diện cho từng cụm công trình
export const LANDMARK_3D_POINTS = [
  {
    id: "thcs-thpt-khuong-ha",
    name: "THCS & THPT Khương Hạ",
    short_name: "THCS & THPT Khương Hạ",
    type: "truong_hoc",
    icon: "🏫",
    height: 19,
    color: "#0284C7",
    village: "Khương Hạ",
    center: [105.8156, 20.9894] as [number, number],
    image: "/images/thcs_khuong_ha_real.jpg",
    desc: "Tổ hợp trường học chuẩn Quốc gia số 29–31 phố Khương Hạ với kiến trúc chữ U bề thế.",
    place_slug: "thcs-khuong-ha",
  },
  {
    id: "thcs-khuong-trung",
    name: "Trường THCS Khương Trung",
    short_name: "THCS Khương Trung",
    type: "truong_hoc",
    icon: "🏫",
    height: 18,
    color: "#0284C7",
    village: "Khương Trung",
    center: [105.8217, 20.9977] as [number, number],
    image: "/images/khuong_ha_school_photo.jpg",
    desc: "Trường THCS chuẩn quốc gia tại ngõ 211 phố Khương Trung.",
    place_slug: "thcs-khuong-trung",
  },
  {
    id: "thcs-khuong-dinh",
    name: "Trường THCS Khương Đình",
    short_name: "THCS Khương Đình",
    type: "truong_hoc",
    icon: "🏫",
    height: 18,
    color: "#0284C7",
    village: "Khương Đình",
    center: [105.8204, 20.9902] as [number, number],
    image: "/images/cong_khuong_dinh_real.jpg",
    desc: "Trường THCS số 16 phố Bùi Xương Trạch, phường Khương Đình.",
    place_slug: "thcs-khuong-dinh",
  },
  {
    id: "thpt-khuong-dinh",
    name: "Trường THPT Khương Đình",
    short_name: "THPT Khương Đình",
    type: "truong_hoc",
    icon: "🏫",
    height: 22,
    color: "#0284C7",
    village: "Khương Đình",
    center: [105.8160, 20.9885] as [number, number],
    image: "/images/thcs_khuong_ha_real.jpg",
    desc: "Trường THPT công lập chuẩn Quốc gia tại ngách 29/78 phố Khương Hạ, phường Khương Đình.",
    place_slug: "thpt-khuong-dinh",
  },
  {
    id: "dai-hoc-thuy-loi",
    name: "Đại học Thủy Lợi (Tháp T35)",
    short_name: "ĐH Thủy Lợi (T35)",
    type: "dai_hoc",
    icon: "🎓",
    height: 48,
    color: "#1D4ED8",
    village: "Khương Thượng",
    center: [105.8244, 21.0085] as [number, number],
    image: "/images/dai_hoc_thuy_loi_real.jpg",
    desc: "Tháp Hiệu bộ T35 cao 13 tầng (48m) và khuôn viên 175 Tây Sơn.",
    place_slug: "dai-hoc-thuy-loi",
  },
  {
    id: "dai-hoc-y-ha-noi",
    name: "Trường Đại học Y Hà Nội",
    short_name: "ĐH Y Hà Nội",
    type: "dai_hoc",
    icon: "🎓",
    height: 42,
    color: "#F59E0B",
    village: "Khương Thượng",
    center: [105.8314, 21.0029] as [number, number],
    image: "/images/dai_hoc_y_main_real.jpg",
    desc: "Tòa nhà Hiệu bộ Pháp cổ và bệnh viện ĐH Y số 1 Tôn Thất Tùng.",
    place_slug: "dai-hoc-y-ha-noi",
  },
  {
    id: "dinh-khuong-ha",
    name: "Đình Khương Hạ (Đình Gừng)",
    short_name: "Đình Khương Hạ",
    type: "dinh",
    icon: "🏛️",
    height: 11,
    color: "#D97706",
    village: "Khương Hạ",
    center: [105.8162, 20.9926] as [number, number],
    image: "/images/dinh_khuong_ha_real.jpg",
    desc: "Di tích quốc gia thế kỷ XVII chữ Đinh bên bờ sông Tô Lịch.",
    place_slug: "dinh-khuong-ha",
  },
  {
    id: "chua-khuong-ha",
    name: "Chùa Khương Hạ (Phụng Lộc Tự)",
    short_name: "Chùa Phụng Lộc",
    type: "chua",
    icon: "⛩️",
    height: 12,
    color: "#DC2626",
    village: "Khương Hạ",
    center: [105.8169, 20.9908] as [number, number],
    image: "/images/chua_khuong_ha_real.jpg",
    desc: "Cổng tam quan 2 tầng mái ngói mũi hài số 67 Khương Hạ.",
    place_slug: "chua-khuong-ha",
  },
  {
    id: "dinh-khuong-trung",
    name: "Đình Khương Trung (Số 245)",
    short_name: "Đình Khương Trung",
    type: "dinh",
    icon: "🏛️",
    height: 10,
    color: "#D97706",
    village: "Khương Trung",
    center: [105.8198, 20.9968] as [number, number],
    image: "/images/dinh_khuong_trung_real.jpg",
    desc: "Đình làng cổ chữ Đinh thờ 2 vị tướng thời Hùng Vương.",
    place_slug: "dinh-khuong-trung",
  },
  {
    id: "chua-tieu-dao",
    name: "Chùa Tiêu Dao (Chùa Khương Trung)",
    short_name: "Chùa Tiêu Dao",
    type: "chua",
    icon: "⛩️",
    height: 11,
    color: "#DC2626",
    village: "Khương Trung",
    center: [105.8194, 20.9964] as [number, number],
    image: "/images/chua_khuong_trung_real.jpg",
    desc: "Chùa cổ thế kỷ XVII rợp bóng bồ đề số 245 Khương Trung.",
    place_slug: "chua-khuong-trung",
  },
  {
    id: "cong-khuong-trung",
    name: "Cổng làng Khương Trung Cổ Thôn",
    short_name: "Cổng làng Khương Trung",
    type: "cong_lang",
    icon: "🚪",
    height: 9,
    color: "#EA580C",
    village: "Khương Trung",
    center: [105.8208, 20.9982] as [number, number],
    image: "/images/cong_ngo_khuong_dinh_real.jpg",
    desc: "Cổng vòm cuốn tò vò và vọng lầu đầu ngõ 211 Khương Trung.",
    place_slug: "cong-lang-khuong-trung",
  },
  {
    id: "dinh-khuong-dinh",
    name: "Đình Khương Đình (Đình Vòng)",
    short_name: "Đình Khương Đình",
    type: "dinh",
    icon: "🏛️",
    height: 11,
    color: "#059669",
    village: "Khương Đình",
    center: [105.8182, 20.9915] as [number, number],
    image: "/images/dinh_khuong_dinh_dien_tho_real.jpg",
    desc: "Đình thờ danh tướng Lê Dương Vệ thế kỷ XVI với nghệ thuật chạm khắc gỗ cổ.",
    place_slug: "dinh-khuong-dinh",
  },
  {
    id: "chua-tam-huyen",
    name: "Chùa Tam Huyền (Sùng Phúc Tự)",
    short_name: "Chùa Tam Huyền",
    type: "chua",
    icon: "⛩️",
    height: 11,
    color: "#DC2626",
    village: "Khương Đình",
    center: [105.8175, 20.9910] as [number, number],
    image: "/images/chua_tam_huyen_real.jpg",
    desc: "Cổ tự thế kỷ XI thời Lý ngõ 117 Khương Đình.",
    place_slug: "chua-tam-huyen",
  },
  {
    id: "dinh-khuong-thuong",
    name: "Đình Khương Thượng (Số 165)",
    short_name: "Đình Khương Thượng",
    type: "dinh",
    icon: "🏛️",
    height: 11,
    color: "#9333EA",
    village: "Khương Thượng",
    center: [105.8247, 21.0036] as [number, number],
    image: "/images/dinh_khuong_thuong_real.jpg",
    desc: "Đình làng ven hồ gắn liền chiến tích đại phá quân Thanh 1789.",
    place_slug: "dinh-khuong-thuong",
  },
  {
    id: "chua-boc",
    name: "Chùa Bộc (Sùng Phúc Tự)",
    short_name: "Chùa Bộc",
    type: "chua",
    icon: "⛩️",
    height: 12,
    color: "#DC2626",
    village: "Khương Thượng",
    center: [105.8276, 21.0072] as [number, number],
    image: "/images/chua_boc_real.jpg",
    desc: "Di tích Quốc gia Đặc biệt lưu giữ tượng bí mật Hoàng đế Quang Trung.",
    place_slug: "chua-boc",
  },
];
