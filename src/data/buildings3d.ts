// Dữ liệu mô hình hình học 3D (3D Building Footprints & Architectural Volumes)
// Dùng cho chế độ hiển thị 3D MapLibre fill-extrusion với ánh sáng động và chiều cao thực tế

export const BUILDINGS_3D_GEOJSON = {
  type: "FeatureCollection" as const,
  features: [
    // ── KHƯƠNG HẠ ──
    {
      type: "Feature" as const,
      properties: {
        name: "Đình Khương Hạ (Đình Gừng)",
        height: 11,
        base_height: 0,
        color: "#C9A84C",
        type: "heritage",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8159, 20.9924],
            [105.8165, 20.9924],
            [105.8165, 20.9928],
            [105.8159, 20.9928],
            [105.8159, 20.9924],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        name: "Chùa Khương Hạ (Phụng Lộc Tự)",
        height: 14,
        base_height: 0,
        color: "#E07B54",
        type: "heritage",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8166, 20.9906],
            [105.8172, 20.9906],
            [105.8172, 20.9911],
            [105.8166, 20.9911],
            [105.8166, 20.9906],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        name: "Trường THCS & THPT Khương Hạ",
        height: 18,
        base_height: 0,
        color: "#38bdf8",
        type: "school",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8148, 20.9890],
            [105.8162, 20.9890],
            [105.8162, 20.9900],
            [105.8148, 20.9900],
            [105.8148, 20.9890],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        name: "Khu dân cư làng Khương Hạ (Dãy Tây)",
        height: 14,
        base_height: 0,
        color: "#2a3b50",
        type: "residential",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8130, 20.9915],
            [105.8145, 20.9915],
            [105.8145, 20.9930],
            [105.8130, 20.9930],
            [105.8130, 20.9915],
          ],
        ],
      },
    },

    // ── KHƯƠNG TRUNG ──
    {
      type: "Feature" as const,
      properties: {
        name: "Đình & Chùa Khương Trung (245 Khương Trung)",
        height: 12,
        base_height: 0,
        color: "#C9A84C",
        type: "heritage",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8194, 20.9963],
            [105.8202, 20.9963],
            [105.8202, 20.9969],
            [105.8194, 20.9969],
            [105.8194, 20.9963],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        name: "Cổng làng Khương Trung Cổ Thôn (Ngõ 211)",
        height: 9,
        base_height: 0,
        color: "#e8a87c",
        type: "gate",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8206, 20.9980],
            [105.8211, 20.9980],
            [105.8211, 20.9984],
            [105.8206, 20.9984],
            [105.8206, 20.9980],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        name: "Trường THCS Khương Trung",
        height: 17,
        base_height: 0,
        color: "#38bdf8",
        type: "school",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8212, 20.9975],
            [105.8222, 20.9975],
            [105.8222, 20.9982],
            [105.8212, 20.9982],
            [105.8212, 20.9975],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        name: "Chung cư & Trung tâm đô thị Khương Trung",
        height: 48,
        base_height: 0,
        color: "#475569",
        type: "commercial",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8185, 20.9990],
            [105.8200, 20.9990],
            [105.8200, 21.0002],
            [105.8185, 21.0002],
            [105.8185, 20.9990],
          ],
        ],
      },
    },

    // ── KHƯƠNG ĐÌNH ──
    {
      type: "Feature" as const,
      properties: {
        name: "Đình Khương Đình",
        height: 12,
        base_height: 0,
        color: "#6BAF92",
        type: "heritage",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8178, 20.9912],
            [105.8185, 20.9912],
            [105.8185, 20.9918],
            [105.8178, 20.9918],
            [105.8178, 20.9912],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        name: "Chùa Tam Huyền (Sùng Phúc Tự)",
        height: 13,
        base_height: 0,
        color: "#E07B54",
        type: "heritage",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8172, 20.9908],
            [105.8178, 20.9908],
            [105.8178, 20.9913],
            [105.8172, 20.9913],
            [105.8172, 20.9908],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        name: "Trường THCS & Tiểu học Khương Đình",
        height: 16,
        base_height: 0,
        color: "#38bdf8",
        type: "school",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8198, 20.9895],
            [105.8212, 20.9895],
            [105.8212, 20.9906],
            [105.8198, 20.9906],
            [105.8198, 20.9895],
          ],
        ],
      },
    },

    // ── KHƯƠNG THƯỢNG ──
    {
      type: "Feature" as const,
      properties: {
        name: "Đình Khương Thượng (165 Khương Thượng)",
        height: 12,
        base_height: 0,
        color: "#8A7DC8",
        type: "heritage",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8243, 21.0033],
            [105.8251, 21.0033],
            [105.8251, 21.0040],
            [105.8243, 21.0040],
            [105.8243, 21.0033],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        name: "Chùa Bộc (Sùng Phúc Tự - Di tích 1789)",
        height: 14,
        base_height: 0,
        color: "#E07B54",
        type: "heritage",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8272, 21.0069],
            [105.8280, 21.0069],
            [105.8280, 21.0076],
            [105.8272, 21.0076],
            [105.8272, 21.0069],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        name: "Trường Đại học Thủy Lợi (Khối nhà chính)",
        height: 38,
        base_height: 0,
        color: "#38bdf8",
        type: "university",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8236, 21.0080],
            [105.8250, 21.0080],
            [105.8250, 21.0092],
            [105.8236, 21.0092],
            [105.8236, 21.0080],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        name: "Trường Đại học Y Hà Nội (Khu giảng đường & Bệnh viện)",
        height: 32,
        base_height: 0,
        color: "#38bdf8",
        type: "university",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8305, 21.0024],
            [105.8322, 21.0024],
            [105.8322, 21.0038],
            [105.8305, 21.0038],
            [105.8305, 21.0024],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        name: "Tổ hợp cao ốc Ngã Tư Sở - Trường Chinh (Artemis / Royal Edge)",
        height: 65,
        base_height: 0,
        color: "#64748b",
        type: "commercial",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8248, 21.0006],
            [105.8268, 21.0006],
            [105.8268, 21.0018],
            [105.8248, 21.0018],
            [105.8248, 21.0006],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        name: "Khu dân cư làng Khương Thượng quanh hồ",
        height: 15,
        base_height: 0,
        color: "#2a3b50",
        type: "residential",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8255, 21.0042],
            [105.8270, 21.0042],
            [105.8270, 21.0055],
            [105.8255, 21.0055],
            [105.8255, 21.0042],
          ],
        ],
      },
    },
  ],
};
