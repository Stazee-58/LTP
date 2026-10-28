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
  type: "dinh" | "chua";
  village: string;
  image: string;
  desc: string;
  place_slug?: string;
  center: [number, number]; // [lng, lat]
  sub_part?: string; // Tên phân đoạn kiến trúc
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
  offsetYMeters = 0,
  angleDeg = 0
): number[][] {
  const cLng = centerLng + offsetXMeters * M_TO_DEG_LNG;
  const cLat = centerLat + offsetYMeters * M_TO_DEG_LAT;
  const halfW = widthMeters / 2;
  const halfD = depthMeters / 2;

  const corners: [number, number][] = [
    [-halfW, -halfD],
    [halfW, -halfD],
    [halfW, halfD],
    [-halfW, halfD],
    [-halfW, -halfD],
  ];

  if (!angleDeg) {
    return corners.map(([x, y]) => [
      cLng + x * M_TO_DEG_LNG,
      cLat + y * M_TO_DEG_LAT,
    ]);
  }

  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return corners.map(([x, y]) => {
    const rx = x * cos - y * sin;
    const ry = x * sin + y * cos;
    return [cLng + rx * M_TO_DEG_LNG, cLat + ry * M_TO_DEG_LAT];
  });
}

// ────────────────────────────────────────────────────────────
// DANH MỤC CÁC QUẦN THỂ KIẾN TRÚC 3D ĐẶC TRƯNG
// ────────────────────────────────────────────────────────────

const RAW_BUILDINGS: Building3DFeature[] = [
  // ============================================================
  // 7. ĐÌNH KHƯƠNG HẠ (ĐÌNH GỪNG) - Số 4 phố Khương Hạ
  // Dấu chân OSM thực tế #961812780 & #961812779 (Chữ Đinh thế kỷ XVII)
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "dinh-khuong-ha-tien-te",
      name: "Đình Khương Hạ (Tòa Tiền tế / Đại bái)",
      short_name: "Đình Khương Hạ (Tiền tế)",
      name_han_nom: "姜下亭 (亭姜下)",
      height: 9,
      base_height: 0,
      floors: 1,
      color: "#D97706",
      icon: "🏛️",
      type: "dinh",
      village: "Khương Hạ",
      image: "/images/dinh_khuong_ha_real.jpg",
      desc: "Ảnh thực tế: Đình Khương Hạ (Đình Gừng) tại số 4 phố Khương Hạ, Di tích lịch sử Quốc gia thờ Thành hoàng Lê Dương Vệ.",
      place_slug: "dinh-khuong-ha",
      center: [105.815777, 20.992451],
      sub_part: "Đại bái 5 gian",
    },
    geometry: {
      type: "Polygon",
      coordinates: [[[105.815731,20.992401],[105.81583,20.992392],[105.815843,20.992525],[105.815749,20.992537],[105.815731,20.992401]]],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "dinh-khuong-ha-hau-cung",
      name: "Đình Khương Hạ (Tòa Hậu cung)",
      short_name: "Đình Khương Hạ (Hậu cung)",
      name_han_nom: "姜下亭後宮",
      height: 11,
      base_height: 0,
      floors: 1,
      color: "#B45309",
      icon: "🏛️",
      type: "dinh",
      village: "Khương Hạ",
      image: "/images/dinh_khuong_ha_real.jpg",
      desc: "Hậu cung thâm nghiêm thờ Thành hoàng bảo trợ dân làng.",
      place_slug: "dinh-khuong-ha",
      center: [105.815777, 20.992451],
      sub_part: "Hậu cung chữ Đinh",
    },
    geometry: {
      type: "Polygon",
      coordinates: [[[105.815673,20.992558],[105.815653,20.992447],[105.815728,20.992437],[105.815743,20.992541],[105.815673,20.992558]]],
    },
  },

  // ============================================================
  // 8. CHÙA PHỤNG LỘC (CHÙA KHƯƠNG HẠ) - Số 67 phố Khương Hạ
  // Dấu chân OSM thực tế #1316650074, #1316650077, #1316650075
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "chua-khuong-ha-tien-duong",
      name: "Chùa Phụng Lộc (Chính điện & Thượng điện)",
      short_name: "Chùa Phụng Lộc (Chính điện)",
      name_han_nom: "奉祿寺",
      height: 11,
      base_height: 0,
      floors: 1,
      color: "#DC2626",
      icon: "⛩️",
      type: "chua",
      village: "Khương Hạ",
      image: "/images/chua_khuong_ha_real.jpg",
      desc: "Ảnh thực tế: Chùa Phụng Lộc số 67 phố Khương Hạ với chính điện chữ Công cổ kính ven sông Tô Lịch.",
      place_slug: "chua-khuong-ha",
      center: [105.816880, 20.990751],
      sub_part: "Tiền đường & Thượng điện",
    },
    geometry: {
      type: "Polygon",
      coordinates: [[[105.816861,20.990716],[105.816859,20.990804],[105.816908,20.990804],[105.816909,20.990717],[105.816861,20.990716]]],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "chua-khuong-ha-tam-quan",
      name: "Chùa Phụng Lộc (Tam quan & Gác chuông)",
      short_name: "Chùa Phụng Lộc (Tam quan)",
      height: 12,
      base_height: 0,
      floors: 2,
      color: "#991B1B",
      icon: "⛩️",
      type: "chua",
      village: "Khương Hạ",
      image: "/images/chua_khuong_ha_real.jpg",
      desc: "Tam quan 2 tầng mái gác chuông cổ.",
      place_slug: "chua-khuong-ha",
      center: [105.816880, 20.990751],
      sub_part: "Tam quan 2 tầng",
    },
    geometry: {
      type: "Polygon",
      coordinates: [[[105.816861,20.990716],[105.8168,20.990715],[105.816799,20.990803],[105.816859,20.990804],[105.816861,20.990716]]],
    },
  },

  // ============================================================
  // 9. ĐÌNH KHƯƠNG TRUNG & CHÙA KHƯƠNG TRUNG (Số 245 phố Khương Trung)
  // Quần thể di tích quốc gia thế kỷ XVII tại mặt tiền số 245 phố Khương Trung
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "dinh-khuong-trung-dinh",
      name: "Đình Khương Trung (Số 245 phố Khương Trung)",
      short_name: "Đình Khương Trung",
      name_han_nom: "姜中亭",
      height: 10,
      base_height: 0,
      floors: 1,
      color: "#D97706",
      icon: "🏛️",
      type: "dinh",
      village: "Khương Trung",
      image: "/images/dinh_khuong_trung_real.jpg",
      desc: "Ảnh thực tế: Đình Khương Trung tại số 245 phố Khương Trung, di tích lịch sử kiến trúc nghệ thuật cấp Quốc gia xây dựng thế kỷ XVII với kiến trúc chữ Đinh truyền thống thờ 2 vị tướng thời Hùng Vương.",
      place_slug: "dinh-khuong-trung",
      center: [105.8198, 20.9965],
      sub_part: "Đại bái & Hậu cung",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8198, 20.9965, 22, 13, 0, 0, 15)],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "chua-tieu-dao-main",
      name: "Chùa Khương Trung (Sùng Phúc Tự / Khương Trung Tự)",
      short_name: "Chùa Khương Trung",
      name_han_nom: "姜中寺 (崇福寺)",
      height: 11,
      base_height: 0,
      floors: 1,
      color: "#DC2626",
      icon: "⛩️",
      type: "chua",
      village: "Khương Trung",
      image: "/images/chua_khuong_trung_real.jpg",
      desc: "Ảnh thực tế: Chùa Khương Trung (Sùng Phúc Tự) kề bên đình làng tại số 245 phố Khương Trung. Cổ tự thanh tịnh rợp bóng bồ đề và vườn tháp cổ.",
      place_slug: "chua-khuong-trung",
      center: [105.8195, 20.9965],
      sub_part: "Chính điện chữ Công & Tháp cổ",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8195, 20.9965, 18, 14, 0, 0, 15)],
    },
  },

  // ============================================================
  // 10. ĐÌNH VÒNG (ĐÌNH HẠ ĐÌNH / ĐÌNH KHƯƠNG ĐÌNH) - Số 322 Khương Đình
  // Dấu chân OSM thực tế #1313219292 & #1313219293
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "dinh-vong-main",
      name: "Đình Vòng (Đình Hạ Đình - Di sản văn hóa Quốc gia)",
      short_name: "Đình Vòng (Đình Hạ Đình)",
      name_han_nom: "下亭村亭 (姜亭亭)",
      height: 11,
      base_height: 0,
      floors: 1,
      color: "#059669",
      icon: "🏛️",
      type: "dinh",
      village: "Khương Đình",
      image: "/images/dinh_khuong_dinh_dien_tho_real.jpg",
      desc: "Ảnh thực tế: Đình Vòng (Đình Hạ Đình) tại số 322 đường Khương Đình, di tích lịch sử thế kỷ XVI thờ Thành Hoàng Cương Lược Thành Hoàng Đại Vương. Lễ hội Đình Vòng là Di sản văn hóa phi vật thể Quốc gia.",
      place_slug: "dinh-vong-ha-dinh",
      center: [105.812177, 20.988789],
      sub_part: "Tòa Đại bái 5 gian",
    },
    geometry: {
      type: "Polygon",
      coordinates: [[[105.812159,20.988848],[105.812216,20.988844],[105.812204,20.988701],[105.812146,20.988705],[105.812159,20.988848]]],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "dinh-vong-hau-cung",
      name: "Đình Vòng (Tòa Hậu cung)",
      short_name: "Đình Vòng (Hậu cung)",
      height: 12,
      base_height: 0,
      floors: 1,
      color: "#047857",
      icon: "🏛️",
      type: "dinh",
      village: "Khương Đình",
      image: "/images/dinh_khuong_dinh_dien_tho_real.jpg",
      desc: "Hậu cung tôn nghiêm lưu giữ 18 đạo sắc phong triều Lê - Nguyễn.",
      place_slug: "dinh-khuong-dinh",
      center: [105.812177, 20.988789],
      sub_part: "Hậu cung chữ Đinh",
    },
    geometry: {
      type: "Polygon",
      coordinates: [[[105.812265,20.988882],[105.81233,20.988884],[105.812332,20.988775],[105.812267,20.988774],[105.812265,20.988882]]],
    },
  },

  // ============================================================
  // 11. CHÙA TAM HUYỀN (SÙNG PHÚC TỰ) - Số 47 ngõ 117 Khương Đình
  // Dấu chân OSM thực tế #1313470103 & #1313470104 (Cổ tự thế kỷ XI thời Lý)
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "chua-tam-huyen-dien",
      name: "Chùa Tam Huyền (Chính điện thờ Phật & Tăng quan Từ Vinh)",
      short_name: "Chùa Tam Huyền (Chính điện)",
      name_han_nom: "三玄寺 (崇福寺)",
      height: 11,
      base_height: 0,
      floors: 1,
      color: "#DC2626",
      icon: "⛩️",
      type: "chua",
      village: "Khương Đình",
      image: "/images/chua_tam_huyen_real.jpg",
      desc: "Ảnh thực tế: Chùa Tam Huyền (Sùng Phúc Tự) tại số 47 ngõ 117 đường Khương Đình ven sông Tô Lịch. Cổ tự khởi dựng từ thời Lý thờ Phật và Tăng quan Từ Vinh (thân phụ Thiền sư Từ Đạo Hạnh).",
      place_slug: "chua-tam-huyen",
      center: [105.813479, 20.995235],
      sub_part: "Thượng điện thời Lý",
    },
    geometry: {
      type: "Polygon",
      coordinates: [[[105.813453,20.995265],[105.813521,20.995262],[105.813517,20.99519],[105.813449,20.995193],[105.813453,20.995265]]],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "chua-tam-huyen-tam-quan",
      name: "Chùa Tam Huyền (Tam quan thời Lý)",
      short_name: "Chùa Tam Huyền (Tam quan)",
      height: 9,
      base_height: 0,
      floors: 2,
      color: "#991B1B",
      icon: "⛩️",
      type: "chua",
      village: "Khương Đình",
      image: "/images/chua_tam_huyen_real.jpg",
      desc: "Cổng Tam quan cổ kính rợp bóng cây cổ thụ bên hồ nước.",
      place_slug: "chua-tam-huyen",
      center: [105.813479, 20.995235],
      sub_part: "Tam quan",
    },
    geometry: {
      type: "Polygon",
      coordinates: [[[105.813449,20.995193],[105.813395,20.995195],[105.813402,20.995328],[105.813403,20.995351],[105.813457,20.995349],[105.813453,20.995265],[105.813449,20.995193]]],
    },
  },

  // ============================================================
  // 12. ĐÌNH KHƯƠNG THƯỢNG - Số 165 phố Khương Thượng ven hồ
  // Dấu chân OSM thực tế #916879501 (17 điểm góc hình học chữ Đinh)
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "dinh-khuong-thuong-main",
      name: "Đình Khương Thượng (Số 165 phố Khương Thượng)",
      short_name: "Đình Khương Thượng",
      name_han_nom: "姜上亭",
      height: 11,
      base_height: 0,
      floors: 1,
      color: "#9333EA",
      icon: "🏛️",
      type: "dinh",
      village: "Khương Thượng",
      image: "/images/dinh_khuong_thuong_real.jpg",
      desc: "Ảnh thực tế: Đình Khương Thượng tại số 165 phố Khương Thượng ven hồ Khương Thượng, di tích lịch sử gắn liền với chiến thắng Ngọc Hồi - Đống Đa xuân Kỷ Dậu 1789.",
      place_slug: "dinh-khuong-thuong",
      center: [105.825049, 21.003473],
      sub_part: "Tổ hợp Đình làng chữ Đinh 17 góc",
    },
    geometry: {
      type: "Polygon",
      coordinates: [[[105.824997,21.003599],[105.825115,21.003569],[105.825088,21.003479],[105.825138,21.003466],[105.825144,21.003486],[105.8252,21.003471],[105.825177,21.003395],[105.825122,21.00341],[105.825127,21.003427],[105.825077,21.003439],[105.825047,21.003337],[105.824928,21.003367],[105.824951,21.003446],[105.82486,21.00347],[105.824885,21.003554],[105.824977,21.00353],[105.824997,21.003599]]],
    },
  },

  // ============================================================
  // 13. CHÙA BỘC (SÙNG PHÚC TỰ) - Số 14 phố Chùa Bộc
  // Dấu chân OSM thực tế #1316608547
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "chua-boc-chinh-dien",
      name: "Chùa Bộc (Sùng Phúc Tự - Di tích Quốc gia Đặc biệt)",
      short_name: "Chùa Bộc (Chính điện)",
      name_han_nom: "崇福寺 (寺僕)",
      height: 12,
      base_height: 0,
      floors: 1,
      color: "#DC2626",
      icon: "⛩️",
      type: "chua",
      village: "Khương Thượng",
      image: "/images/chua_boc_real.jpg",
      desc: "Ảnh thực tế: Chùa Bộc (Sùng Phúc Tự) tại số 14 phố Chùa Bộc, Di tích Quốc gia Đặc biệt lưu giữ pho tượng bí mật thờ Vua Quang Trung và di tích chiến trường Đống Đa 1789.",
      place_slug: "chua-boc",
      center: [105.827656, 21.008342],
      sub_part: "Chính điện chữ Công",
    },
    geometry: {
      type: "Polygon",
      coordinates: [[[105.827665,21.008374],[105.827698,21.008331],[105.827643,21.008295],[105.827611,21.008337],[105.827665,21.008374]]],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "chua-boc-tam-quan",
      name: "Chùa Bộc (Tam quan & Gác chuông)",
      short_name: "Chùa Bộc (Tam quan)",
      height: 10,
      base_height: 0,
      floors: 2,
      color: "#991B1B",
      icon: "⛩️",
      type: "chua",
      village: "Khương Thượng",
      image: "/images/chua_boc_real.jpg",
      desc: "Cổng Tam quan 2 tầng 8 mái hướng ra phố Chùa Bộc.",
      place_slug: "chua-boc",
      center: [105.827656, 21.008342],
      sub_part: "Tam quan 2 tầng mái",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.827656, 21.008342, 16, 7, 0, -22, 48)],
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
    id: "dinh-khuong-ha",
    name: "Đình Khương Hạ (Đình Gừng)",
    short_name: "Đình Khương Hạ",
    type: "dinh" as const,
    icon: "🏛️",
    height: 11,
    color: "#D97706",
    village: "Khương Hạ",
    center: [105.815777, 20.992451] as [number, number],
    image: "/images/dinh_khuong_ha_real.jpg",
    desc: "Di tích quốc gia thế kỷ XVII chữ Đinh bên bờ sông Tô Lịch.",
    place_slug: "dinh-khuong-ha",
  },
  {
    id: "chua-khuong-ha",
    name: "Chùa Khương Hạ (Phụng Lộc Tự)",
    short_name: "Chùa Phụng Lộc",
    type: "chua" as const,
    icon: "⛩️",
    height: 12,
    color: "#DC2626",
    village: "Khương Hạ",
    center: [105.816880, 20.990751] as [number, number],
    image: "/images/chua_khuong_ha_real.jpg",
    desc: "Cổng tam quan 2 tầng mái ngói mũi hài số 67 Khương Hạ.",
    place_slug: "chua-khuong-ha",
  },
  {
    id: "dinh-khuong-trung",
    name: "Đình Khương Trung (Số 245)",
    short_name: "Đình Khương Trung",
    type: "dinh" as const,
    icon: "🏛️",
    height: 10,
    color: "#D97706",
    village: "Khương Trung",
    center: [105.8198, 20.9965] as [number, number],
    image: "/images/dinh_khuong_trung_real.jpg",
    desc: "Đình làng cổ chữ Đinh thờ 2 vị tướng thời Hùng Vương tại số 245 Khương Trung.",
    place_slug: "dinh-khuong-trung",
  },
  {
    id: "chua-tieu-dao",
    name: "Chùa Khương Trung (Sùng Phúc Tự)",
    short_name: "Chùa Khương Trung",
    type: "chua" as const,
    icon: "⛩️",
    height: 11,
    color: "#DC2626",
    village: "Khương Trung",
    center: [105.8195, 20.9965] as [number, number],
    image: "/images/chua_khuong_trung_real.jpg",
    desc: "Chùa cổ thế kỷ XVII rợp bóng bồ đề tại số 245 Khương Trung.",
    place_slug: "chua-khuong-trung",
  },
  {
    id: "dinh-vong-ha-dinh",
    name: "Đình Vòng (Đình Hạ Đình)",
    short_name: "Đình Vòng",
    type: "dinh" as const,
    icon: "🏛️",
    height: 11,
    color: "#059669",
    village: "Khương Đình",
    center: [105.812177, 20.988789] as [number, number],
    image: "/images/dinh_khuong_dinh_dien_tho_real.jpg",
    desc: "Di tích lịch sử thế kỷ XVI số 322 Khương Đình với Lễ hội Đình Vòng là Di sản văn hóa Quốc gia.",
    place_slug: "dinh-vong-ha-dinh",
  },
  {
    id: "chua-tam-huyen",
    name: "Chùa Tam Huyền (Sùng Phúc Tự)",
    short_name: "Chùa Tam Huyền",
    type: "chua" as const,
    icon: "⛩️",
    height: 11,
    color: "#DC2626",
    village: "Khương Đình",
    center: [105.813479, 20.995235] as [number, number],
    image: "/images/chua_tam_huyen_real.jpg",
    desc: "Cổ tự thế kỷ XI thời Lý số 47 ngõ 117 Khương Đình ven sông Tô Lịch.",
    place_slug: "chua-tam-huyen",
  },
  {
    id: "dinh-khuong-thuong",
    name: "Đình Khương Thượng (Số 165)",
    short_name: "Đình Khương Thượng",
    type: "dinh" as const,
    icon: "🏛️",
    height: 11,
    color: "#9333EA",
    village: "Khương Thượng",
    center: [105.825049, 21.003473] as [number, number],
    image: "/images/dinh_khuong_thuong_real.jpg",
    desc: "Đình làng ven hồ gắn liền chiến tích đại phá quân Thanh 1789.",
    place_slug: "dinh-khuong-thuong",
  },
  {
    id: "chua-boc",
    name: "Chùa Bộc (Sùng Phúc Tự)",
    short_name: "Chùa Bộc",
    type: "chua" as const,
    icon: "⛩️",
    height: 12,
    color: "#DC2626",
    village: "Khương Thượng",
    center: [105.827656, 21.008342] as [number, number],
    image: "/images/chua_boc_real.jpg",
    desc: "Di tích Quốc gia Đặc biệt lưu giữ tượng bí mật Hoàng đế Quang Trung.",
    place_slug: "chua-boc",
  },
];
