// Dữ liệu mô hình hình học 3D (3D Architectural Volumes & Building Footprints)
// Dùng cho chế độ hiển thị 3D MapLibre fill-extrusion với ánh sáng động, chiều cao thực tế và ảnh chụp chân thực

export interface Building3DProperty {
  id: string;
  name: string;
  name_han_nom?: string;
  height: number;
  base_height: number;
  floors?: number;
  color: string;
  type: "heritage" | "school" | "university" | "gate" | "commercial" | "residential";
  village: string;
  image: string;
  desc: string;
  place_slug?: string;
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
        name_han_nom: "亭姜下",
        height: 12,
        base_height: 0,
        floors: 2,
        color: "#C9A84C",
        type: "heritage",
        village: "Khương Hạ",
        image: "/images/dinh_khuong_ha.jpg",
        desc: "Đình Gừng cổ kính bên hồ bán nguyệt, mái ngói vảy mũi hài và vì kèo chạm rồng phượng thời Lê Sơ.",
        place_slug: "dinh-khuong-ha",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8158, 20.9923],
            [105.8166, 20.9923],
            [105.8166, 20.9929],
            [105.8158, 20.9929],
            [105.8158, 20.9923],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "chua-khuong-ha-3d",
        name: "Chùa Khương Hạ (Phụng Lộc Tự)",
        name_han_nom: "奉祿寺",
        height: 14,
        base_height: 0,
        floors: 3,
        color: "#E07B54",
        type: "heritage",
        village: "Khương Hạ",
        image: "/images/chua_boc.jpg",
        desc: "Ngôi chùa cổ thế kỷ XVII lưu giữ chuông đồng Cảnh Hưng và gác chuông rợp bóng cây bồ đề.",
        place_slug: "chua-khuong-ha",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8165, 20.9905],
            [105.8173, 20.9905],
            [105.8173, 20.9912],
            [105.8165, 20.9912],
            [105.8165, 20.9905],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "thcs-thpt-khuong-ha-3d",
        name: "Cụm trường THCS & THPT Khương Hạ",
        name_han_nom: "姜下學校",
        height: 22,
        base_height: 0,
        floors: 5,
        color: "#0284c7",
        type: "school",
        village: "Khương Hạ",
        image: "/images/heritage_icons.jpg",
        desc: "Khuôn viên trường chuẩn quốc gia khang trang, cái nôi học vấn của thế hệ trẻ làng Khương Hạ.",
        place_slug: "thcs-khuong-ha",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8150, 20.9888],
            [105.8164, 20.9888],
            [105.8164, 20.9900],
            [105.8150, 20.9900],
            [105.8150, 20.9888],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "khu-dan-cu-khuong-ha-3d",
        name: "Khu quần cư Làng Gừng (Xóm Đình - Xóm Chàm)",
        height: 15,
        base_height: 0,
        floors: 4,
        color: "#334155",
        type: "residential",
        village: "Khương Hạ",
        image: "/images/cong_khuong_trung.jpg",
        desc: "Mật độ nhà ngõ xóm truyền thống ven hồ Đầm Chuối và trục đường Bùi Xương Trạch.",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8175, 20.9870],
            [105.8210, 20.9870],
            [105.8210, 20.9895],
            [105.8175, 20.9895],
            [105.8175, 20.9870],
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
        name_han_nom: "亭姜中",
        height: 12,
        base_height: 0,
        floors: 2,
        color: "#C9A84C",
        type: "heritage",
        village: "Khương Trung",
        image: "/images/cong_khuong_trung.jpg",
        desc: "Di tích lịch sử cấp Quốc gia bảo tồn văn bia, sắc phong triều Lê - Nguyễn và kiến trúc gỗ truyền thống.",
        place_slug: "dinh-khuong-trung",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8193, 20.9968],
            [105.8203, 20.9968],
            [105.8203, 20.9975],
            [105.8193, 20.9975],
            [105.8193, 20.9968],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "chua-tieu-dao-3d",
        name: "Chùa Tiêu Dao (Khương Trung)",
        name_han_nom: "逍遙寺",
        height: 13,
        base_height: 0,
        floors: 2,
        color: "#E07B54",
        type: "heritage",
        village: "Khương Trung",
        image: "/images/chua_boc.jpg",
        desc: "Chùa Tiêu Dao kề bên đình làng, nổi tiếng với vườn tháp tổ và không gian thiền tịnh.",
        place_slug: "chua-khuong-trung",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8191, 20.9962],
            [105.8199, 20.9962],
            [105.8199, 20.9968],
            [105.8191, 20.9968],
            [105.8191, 20.9962],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "cong-khuong-trung-3d",
        name: "Cổng làng Khương Trung Cổ Thôn (Ngõ 211)",
        name_han_nom: "姜中古村門",
        height: 9,
        base_height: 0,
        floors: 2,
        color: "#f97316",
        type: "gate",
        village: "Khương Trung",
        image: "/images/cong_khuong_trung.jpg",
        desc: "Cổng vòm cuốn bằng gạch thẻ cổ, đắp nổi 4 chữ Hán 'Khương Trung Cổ Thôn' che chở dân làng hàng trăm năm.",
        place_slug: "cong-lang-khuong-trung",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8205, 20.9980],
            [105.8211, 20.9980],
            [105.8211, 20.9985],
            [105.8205, 20.9985],
            [105.8205, 20.9980],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "thcs-khuong-trung-3d",
        name: "Trường THCS Khương Trung",
        name_han_nom: "姜中初級中學校",
        height: 18,
        base_height: 0,
        floors: 5,
        color: "#38bdf8",
        type: "school",
        village: "Khương Trung",
        image: "/images/heritage_icons.jpg",
        desc: "Khối nhà giảng đường chữ U đạt chuẩn quốc gia tại ngõ 211 Khương Trung.",
        place_slug: "thcs-khuong-trung",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8212, 20.9973],
            [105.8222, 20.9973],
            [105.8222, 20.9982],
            [105.8212, 20.9982],
            [105.8212, 20.9973],
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
        name_han_nom: "亭姜亭",
        height: 12,
        base_height: 0,
        floors: 2,
        color: "#10b981",
        type: "heritage",
        village: "Khương Đình",
        image: "/images/dinh_khuong_ha.jpg",
        desc: "Đình làng ven bờ sông Tô Lịch xây từ thế kỷ XVI, phụng thờ vị danh tướng bảo quốc an dân.",
        place_slug: "dinh-khuong-dinh",
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
        name_han_nom: "三玄寺",
        height: 14,
        base_height: 0,
        floors: 2,
        color: "#ea580c",
        type: "heritage",
        village: "Khương Đình",
        image: "/images/chua_boc.jpg",
        desc: "Cổ tự ngàn năm có nguồn gốc từ triều Lý, gắn liền với di tích thân phụ Thiền sư Từ Đạo Hạnh.",
        place_slug: "chua-tam-huyen",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8171, 20.9907],
            [105.8178, 20.9907],
            [105.8178, 20.9913],
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
        name_han_nom: "姜亭學校",
        height: 19,
        base_height: 0,
        floors: 5,
        color: "#38bdf8",
        type: "school",
        village: "Khương Đình",
        image: "/images/heritage_icons.jpg",
        desc: "Tổ hợp trường học hiện đại nằm trên đường Bùi Xương Trạch, đào tạo con em địa phương.",
        place_slug: "thcs-khuong-dinh",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8198, 20.9897],
            [105.8210, 20.9897],
            [105.8210, 20.9907],
            [105.8198, 20.9907],
            [105.8198, 20.9897],
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
        name_han_nom: "亭姜上",
        height: 13,
        base_height: 0,
        floors: 2,
        color: "#8A7DC8",
        type: "heritage",
        village: "Khương Thượng",
        image: "/images/dinh_khuong_ha.jpg",
        desc: "Đình ven hồ Khương Thượng, ghi dấu nghĩa quân Tây Sơn đại phá đồn Khương Thượng năm 1789.",
        place_slug: "dinh-khuong-thuong",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8243, 21.0033],
            [105.8252, 21.0033],
            [105.8252, 21.0040],
            [105.8243, 21.0040],
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
        name_han_nom: "崇福寺",
        height: 15,
        base_height: 0,
        floors: 3,
        color: "#f59e0b",
        type: "heritage",
        village: "Khương Thượng",
        image: "/images/chua_boc.jpg",
        desc: "Di tích Quốc gia đặc biệt số 14 phố Chùa Bộc, nơi lưu giữ tượng ngầm Vua Quang Trung Nguyễn Huệ.",
        place_slug: "chua-boc",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8272, 21.0068],
            [105.8282, 21.0068],
            [105.8282, 21.0077],
            [105.8272, 21.0077],
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
        name_han_nom: "河內醫科大學",
        height: 42,
        base_height: 0,
        floors: 11,
        color: "#0284c7",
        type: "university",
        village: "Khương Thượng",
        image: "/images/historic_map.jpg",
        desc: "Đại học y khoa đầu tiên của Việt Nam thành lập năm 1902, khuôn viên rộng lớn trên phố Tôn Thất Tùng.",
        place_slug: "dai-hoc-y-ha-noi",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8306, 21.0022],
            [105.8322, 21.0022],
            [105.8322, 21.0036],
            [105.8306, 21.0036],
            [105.8306, 21.0022],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "dai-hoc-thuy-loi-3d",
        name: "Trường Đại học Thủy Lợi (Tòa nhà T35)",
        name_han_nom: "水利大學",
        height: 48,
        base_height: 0,
        floors: 13,
        color: "#0ea5e9",
        type: "university",
        village: "Khương Thượng",
        image: "/images/historic_map.jpg",
        desc: "Tòa tháp hiệu bộ T35 bề thế tại số 175 Tây Sơn, giáp ranh làng Khương Thượng và phố Chùa Bộc.",
        place_slug: "dai-hoc-thuy-loi",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8236, 21.0079],
            [105.8252, 21.0079],
            [105.8252, 21.0092],
            [105.8236, 21.0092],
            [105.8236, 21.0079],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "dan-cu-khuong-thuong-ho-3d",
        name: "Khu quần cư Làng Khương Thượng quanh Hồ",
        height: 16,
        base_height: 0,
        floors: 4,
        color: "#334155",
        type: "residential",
        village: "Khương Thượng",
        image: "/images/cong_khuong_trung.jpg",
        desc: "Mạng lưới ngõ xóm làng cổ uốn lượn quanh mặt nước hồ Khương Thượng và phố Tam Khương.",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8254, 21.0042],
            [105.8272, 21.0042],
            [105.8272, 21.0056],
            [105.8254, 21.0056],
            [105.8254, 21.0042],
          ],
        ],
      },
    },

    // ============================================================
    // 5. CAO ỐC ĐÔ THỊ HIỆN ĐẠI (Đối trọng 'Làng Trong Phố')
    // ============================================================
    {
      type: "Feature" as const,
      properties: {
        id: "artemis-tower-3d",
        name: "Tổ hợp Cao ốc The Artemis (Trường Chinh)",
        height: 85,
        base_height: 0,
        floors: 24,
        color: "#475569",
        type: "commercial",
        village: "Khương Mai / Khương Trung",
        image: "/images/historic_map.jpg",
        desc: "Tòa tháp thương mại và căn hộ cao cấp 24 tầng sừng sững bên nút giao Trường Chinh - Lê Trọng Tấn.",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8252, 21.0006],
            [105.8270, 21.0006],
            [105.8270, 21.0018],
            [105.8252, 21.0018],
            [105.8252, 21.0006],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "five-star-garden-3d",
        name: "Tổ hợp Five Star Garden Kim Giang",
        height: 95,
        base_height: 0,
        floors: 30,
        color: "#334155",
        type: "commercial",
        village: "Khương Đình",
        image: "/images/historic_map.jpg",
        desc: "Khu phức hợp căn hộ 30 tầng hiện đại tiếp giáp phía nam làng Khương Đình ven sông Tô Lịch.",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8140, 20.9840],
            [105.8162, 20.9840],
            [105.8162, 20.9852],
            [105.8140, 20.9852],
            [105.8140, 20.9840],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: "royal-city-cluster-3d",
        name: "Khu đô thị Royal City (Đối diện Cầu Mới)",
        height: 110,
        base_height: 0,
        floors: 35,
        color: "#1e293b",
        type: "commercial",
        village: "Thượng Đình",
        image: "/images/historic_map.jpg",
        desc: "Quần thể đô thị chọc trời đối diện qua sông Tô Lịch, minh chứng cho sự biến thiên phố thị quanh làng cổ.",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8175, 21.0020],
            [105.8205, 21.0020],
            [105.8205, 21.0040],
            [105.8175, 21.0040],
            [105.8175, 21.0020],
          ],
        ],
      },
    },
  ],
};
