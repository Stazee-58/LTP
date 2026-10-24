// Ranh giới gần đúng 4 làng — cần chỉnh lại bằng QGIS + bản đồ địa chính thực tế
export const VILLAGES_GEOJSON = {
  type: "FeatureCollection" as const,
  features: [
    {
      type: "Feature" as const,
      properties: {
        id: 1,
        slug: "khuong-ha",
        name: "Khương Hạ",
        name_han_nom: "姜下",
        name_old: "Làng Khương Hạ",
        color: "#C9A84C",
        colorDark: "#8B6914",
        summary:
          "Làng Khương Hạ — một trong những làng cổ nằm ở phía nam Hà Nội, thuộc quận Thanh Xuân. Nơi đây lưu giữ nhiều di tích lịch sử và kiến trúc truyền thống.",
        area_ha: 45,
        established: "Thế kỷ XV",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8078, 20.9945],
            [105.8125, 20.9945],
            [105.8125, 20.9895],
            [105.8095, 20.9885],
            [105.8070, 20.9900],
            [105.8068, 20.9920],
            [105.8078, 20.9945],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: 2,
        slug: "khuong-trung",
        name: "Khương Trung",
        name_han_nom: "姜中",
        name_old: "Làng Khương Trung",
        color: "#E07B54",
        colorDark: "#9B4A28",
        summary:
          "Làng Khương Trung nằm ở vị trí trung tâm trong cụm làng Khương, tiếp giáp với các làng Khương Hạ và Khương Đình. Đình làng Khương Trung là điểm di tích tiêu biểu.",
        area_ha: 38,
        established: "Thế kỷ XIV",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8125, 20.9945],
            [105.8175, 20.9960],
            [105.8190, 20.9935],
            [105.8160, 20.9900],
            [105.8130, 20.9905],
            [105.8125, 20.9930],
            [105.8125, 20.9945],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: 3,
        slug: "khuong-dinh",
        name: "Khương Đình",
        name_han_nom: "姜亭",
        name_old: "Làng Khương Đình",
        color: "#6BAF92",
        colorDark: "#2D7055",
        summary:
          "Làng Khương Đình gắn liền với lịch sử đình làng cổ kính và hệ thống ngõ xóm đặc trưng của làng quê Bắc Bộ ngay trong lòng đô thị Hà Nội hiện đại.",
        area_ha: 52,
        established: "Thế kỷ XIII",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8175, 20.9960],
            [105.8225, 20.9975],
            [105.8240, 20.9945],
            [105.8205, 20.9910],
            [105.8180, 20.9915],
            [105.8160, 20.9935],
            [105.8175, 20.9960],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        id: 4,
        slug: "khuong-thuong",
        name: "Khương Thượng",
        name_han_nom: "姜上",
        name_old: "Làng Khương Thượng",
        color: "#8A7DC8",
        colorDark: "#4A3F8B",
        summary:
          "Làng Khương Thượng là làng phía bắc trong cụm, nằm tiếp giáp với quận Đống Đa. Nơi đây có giếng cổ và các công trình kiến trúc dân gian đặc sắc.",
        area_ha: 41,
        established: "Thế kỷ XV",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8070, 20.9945],
            [105.8125, 20.9945],
            [105.8125, 20.9975],
            [105.8095, 20.9990],
            [105.8065, 20.9975],
            [105.8060, 20.9960],
            [105.8070, 20.9945],
          ],
        ],
      },
    },
  ],
};

export const VILLAGES_CENTER: [number, number] = [105.8145, 20.9937];
export const VILLAGES_BBOX: [number, number, number, number] = [
  105.8060, 20.9880, 105.8250, 21.0000,
];

export type Village = (typeof VILLAGES_GEOJSON.features)[0];
