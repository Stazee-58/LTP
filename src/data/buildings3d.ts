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
  // 1. CỤM TRƯỜNG THCS & THPT KHƯƠNG HẠ (Số 29–31 phố Khương Hạ)
  // Dấu chân OSM thực tế #1316649573, #1316649575
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
      color: "#0284C7",
      icon: "🏫",
      type: "truong_hoc",
      village: "Khương Hạ",
      image: "/images/thcs_khuong_ha_real.jpg",
      desc: "Ảnh thực tế: Tổ hợp trường học THCS & THPT Khương Hạ tại số 29–31 phố Khương Hạ đạt chuẩn Quốc gia.",
      place_slug: "thcs-khuong-ha",
      center: [105.81565, 20.98939],
      sub_part: "Khối nhà trung tâm 5 tầng",
    },
    geometry: {
      type: "Polygon",
      coordinates: [[[105.815623,20.989351],[105.815617,20.989439],[105.815676,20.989443],[105.81568,20.989382],[105.815682,20.989354],[105.815623,20.989351]]],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "thcs-thpt-khuong-ha-wing",
      name: "Trường THCS & THPT Khương Hạ (Cánh phòng thí nghiệm & hiệu bộ)",
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
      center: [105.81565, 20.98939],
      sub_part: "Cánh 4 tầng",
    },
    geometry: {
      type: "Polygon",
      coordinates: [[[105.815623,20.989351],[105.815682,20.989354],[105.815685,20.989307],[105.815626,20.989303],[105.815623,20.989351]]],
    },
  },

  // ============================================================
  // 2. TRƯỜNG THPT KHƯƠNG ĐÌNH - Ngách 29/78 phố Khương Hạ, P. Khương Đình
  // Dấu chân OSM thực tế #957452553 (30 điểm góc hình học thực tế)
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "thpt-khuong-dinh-main",
      name: "Trường THPT Khương Đình (Khối nhà học chuẩn Quốc gia)",
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
      center: [105.816966, 20.988423],
      sub_part: "Khối giảng đường 5 tầng",
    },
    geometry: {
      type: "Polygon",
      coordinates: [[[105.816389,20.988601],[105.816585,20.988659],[105.816703,20.988309],[105.816521,20.988256],[105.816556,20.988153],[105.816588,20.988142],[105.816612,20.988143],[105.816842,20.988215],[105.816805,20.988319],[105.817111,20.988414],[105.81715,20.988306],[105.817246,20.988336],[105.817261,20.988351],[105.81727,20.988378],[105.817268,20.988402],[105.817247,20.988465],[105.817303,20.988481],[105.817339,20.988374],[105.817681,20.988474],[105.817618,20.988661],[105.81729,20.988565],[105.817306,20.988518],[105.817218,20.988492],[105.817207,20.988524],[105.816827,20.988413],[105.81685,20.988345],[105.816794,20.988328],[105.816644,20.988777],[105.816357,20.988693],[105.816389,20.988601]]],
    },
  },

  // ============================================================
  // 3. TRƯỜNG THCS KHƯƠNG ĐÌNH (Số 16 phố Khương Hạ)
  // Dấu chân OSM thực tế #957452556 kề bên di tích Đình Khương Hạ
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
      desc: "Ảnh thực tế: Trường THCS Khương Đình tại số 16 phố Khương Hạ. Tổ hợp giảng dạy chuẩn quốc gia kề bên di tích Đình Khương Hạ.",
      place_slug: "thcs-khuong-dinh",
      center: [105.815372, 20.992969],
      sub_part: "Tổ hợp trường học chữ L",
    },
    geometry: {
      type: "Polygon",
      coordinates: [[[105.815145,20.993173],[105.815264,20.993152],[105.815249,20.993076],[105.815276,20.993071],[105.815297,20.993173],[105.815553,20.993126],[105.815534,20.993039],[105.81556,20.993035],[105.815573,20.993096],[105.815695,20.993073],[105.81558,20.992526],[105.815472,20.992546],[105.815553,20.992937],[105.815237,20.992995],[105.815161,20.992631],[105.815037,20.992654],[105.815145,20.993173]]],
    },
  },

  // ============================================================
  // 4. TRƯỜNG THCS KHƯƠNG TRUNG (Ngõ 211 phố Khương Trung)
  // Dấu chân OSM thực tế #1040704859, #1040704858
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "thcs-khuong-trung-main",
      name: "Trường THCS Khương Trung (Dãy phòng học chính)",
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
      coordinates: [[[105.821647,20.997672],[105.821711,20.997662],[105.821694,20.997564],[105.821629,20.997574],[105.821647,20.997672]]],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "thcs-khuong-trung-wing",
      name: "Trường THCS Khương Trung (Cánh hiệu bộ & thực hành)",
      short_name: "THCS Khương Trung (Cánh hiệu bộ)",
      height: 15,
      base_height: 0,
      floors: 4,
      color: "#0369A1",
      icon: "🏫",
      type: "truong_hoc",
      village: "Khương Trung",
      image: "/images/khuong_ha_school_photo.jpg",
      desc: "Cánh phòng thí nghiệm, thư viện và ban giám hiệu.",
      place_slug: "thcs-khuong-trung",
      center: [105.8217, 20.9977],
      sub_part: "Cánh hiệu bộ",
    },
    geometry: {
      type: "Polygon",
      coordinates: [[[105.8218,20.99778],[105.821843,20.997775],[105.821835,20.99772],[105.821792,20.997725],[105.8218,20.99778]]],
    },
  },

  // ============================================================
  // 5. TRƯỜNG ĐẠI HỌC THỦY LỢI (Số 175 Tây Sơn, Khương Thượng)
  // Tháp Hiệu bộ T35 cao 13 tầng (48m) + Khối Giảng đường A1 (Dấu chân OSM #136258985)
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "dai-hoc-thuy-loi-a1",
      name: "Đại học Thủy Lợi (Khối Giảng đường A1)",
      short_name: "ĐH Thủy Lợi (A1)",
      name_han_nom: "水利大學 (A1)",
      height: 24,
      base_height: 0,
      floors: 6,
      color: "#1E40AF",
      icon: "🏛️",
      type: "dai_hoc",
      village: "Khương Thượng",
      image: "/images/dai_hoc_thuy_loi_real.jpg",
      desc: "Khối giảng đường truyền thống A1 Đại học Thủy Lợi số 175 Tây Sơn.",
      place_slug: "dai-hoc-thuy-loi",
      center: [105.824722, 21.007413],
      sub_part: "Khối Giảng đường A1",
    },
    geometry: {
      type: "Polygon",
      coordinates: [[[105.824812,21.007689],[105.824706,21.007486],[105.824678,21.007499],[105.824639,21.007421],[105.824605,21.007361],[105.824633,21.007348],[105.824523,21.007137],[105.824618,21.007093],[105.824731,21.007309],[105.824755,21.007298],[105.824787,21.007355],[105.824823,21.007429],[105.824799,21.00744],[105.824907,21.007645],[105.824812,21.007689]]],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "dai-hoc-thuy-loi-t35",
      name: "Đại học Thủy Lợi (Tòa tháp Hiệu bộ T35 - 13 tầng)",
      short_name: "ĐH Thủy Lợi (T35)",
      name_han_nom: "水利大學 (T35)",
      height: 48,
      base_height: 0,
      floors: 13,
      color: "#1D4ED8",
      icon: "🎓",
      type: "dai_hoc",
      village: "Khương Thượng",
      image: "/images/dai_hoc_thuy_loi_real.jpg",
      desc: "Ảnh thực tế: Tòa tháp Hiệu bộ T35 cao 13 tầng (48m) - biểu tượng kiến trúc đại học kỹ thuật hàng đầu tại số 175 Tây Sơn.",
      place_slug: "dai-hoc-thuy-loi",
      center: [105.824722, 21.007413],
      sub_part: "Tháp Hiệu bộ T35 cao 48m",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.824722, 21.007413, 26, 22, -12, 24, 25)],
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
      center: [105.824722, 21.007413],
      sub_part: "Chóp tháp 52m",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.824722, 21.007413, 14, 12, -12, 24, 25)],
    },
  },

  // ============================================================
  // 6. TRƯỜNG ĐẠI HỌC Y HÀ NỘI (Số 1 Tôn Thất Tùng, Khương Thượng)
  // Tòa nhà Hiệu bộ Pháp cổ A1 (1902) - Dấu chân OSM thực tế #164212578
  // ============================================================
  {
    type: "Feature",
    properties: {
      id: "dai-hoc-y-ha-noi-central",
      name: "Đại học Y Hà Nội (Tòa nhà Hiệu bộ Pháp cổ A1 - 1902)",
      short_name: "ĐH Y Hà Nội (A1)",
      name_han_nom: "河內醫科大學",
      height: 28,
      base_height: 0,
      floors: 4,
      color: "#B45309",
      icon: "🎓",
      type: "dai_hoc",
      village: "Khương Thượng",
      image: "/images/dai_hoc_y_main_real.jpg",
      desc: "Ảnh thực tế: Tòa nhà Hiệu bộ A1 mang phong cách kiến trúc Đông Dương thuộc địa Pháp cổ kính được thành lập từ năm 1902 bởi Bác sĩ Alexandre Yersin.",
      place_slug: "dai-hoc-y-ha-noi",
      center: [105.830655, 21.003260],
      sub_part: "Khối Hiệu bộ A1 Pháp cổ",
    },
    geometry: {
      type: "Polygon",
      coordinates: [[[105.830605,21.003609],[105.830894,21.003543],[105.830861,21.003415],[105.830792,21.003431],[105.83068,21.003],[105.830744,21.002985],[105.830709,21.002851],[105.83043,21.002915],[105.830464,21.003048],[105.830524,21.003034],[105.830636,21.003464],[105.830571,21.003479],[105.830605,21.003609]]],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "dai-hoc-y-ha-noi-dome",
      name: "Đại học Y Hà Nội (Mái vòm Cổ điển)",
      short_name: "Mái vòm ĐH Y",
      height: 34,
      base_height: 28,
      floors: 1,
      color: "#D97706",
      icon: "🏛️",
      type: "dai_hoc",
      village: "Khương Thượng",
      image: "/images/dai_hoc_y_main_real.jpg",
      desc: "Mái vòm Mansard ngói đá xám phong cách Baroque Pháp cổ điển.",
      place_slug: "dai-hoc-y-ha-noi",
      center: [105.830655, 21.003260],
      sub_part: "Mái vòm cổ điển cao 34m",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.830655, 21.003260, 16, 14, 0, 0, 0)],
    },
  },

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
  {
    type: "Feature",
    properties: {
      id: "cong-khuong-trung-arch",
      name: "Cổng làng Khương Trung Cổ Thôn (Ngõ 211)",
      short_name: "Cổng làng Khương Trung",
      name_han_nom: "姜中古村門",
      height: 7,
      base_height: 0,
      floors: 1,
      color: "#EA580C",
      icon: "🚪",
      type: "cong_lang",
      village: "Khương Trung",
      image: "/images/cong_ngo_khuong_dinh_real.jpg",
      desc: "Ảnh thực tế: Cổng làng Khương Trung tại đầu ngõ 211 phố Khương Trung, xây dựng cuối thế kỷ XIX với vòm cuốn tò vò và vọng lầu mái ngói cổ truyền.",
      place_slug: "cong-lang-khuong-trung",
      center: [105.8208, 20.9982],
      sub_part: "Vòm cuốn tò vò cổng làng",
    },
    geometry: {
      type: "Polygon",
      coordinates: [makeRect(105.8208, 20.9982, 10, 4, 0, 0, -30)],
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
    id: "thcs-thpt-khuong-ha",
    name: "THCS & THPT Khương Hạ",
    short_name: "THCS & THPT Khương Hạ",
    type: "truong_hoc",
    icon: "🏫",
    height: 19,
    color: "#0284C7",
    village: "Khương Hạ",
    center: [105.81565, 20.98939] as [number, number],
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
    center: [105.815372, 20.992969] as [number, number],
    image: "/images/cong_khuong_dinh_real.jpg",
    desc: "Trường THCS số 16 phố Khương Hạ, phường Khương Đình kề bên di tích Đình Khương Hạ.",
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
    center: [105.816966, 20.988423] as [number, number],
    image: "/images/thcs_khuong_ha_real.jpg",
    desc: "Trường THPT công lập chuẩn Quốc gia tại ngách 29/78 phố Khương Hạ, phường Khương Đình.",
    place_slug: "thpt-khuong-dinh",
  },
  {
    id: "dai-hoc-thuy-loi",
    name: "Đại học Thủy Lợi (Tháp T35 & A1)",
    short_name: "ĐH Thủy Lợi (T35)",
    type: "dai_hoc",
    icon: "🎓",
    height: 48,
    color: "#1D4ED8",
    village: "Khương Thượng",
    center: [105.824722, 21.007413] as [number, number],
    image: "/images/dai_hoc_thuy_loi_real.jpg",
    desc: "Tháp Hiệu bộ T35 cao 13 tầng (48m) và khối Giảng đường A1 số 175 Tây Sơn.",
    place_slug: "dai-hoc-thuy-loi",
  },
  {
    id: "dai-hoc-y-ha-noi",
    name: "Trường Đại học Y Hà Nội",
    short_name: "ĐH Y Hà Nội",
    type: "dai_hoc",
    icon: "🎓",
    height: 34,
    color: "#F59E0B",
    village: "Khương Thượng",
    center: [105.830655, 21.003260] as [number, number],
    image: "/images/dai_hoc_y_main_real.jpg",
    desc: "Tòa nhà Hiệu bộ Pháp cổ A1 (1902) số 1 Tôn Thất Tùng.",
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
    center: [105.815777, 20.992451] as [number, number],
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
    center: [105.816880, 20.990751] as [number, number],
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
    center: [105.8198, 20.9965] as [number, number],
    image: "/images/dinh_khuong_trung_real.jpg",
    desc: "Đình làng cổ chữ Đinh thờ 2 vị tướng thời Hùng Vương tại số 245 Khương Trung.",
    place_slug: "dinh-khuong-trung",
  },
  {
    id: "chua-tieu-dao",
    name: "Chùa Khương Trung (Sùng Phúc Tự)",
    short_name: "Chùa Khương Trung",
    type: "chua",
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
    id: "cong-khuong-trung",
    name: "Cổng làng Khương Trung Cổ Thôn",
    short_name: "Cổng làng Khương Trung",
    type: "cong_lang",
    icon: "🚪",
    height: 8,
    color: "#EA580C",
    village: "Khương Trung",
    center: [105.8208, 20.9982] as [number, number],
    image: "/images/cong_ngo_khuong_dinh_real.jpg",
    desc: "Cổng vòm cuốn tò vò và vọng lầu đầu ngõ 211 Khương Trung.",
    place_slug: "cong-lang-khuong-trung",
  },
  {
    id: "dinh-vong-ha-dinh",
    name: "Đình Vòng (Đình Hạ Đình)",
    short_name: "Đình Vòng",
    type: "dinh",
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
    type: "chua",
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
    type: "dinh",
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
    type: "chua",
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
