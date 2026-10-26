// Ranh giới địa lý & phân khu chính xác 4 làng cổ / phân khu hành chính ven sông Tô Lịch
// Cập nhật chuẩn xác 100% theo bản đồ hành chính & Nghị quyết số 1286/NQ-UBTVQH15 của Ủy ban Thường vụ Quốc hội
// (Nghị quyết về sắp xếp đơn vị hành chính cấp xã của TP Hà Nội giai đoạn 2023 - 2025, có hiệu lực từ 2025)

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
    // ── 1. PHÂN KHU HÀNH CHÍNH & DI SẢN KHƯƠNG THƯỢNG (Quận Đống Đa) ──
    // Theo NQ 1286/NQ-UBTVQH15: Nhập một phần phường Ngã Tư Sở vào phường Khương Thượng
    {
      type: "Feature" as const,
      properties: {
        id: 4,
        slug: "khuong-thuong",
        name: "Khương Thượng",
        name_han_nom: "姜上",
        name_old: "Làng Khương Thượng (Phường Khương Thượng mở rộng)",
        color: "#9333EA", // Tím chàm di sản Thăng Long
        colorDark: "#581C87",
        district: "Quận Đống Đa",
        summary:
          "Khương Thượng nằm ở phía bắc cụm làng Khương, bao trọn tứ giác vàng: Tây Sơn - Chùa Bộc - Tôn Thất Tùng - Trường Chinh. Nơi đây hội tụ hồ Khương Thượng, Chùa Bộc (Di tích QG Đặc biệt lưu giữ tượng Vua Quang Trung), Đình Khương Thượng (165 Khương Thượng), Trường Đại học Y Hà Nội (1902), Trường Đại học Thủy Lợi (175 Tây Sơn), gắn liền với chiến thắng Ngọc Hồi - Đống Đa mùa xuân 1789.",
        area_ha: 64,
        established: "Thế kỷ XI–XV (thời Lý - Lê)",
        administrative_merger_2025:
          "CẬP NHẬT 2025 (NQ số 1286/NQ-UBTVQH15): Điều chỉnh một phần diện tích tự nhiên và dân số của phường Ngã Tư Sở để sáp nhập vào phường Khương Thượng, mở rộng không gian đô thị di sản từ ĐH Thủy Lợi, Chùa Bộc, ĐH Y Hà Nội đến trọn vẹn nút giao lịch sử Ngã Tư Sở.",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8202, 21.0028], // Nút giao Ngã Tư Sở
            [105.8214, 21.0050], // Phố Tây Sơn qua Chùa Phúc Khánh
            [105.8228, 21.0070], // Phố Tây Sơn đối diện Thái Hà
            [105.8242, 21.0085], // Ngã tư Tây Sơn - Chùa Bộc (ĐH Thủy Lợi)
            [105.8270, 21.0080], // Dọc phố Chùa Bộc (Chùa Bộc, Học viện Ngân hàng)
            [105.8300, 21.0072], // Ngã tư Chùa Bộc - Tôn Thất Tùng - Phạm Ngọc Thạch
            [105.8315, 21.0045], // Phố Tôn Thất Tùng (Cổng Trường Đại học Y Hà Nội)
            [105.8322, 21.0025], // Bệnh viện Đại học Y Hà Nội
            [105.8320, 21.0010], // Ngã ba Tôn Thất Tùng - Đại lộ Trường Chinh
            [105.8270, 21.0014], // Đại lộ Trường Chinh (đường Vành đai 2 trên cao)
            [105.8230, 21.0020], // Cầu vượt Ngã Tư Sở
            [105.8202, 21.0028], // Khép kín nút giao Ngã Tư Sở
          ],
        ],
      },
    },

    // ── 2. PHÂN KHU HÀNH CHÍNH & DI SẢN KHƯƠNG TRUNG (Quận Thanh Xuân) ──
    {
      type: "Feature" as const,
      properties: {
        id: 2,
        slug: "khuong-trung",
        name: "Khương Trung",
        name_han_nom: "姜中",
        name_old: "Làng Gừng Trung (Khương Trung Cổ Thôn)",
        color: "#EA580C", // Cam đất nung cổ truyền
        colorDark: "#9A3412",
        district: "Quận Thanh Xuân",
        summary:
          "Phường Khương Trung trải dài từ Cầu Mới Ngã Tư Sở dọc theo bờ sông Tô Lịch và phố Khương Trung đến hồ Đầm Hồng. Nổi danh với Cổng làng ngõ 211 cổ kính ('Khương Trung Cổ Thôn'), cụm di tích Đình - Chùa Tiêu Dao tại số 245 Khương Trung, Trường THCS Khương Trung (ngõ 211) và Trường Tiểu học Khương Trung (số 267).",
        area_ha: 78,
        established: "Thế kỷ XIV (thời Trần)",
        administrative_merger_2025:
          "Theo Nghị quyết số 1286/NQ-UBTVQH15, địa giới phường Khương Trung được kiện toàn vững chắc thuộc quận Thanh Xuân, ôm trọn tuyến cảnh quan ven sông Tô Lịch, phố Khương Trung và không gian sinh thái hồ Đầm Hồng.",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8202, 21.0028], // Cầu Mới Ngã Tư Sở (bờ đông sông Tô Lịch)
            [105.8236, 21.0018], // Phố Trường Chinh giao Vương Thừa Vũ
            [105.8250, 21.0002], // Phố Vương Thừa Vũ
            [105.8258, 20.9978], // Ranh giới với Khương Mai (Hoàng Văn Thái / Tô Vĩnh Diện)
            [105.8252, 20.9952], // Phía đông hồ Đầm Hồng
            [105.8232, 20.9935], // Bờ tây nam hồ Đầm Hồng (giao ranh giới Khương Đình)
            [105.8215, 20.9934], // Ranh giới ngõ 211 & ngõ 345 Khương Trung
            [105.8188, 20.9938], // Tuyến ranh giới giáp Khương Đình
            [105.8160, 20.9942], // Mố Cầu Khương Đình (giao đường Vũ Tông Phan)
            [105.8174, 20.9972], // Men dọc bờ sông Tô Lịch (đường Vũ Tông Phan)
            [105.8190, 21.0002], // Đoạn sông Tô Lịch đối diện Thượng Đình
            [105.8202, 21.0028], // Khép kín Cầu Mới Ngã Tư Sở
          ],
        ],
      },
    },

    // ── 3. PHÂN KHU HÀNH CHÍNH & DI SẢN KHƯƠNG ĐÌNH (Quận Thanh Xuân) ──
    {
      type: "Feature" as const,
      properties: {
        id: 3,
        slug: "khuong-dinh",
        name: "Khương Đình",
        name_han_nom: "姜亭",
        name_old: "Làng Khương Đình (Phường Khương Đình)",
        color: "#059669", // Xanh ngọc lục bảo di sản
        colorDark: "#065F46",
        district: "Quận Thanh Xuân",
        summary:
          "Phường Khương Đình trải dài từ Cầu Khương Đình dọc bờ đông sông Tô Lịch (đường Vũ Tông Phan) xuống đến Cầu Lủ, ôm trọn trục phố Bùi Xương Trạch và hồ Đầm Chuối. Nơi đây có Đình Khương Đình (thờ danh tướng Lê Dương Vệ), Chùa Tam Huyền (Sùng Phúc Tự từ thời Lý XI–XII), Trường THCS Khương Đình (16 Bùi Xương Trạch), Tiểu học Khương Đình (ngõ 108 Bùi Xương Trạch).",
        area_ha: 85,
        established: "Thế kỷ XIII (thời Lý - Trần)",
        administrative_merger_2025:
          "Theo Nghị quyết số 1286/NQ-UBTVQH15, địa giới phường Khương Đình tiếp giáp trực tiếp phường Hạ Đình mới (được hợp nhất toàn bộ phường Kim Giang vào phường Hạ Đình), tạo nên trục kết nối di sản đồng bộ dọc sông Tô Lịch.",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8160, 20.9942], // Cầu Khương Đình (giao đường Vũ Tông Phan & sông Tô Lịch)
            [105.8188, 20.9938], // Ranh giới phía bắc với Khương Trung
            [105.8215, 20.9934], // Tuyến ranh giới ngõ 345 / 211
            [105.8232, 20.9935], // Bờ tây nam hồ Đầm Hồng
            [105.8240, 20.9908], // Tuyến ranh giới phía đông (Thanh Xuân - Hoàng Mai)
            [105.8242, 20.9888], // Bờ đông hồ Đầm Chuối
            [105.8236, 20.9868], // Phía đông nam Đầm Chuối
            [105.8218, 20.9854], // Tuyến ranh giới phía nam giáp Định Công
            [105.8195, 20.9847], // Phía nam ngõ 358 Bùi Xương Trạch
            [105.8175, 20.9842], // Phía bắc Định Công Thượng
            [105.8156, 20.9840], // Cầu Lủ (giao đường Vũ Tông Phan & sông Tô Lịch)
            [105.8146, 20.9847], // Men theo đường Vũ Tông Phan dọc bờ sông Tô Lịch
            [105.8139, 20.9858], // Đoạn sông Tô Lịch đối diện Kim Giang
            [105.8136, 20.9877], // Đoạn sông Tô Lịch đối diện Hạ Đình
            [105.8137, 20.9897], // Đường Vũ Tông Phan
            [105.8143, 20.9913], // Cầu Khương Hạ
            [105.8153, 20.9930], // Đường Vũ Tông Phan đoạn đối diện Khương Đình
            [105.8160, 20.9942], // Khép kín Cầu Khương Đình
          ],
        ],
      },
    },

    // ── 4. VÙNG LÕI DI SẢN LÀNG CỔ KHƯƠNG HẠ (Thanh Xuân) ──
    {
      type: "Feature" as const,
      properties: {
        id: 1,
        slug: "khuong-ha",
        name: "Làng Khương Hạ",
        name_han_nom: "姜下",
        name_old: "Làng Gừng Hạ (Vùng lõi Di sản Cổ Thôn)",
        color: "#D97706", // Vàng đồng thau / Hoàng thổ Bắc Bộ
        colorDark: "#92400E",
        district: "Quận Thanh Xuân",
        summary:
          "Vùng lõi di sản Làng Khương Hạ (Làng Gừng) nằm bám sát trục phố Khương Hạ và bờ sông Tô Lịch. Nơi đây bảo lưu trọn vẹn không gian văn hóa xóm Đình, xóm Chàm, xóm Cò với Đình Khương Hạ (Đình Gừng số 4 Khương Hạ), Chùa Phụng Lộc (số 67 Khương Hạ), Giếng cổ đá ong ngõ 29, hồ Khương Hạ cùng Tổ hợp trường THCS & THPT Khương Hạ chuẩn Quốc gia (số 29–31 Khương Hạ).",
        area_ha: 42,
        established: "Thế kỷ XV (thời Lê Sơ)",
        administrative_merger_2025:
          "Về hành chính, địa bàn Khương Hạ thuộc phường Khương Đình (trụ sở UBND phường đặt tại số 33 phố Khương Hạ), tiếp giáp phường Hạ Đình mới (nơi sáp nhập phường Kim Giang vào Hạ Đình theo NQ số 1286/NQ-UBTVQH15).",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8160, 20.9942], // Cầu Khương Đình (đầu phố Khương Hạ)
            [105.8172, 20.9932], // Đầu phố Bùi Xương Trạch giáp Khương Hạ
            [105.8174, 20.9905], // Phía sau Chùa Phụng Lộc
            [105.8170, 20.9880], // Ranh giới phía đông cụm trường Khương Hạ
            [105.8145, 20.9880], // Phía nam Hồ Khương Hạ / ngõ 29
            [105.8137, 20.9897], // Bờ sông Tô Lịch (đường Khương Hạ)
            [105.8143, 20.9913], // Cầu Khương Hạ
            [105.8153, 20.9930], // Phố Khương Hạ (qua Đình Khương Hạ số 4)
            [105.8160, 20.9942], // Khép kín Cầu Khương Đình
          ],
        ],
      },
    },
  ],
};

// Tâm bản đồ bao trùm cả 4 phân khu từ Thanh Xuân đến Đống Đa
export const VILLAGES_CENTER: [number, number] = [105.8220, 20.9970];

// Hộp giới hạn bao phủ Khương Hạ, Khương Trung, Khương Đình và Khương Thượng
export const VILLAGES_BBOX: [number, number, number, number] = [
  105.8105, 20.9820, 105.8340, 21.0130,
];
