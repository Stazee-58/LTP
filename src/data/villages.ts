// Ranh giới địa lý chính xác 4 làng cổ ven sông Tô Lịch
// Đã cập nhật theo Nghị quyết sắp xếp đơn vị hành chính mới của UBTVQH (hiệu lực 2025)

export interface VillageProperty {
  id: number;
  slug: string;
  name: string;
  name_han_nom: string;
  name_old: string;
  color: string;
  colorDark: string;
  summary: string;
  area_ha: number;
  established: string;
  administrative_merger_2025: string;
  district: string;
}

export interface Village {
  type: "Feature";
  properties: VillageProperty;
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}

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
        name_old: "Làng Gừng Hạ (Khương Hạ)",
        color: "#C9A84C",
        colorDark: "#8B6914",
        district: "Quận Thanh Xuân",
        summary:
          "Làng Khương Hạ (tên nôm là làng Gừng) nằm ở bờ tây sông Tô Lịch. Nơi đây nổi tiếng với Đình Khương Hạ (Đình Gừng), Chùa Phụng Lộc Tự và hệ thống giếng cổ, nhà thờ họ bảo lưu nguyên vẹn tập tục làng quê Bắc Bộ.",
        area_ha: 45,
        established: "Thế kỷ XV (thời Lê Sơ)",
        administrative_merger_2025:
          "Theo Nghị quyết của UBTVQH về sắp xếp ĐVHC giai đoạn 2023–2025 (hiệu lực từ 2025), khu vực Khương Hạ thuộc phường Khương Đình sắp xếp lại, tiếp giáp phường Hạ Đình mới (đã sáp nhập phường Kim Giang vào Hạ Đình).",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8125, 20.9940],
            [105.8166, 20.9940],
            [105.8170, 20.9910],
            [105.8172, 20.9885],
            [105.8145, 20.9865],
            [105.8115, 20.9875],
            [105.8105, 20.9905],
            [105.8115, 20.9928],
            [105.8125, 20.9940],
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
        name_old: "Làng Gừng Trung (Khương Trung Cổ Thôn)",
        color: "#E07B54",
        colorDark: "#9B4A28",
        district: "Quận Thanh Xuân",
        summary:
          "Làng Khương Trung trải dài từ cầu Mới Ngã Tư Sở dọc theo phố Khương Trung đến Đầm Hồng. Nổi tiếng với Cổng làng ngõ 211 cổ kính ('Khương Trung Cổ Thôn'), cụm di tích Đình - Chùa Tiêu Dao tại số 245 Khương Trung.",
        area_ha: 38,
        established: "Thế kỷ XIV",
        administrative_merger_2025:
          "Thuộc địa bàn phường Khương Trung được kiện toàn địa giới hành chính, kết nối trục cảnh quan đô thị ven sông Tô Lịch và hồ Đầm Hồng theo quy hoạch mới của Hà Nội.",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8182, 21.0008],
            [105.8235, 20.9985],
            [105.8242, 20.9945],
            [105.8210, 20.9925],
            [105.8168, 20.9950],
            [105.8172, 20.9985],
            [105.8182, 21.0008],
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
        district: "Quận Thanh Xuân",
        summary:
          "Làng Khương Đình nằm ở tả ngạn sông Tô Lịch, dọc trục phố Bùi Xương Trạch và Vũ Tông Phan. Nơi đây có Đình Khương Đình thờ danh tướng Lê Dương Vệ, Chùa Tam Huyền (Sùng Phúc Tự) có từ thời Lý và hệ thống ngõ xóm làng cổ đặc sắc.",
        area_ha: 52,
        established: "Thế kỷ XIII (thời Lý - Trần)",
        administrative_merger_2025:
          "Được sắp xếp lại theo phương án tổ chức ĐVHC mới của quận Thanh Xuân, tiếp giáp không gian sinh thái hồ Đầm Hồng và hồ Định Công.",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8170, 20.9940],
            [105.8210, 20.9935],
            [105.8250, 20.9915],
            [105.8238, 20.9860],
            [105.8180, 20.9855],
            [105.8168, 20.9890],
            [105.8170, 20.9940],
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
        district: "Quận Đống Đa",
        summary:
          "Làng Khương Thượng nằm ở phía bắc cụm làng Khương, bao quanh hồ Khương Thượng, phố Tôn Thất Tùng và phố Chùa Bộc. Đây là chiến địa lịch sử nơi nghĩa quân Tây Sơn của vua Quang Trung đại phá quân Mãn Thanh trong trận Ngọc Hồi - Đống Đa mùa xuân 1789.",
        area_ha: 41,
        established: "Thế kỷ XI–XV (thời Lý - Lê)",
        administrative_merger_2025:
          "ĐẶC BIỆT: Theo Nghị quyết số 1286/NQ-UBTVQH15 có hiệu lực từ 2025, toàn bộ phường Khương Thượng cùng phường Kim Liên sáp nhập thành PHƯỜNG KIM LIÊN MỚI (quận Đống Đa). Bản đồ 'Làng Trong Phố' đóng vai trò lưu trữ và tôn vinh địa danh lịch sử ngàn năm này.",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8235, 21.0025],
            [105.8240, 21.0082],
            [105.8288, 21.0080],
            [105.8320, 21.0040],
            [105.8285, 21.0005],
            [105.8248, 21.0012],
            [105.8235, 21.0025],
          ],
        ],
      },
    },
  ],
};

// Tâm bản đồ bao trùm cả 4 làng từ Thanh Xuân đến Đống Đa
export const VILLAGES_CENTER: [number, number] = [105.8205, 20.9965];

// Hộp giới hạn bao phủ Khương Hạ, Khương Trung, Khương Đình và Khương Thượng
export const VILLAGES_BBOX: [number, number, number, number] = [
  105.8100, 20.9850, 105.8330, 21.0100,
];
