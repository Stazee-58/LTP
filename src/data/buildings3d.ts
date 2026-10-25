// Dữ liệu mô hình hình học 3D (3D Architectural Volumes & Building Footprints)
// Thiết kế chuẩn xác cho các di tích lịch sử, đình, chùa, cổng làng, trường học và viện đại học 4 làng
// Sử dụng 100% hình ảnh thực tế (Authentic Real Photographs) từ tư liệu di sản Hà Nội, Tạp chí Người Hà Nội và Wikimedia Commons

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
}

export const BUILDINGS_3D_GEOJSON = {
  type: "FeatureCollection" as const,
  features: [
    // ============================================================
    // 1. KHƯƠNG HẠ (Quận Thanh Xuân)
    // ============================================================
    {
      type: "Feature" as const,
      properties: {
        id: "dinh-khuong-ha-3d",
        name: "Đình Khương Hạ (Đình Gừng)",
        short_name: "Đình Khương Hạ",
        name_han_nom: "亭姜下",
        height: 12,
        base_height: 0,
        floors: 2,
        color: "#F59E0B", // Vàng kim mái đình Bắc Bộ
        icon: "🏛️",
        type: "dinh" as const,
        village: "Khương Hạ",
        image: "/images/dinh_khuong_ha_real.jpg",
        desc: "Ảnh thực tế: Lễ hội truyền thống tại Đình Khương Hạ (Đình Gừng), di tích quốc gia xây dựng từ thế kỷ XVII bên bờ sông Tô Lịch.",
        place_slug: "dinh-khuong-ha",
        center: [105.8162, 20.9926] as [number, number],
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8159, 20.9923],
            [105.8165, 20.9923],
            [105.8165, 20.9929],
            [105.8159, 20.9929],
            [105.8159, 20.9923],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "chua-khuong-ha-3d",
        name: "Chùa Khương Hạ (Phụng Lộc Tự)",
        short_name: "Chùa Phụng Lộc",
        name_han_nom: "奉祿寺",
        height: 14,
        base_height: 0,
        floors: 3,
        color: "#EF4444", // Đỏ chu sa chùa cổ
        icon: "⛩️",
        type: "chua" as const,
        village: "Khương Hạ",
        image: "/images/chua_khuong_ha_real.jpg",
        desc: "Ảnh thực tế: Cổng tam quan Chùa Phụng Lộc (Trúc Lâm phái) số 67 phố Khương Hạ, cổ tự thế kỷ XVII lưu giữ chuông đồng Cảnh Hưng.",
        place_slug: "chua-khuong-ha",
        center: [105.8169, 20.9908] as [number, number],
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8166, 20.9905],
            [105.8172, 20.9905],
            [105.8172, 20.9911],
            [105.8166, 20.9911],
            [105.8166, 20.9905],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "thcs-thpt-khuong-ha-3d",
        name: "Trường THCS & THPT Khương Hạ",
        short_name: "THCS & THPT Khương Hạ",
        name_han_nom: "姜下學校",
        height: 20,
        base_height: 0,
        floors: 5,
        color: "#0EA5E9", // Xanh trường học chuẩn quốc gia
        icon: "🏫",
        type: "truong_hoc" as const,
        village: "Khương Hạ",
        image: "/images/thcs_khuong_ha_real.jpg",
        desc: "Ảnh thực tế: Khuôn viên và cơ sở vật chất hiện đại Trường THCS & THPT Khương Hạ số 31 phố Khương Hạ.",
        place_slug: "thcs-khuong-ha",
        center: [105.8156, 20.9894] as [number, number],
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8152, 20.9890],
            [105.8160, 20.9890],
            [105.8160, 20.9898],
            [105.8152, 20.9898],
            [105.8152, 20.9890],
          ],
        ],
      },
    },

    // ============================================================
    // 2. KHƯƠNG TRUNG (Quận Thanh Xuân)
    // ============================================================
    {
      type: "Feature" as const,
      properties: {
        id: "dinh-khuong-trung-3d",
        name: "Đình Khương Trung (Số 245 Khương Trung)",
        short_name: "Đình Khương Trung",
        name_han_nom: "亭姜中",
        height: 12,
        base_height: 0,
        floors: 2,
        color: "#F59E0B",
        icon: "🏛️",
        type: "dinh" as const,
        village: "Khương Trung",
        image: "/images/dinh_khuong_trung_real.jpg",
        desc: "Ảnh thực tế: Cổng và sân đình làng Khương Trung số 245 phố Khương Trung, di tích lịch sử quốc gia thờ 2 vị tướng thời Hùng Vương.",
        place_slug: "dinh-khuong-trung",
        center: [105.8198, 20.9968] as [number, number],
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8194, 20.9965],
            [105.8202, 20.9965],
            [105.8202, 20.9971],
            [105.8194, 20.9971],
            [105.8194, 20.9965],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "chua-tieu-dao-3d",
        name: "Chùa Tiêu Dao (Chùa Khương Trung)",
        short_name: "Chùa Tiêu Dao",
        name_han_nom: "逍遙寺",
        height: 13,
        base_height: 0,
        floors: 2,
        color: "#EF4444",
        icon: "⛩️",
        type: "chua" as const,
        village: "Khương Trung",
        image: "/images/chua_khuong_trung_real.jpg",
        desc: "Ảnh thực tế: Cổng tam quan Chùa Khương Trung (Chùa Tiêu Dao) số 245 phố Khương Trung rợp bóng cây bồ đề cổ thụ.",
        place_slug: "chua-khuong-trung",
        center: [105.8194, 20.9964] as [number, number],
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8190, 20.9961],
            [105.8197, 20.9961],
            [105.8197, 20.9967],
            [105.8190, 20.9967],
            [105.8190, 20.9961],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "cong-khuong-trung-3d",
        name: "Cổng làng Khương Trung Cổ Thôn (Ngõ 211)",
        short_name: "Cổng làng Khương Trung",
        name_han_nom: "姜中古村門",
        height: 9,
        base_height: 0,
        floors: 2,
        color: "#F97316", // Cam gạch nung cổ
        icon: "🚪",
        type: "cong_lang" as const,
        village: "Khương Trung",
        image: "/images/cong_ngo_khuong_dinh_real.jpg",
        desc: "Ảnh thực tế: Cổng ngõ làng cổ vùng Tam Khương với vòm cuốn, mái ngói và câu đối cổ ước lệ không gian làng trong phố.",
        place_slug: "cong-lang-khuong-trung",
        center: [105.8208, 20.9982] as [number, number],
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8205, 20.9979],
            [105.8211, 20.9979],
            [105.8211, 20.9985],
            [105.8205, 20.9985],
            [105.8205, 20.9979],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "thcs-khuong-trung-3d",
        name: "Trường THCS Khương Trung",
        short_name: "THCS Khương Trung",
        name_han_nom: "姜中初級中學校",
        height: 18,
        base_height: 0,
        floors: 5,
        color: "#0EA5E9",
        icon: "🏫",
        type: "truong_hoc" as const,
        village: "Khương Trung",
        image: "/images/khuong_ha_school_photo.jpg",
        desc: "Ảnh thực tế: Khuôn viên trường đạt chuẩn quốc gia tại ngõ 211 Khương Trung, đào tạo học sinh địa phương.",
        place_slug: "thcs-khuong-trung",
        center: [105.8217, 20.9977] as [number, number],
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8213, 20.9973],
            [105.8221, 20.9973],
            [105.8221, 20.9981],
            [105.8213, 20.9981],
            [105.8213, 20.9973],
          ],
        ],
      },
    },

    // ============================================================
    // 3. KHƯƠNG ĐÌNH (Quận Thanh Xuân)
    // ============================================================
    {
      type: "Feature" as const,
      properties: {
        id: "dinh-khuong-dinh-3d",
        name: "Đình Khương Đình (Thờ Lê Dương Vệ)",
        short_name: "Đình Khương Đình",
        name_han_nom: "亭姜亭",
        height: 12,
        base_height: 0,
        floors: 2,
        color: "#F59E0B",
        icon: "🏛️",
        type: "dinh" as const,
        village: "Khương Đình",
        image: "/images/dinh_khuong_dinh_dien_tho_real.jpg",
        desc: "Ảnh thực tế: Gian thờ chính và nghệ thuật điêu khắc gỗ cổ tại Đình Khương Đình (Đình Vòng), di tích thờ tướng quân Lê Dương Vệ.",
        place_slug: "dinh-khuong-dinh",
        center: [105.8182, 20.9915] as [number, number],
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8178, 20.9912],
            [105.8186, 20.9912],
            [105.8186, 20.9918],
            [105.8178, 20.9918],
            [105.8178, 20.9912],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "chua-tam-huyen-3d",
        name: "Chùa Tam Huyền (Sùng Phúc Tự - Thời Lý)",
        short_name: "Chùa Tam Huyền",
        name_han_nom: "三玄寺",
        height: 14,
        base_height: 0,
        floors: 2,
        color: "#EF4444",
        icon: "⛩️",
        type: "chua" as const,
        village: "Khương Đình",
        image: "/images/chua_tam_huyen_real.jpg",
        desc: "Ảnh thực tế: Cổng tam quan Chùa Tam Huyền (Sùng Phúc Tự) ngõ 117 Khương Đình, cổ tự thời Lý gắn với thân phụ Thiền sư Từ Đạo Hạnh.",
        place_slug: "chua-tam-huyen",
        center: [105.8175, 20.9910] as [number, number],
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8171, 20.9907],
            [105.8179, 20.9907],
            [105.8179, 20.9913],
            [105.8171, 20.9913],
            [105.8171, 20.9907],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "thcs-khuong-dinh-3d",
        name: "Trường THCS & Tiểu học Khương Đình",
        short_name: "Trường THCS Khương Đình",
        name_han_nom: "姜亭學校",
        height: 19,
        base_height: 0,
        floors: 5,
        color: "#0EA5E9",
        icon: "🏫",
        type: "truong_hoc" as const,
        village: "Khương Đình",
        image: "/images/cong_khuong_dinh_real.jpg",
        desc: "Ảnh thực tế: Tuyến phố và cụm trường học THCS Khương Đình số 16 phố Bùi Xương Trạch.",
        place_slug: "thcs-khuong-dinh",
        center: [105.8204, 20.9902] as [number, number],
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8200, 20.9898],
            [105.8208, 20.9898],
            [105.8208, 20.9906],
            [105.8200, 20.9906],
            [105.8200, 20.9898],
          ],
        ],
      },
    },

    // ============================================================
    // 4. KHƯƠNG THƯỢNG (Quận Đống Đa - Sáp nhập Kim Liên mới)
    // ============================================================
    {
      type: "Feature" as const,
      properties: {
        id: "dinh-khuong-thuong-3d",
        name: "Đình Khương Thượng (Số 165 Khương Thượng)",
        short_name: "Đình Khương Thượng",
        name_han_nom: "亭姜上",
        height: 13,
        base_height: 0,
        floors: 2,
        color: "#F59E0B",
        icon: "🏛️",
        type: "dinh" as const,
        village: "Khương Thượng",
        image: "/images/dinh_khuong_thuong_real.jpg",
        desc: "Ảnh thực tế (Wikimedia): Đình Khương Thượng số 165 Khương Thượng bên bờ hồ nước, ghi dấu chiến công đại phá quân Thanh 1789.",
        place_slug: "dinh-khuong-thuong",
        center: [105.8247, 21.0036] as [number, number],
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8243, 21.0033],
            [105.8251, 21.0033],
            [105.8251, 21.0039],
            [105.8243, 21.0039],
            [105.8243, 21.0033],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "chua-boc-3d",
        name: "Chùa Bộc (Sùng Phúc Tự - Di tích 1789)",
        short_name: "Chùa Bộc",
        name_han_nom: "崇福寺",
        height: 15,
        base_height: 0,
        floors: 3,
        color: "#EF4444",
        icon: "⛩️",
        type: "chua" as const,
        village: "Khương Thượng",
        image: "/images/chua_boc_real.jpg",
        desc: "Ảnh thực tế (Wikimedia): Cổng tam quan Chùa Bộc số 14 phố Chùa Bộc, Di tích Quốc gia Đặc biệt nơi lưu giữ tượng ngầm Vua Quang Trung.",
        place_slug: "chua-boc",
        center: [105.8276, 21.0072] as [number, number],
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8272, 21.0068],
            [105.8280, 21.0068],
            [105.8280, 21.0076],
            [105.8272, 21.0076],
            [105.8272, 21.0068],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "dai-hoc-y-ha-noi-3d",
        name: "Trường Đại học Y Hà Nội (Khu Giảng đường)",
        short_name: "ĐH Y Hà Nội",
        name_han_nom: "河內醫科大學",
        height: 42,
        base_height: 0,
        floors: 11,
        color: "#3B82F6", // Xanh lam Viện Đại học
        icon: "🎓",
        type: "dai_hoc" as const,
        village: "Khương Thượng",
        image: "/images/dai_hoc_y_main_real.jpg",
        desc: "Ảnh thực tế (Wikimedia): Tòa nhà trung tâm và viện trường Đại học Y Hà Nội số 1 Tôn Thất Tùng thành lập năm 1902.",
        place_slug: "dai-hoc-y-ha-noi",
        center: [105.8314, 21.0029] as [number, number],
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8309, 21.0024],
            [105.8319, 21.0024],
            [105.8319, 21.0034],
            [105.8309, 21.0034],
            [105.8309, 21.0024],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "dai-hoc-thuy-loi-3d",
        name: "Trường Đại học Thủy Lợi (Tòa nhà Hiệu bộ T35)",
        short_name: "ĐH Thủy Lợi (T35)",
        name_han_nom: "水利大學",
        height: 48,
        base_height: 0,
        floors: 13,
        color: "#0284C7",
        icon: "🎓",
        type: "dai_hoc" as const,
        village: "Khương Thượng",
        image: "/images/dai_hoc_thuy_loi_real.jpg",
        desc: "Ảnh thực tế (Wikimedia): Tòa tháp Hiệu bộ T35 cao 13 tầng và cổng chính Đại học Thủy Lợi tại số 175 Tây Sơn.",
        place_slug: "dai-hoc-thuy-loi",
        center: [105.8244, 21.0085] as [number, number],
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8239, 21.0081],
            [105.8249, 21.0081],
            [105.8249, 21.0089],
            [105.8239, 21.0089],
            [105.8239, 21.0081],
          ],
        ],
      },
    },
  ],
};

// Tập hợp điểm nhãn 3D WebGL
export const BUILDINGS_3D_POINTS = {
  type: "FeatureCollection" as const,
  features: BUILDINGS_3D_GEOJSON.features.map((f) => ({
    type: "Feature" as const,
    properties: {
      id: f.properties.id,
      name: f.properties.short_name,
      full_name: f.properties.name,
      icon: f.properties.icon,
      height: f.properties.height,
      color: f.properties.color,
      type: f.properties.type,
      village: f.properties.village,
      image: f.properties.image,
      desc: f.properties.desc,
      place_slug: f.properties.place_slug,
    },
    geometry: {
      type: "Point" as const,
      coordinates: f.properties.center,
    },
  })),
};
