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
    // ── 1. LÀNG KHƯƠNG HẠ (Thanh Xuân) ──
    {
      type: "Feature" as const,
      properties: {
        id: 1,
        slug: "khuong-ha",
        name: "Khương Hạ",
        name_han_nom: "姜下",
        name_old: "Làng Gừng Hạ (Khương Hạ Cổ Thôn)",
        color: "#C9A84C",
        colorDark: "#8B6914",
        district: "Quận Thanh Xuân",
        summary:
          "Làng Khương Hạ (tên nôm là làng Gừng) nằm ở phía nam cụm Tam Khương. Nơi đây bảo lưu trọn vẹn không gian văn hóa xóm Đình, xóm Chàm, xóm Cò, xóm Hồng với Đình Khương Hạ, Chùa Phụng Lộc, Giếng cổ đá ong, hồ Đầm Chuối và hệ thống trường THCS, THPT Khương Hạ.",
        area_ha: 48,
        established: "Thế kỷ XV (thời Lê Sơ)",
        administrative_merger_2025:
          "Theo Nghị quyết của UBTVQH về sắp xếp ĐVHC giai đoạn 2023–2025 (hiệu lực từ 2025), khu vực Khương Hạ thuộc phường Khương Đình sắp xếp lại, tiếp giáp phường Hạ Đình mới (đã sáp nhập phường Kim Giang vào Hạ Đình).",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8155, 20.9935], // Ngã ba Khương Hạ - Bùi Xương Trạch
            [105.8190, 20.9938], // Phía nam Đầm Hồng
            [105.8235, 20.9928], // Tiếp giáp Khương Mai / Đầm Hồng
            [105.8252, 20.9895], // Bờ đông hồ Đầm Chuối (giáp Hoàng Mai)
            [105.8238, 20.9850], // Phía nam Đầm Chuối / ngõ 1 Bùi Xương Trạch
            [105.8205, 20.9835], // Giáp ranh Định Công Thượng (Chợ Lủ)
            [105.8165, 20.9840], // Đoạn cuối phố Bùi Xương Trạch
            [105.8158, 20.9875], // Hồ Khương Hạ
            [105.8150, 20.9910], // Cụm Đình - Chùa Khương Hạ
            [105.8155, 20.9935], // Khép kín
          ],
        ],
      },
    },

    // ── 2. LÀNG KHƯƠNG TRUNG (Thanh Xuân) ──
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
          "Làng Khương Trung trải dài từ Cầu Mới Ngã Tư Sở dọc theo phố Khương Trung và bờ sông Tô Lịch đến Đầm Hồng. Nổi tiếng với Cổng làng ngõ 211 cổ kính ('Khương Trung Cổ Thôn'), cụm di tích Đình - Chùa Tiêu Dao tại số 245 Khương Trung.",
        area_ha: 42,
        established: "Thế kỷ XIV",
        administrative_merger_2025:
          "Thuộc địa bàn phường Khương Trung được kiện toàn địa giới hành chính, kết nối trục cảnh quan đô thị ven sông Tô Lịch và hồ Đầm Hồng theo quy hoạch mới của Hà Nội.",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8222, 21.0025], // Cầu Mới Ngã Tư Sở (bờ sông Tô Lịch)
            [105.8236, 21.0018], // Phố Trường Chinh giao Vương Thừa Vũ
            [105.8250, 20.9995], // Ranh giới với Khương Mai (Tô Vĩnh Diện)
            [105.8258, 20.9968], // Bờ đông hồ Đầm Hồng
            [105.8225, 20.9942], // Phía nam hồ Đầm Hồng
            [105.8185, 20.9935], // Phía sau ngõ 211 Khương Trung
            [105.8158, 20.9942], // Bờ đông sông Tô Lịch (gần Cầu Khương Đình)
            [105.8172, 20.9972], // Dọc đường Vũ Tông Phan
            [105.8190, 20.9998], // Dọc phố Khương Trung
            [105.8222, 21.0025], // Khép kín Cầu Mới
          ],
        ],
      },
    },

    // ── 3. LÀNG KHƯƠNG ĐÌNH (Thanh Xuân) ──
    {
      type: "Feature" as const,
      properties: {
        id: 3,
        slug: "khuong-dinh",
        name: "Khương Đình",
        name_han_nom: "姜亭",
        name_old: "Làng Khương Đình (Khu vực Cầu Khương Đình)",
        color: "#10b981",
        colorDark: "#047857",
        district: "Quận Thanh Xuân",
        summary:
          "Làng Khương Đình bám dọc bờ đông sông Tô Lịch, trung tâm quanh Cầu Khương Đình, phố Khương Đình và Vũ Tông Phan. Nơi đây có Đình Khương Đình thờ danh tướng Lê Dương Vệ, Chùa Tam Huyền (Sùng Phúc Tự) từ thời Lý và bia chiến tích anh hùng.",
        area_ha: 36,
        established: "Thế kỷ XIII (thời Lý - Trần)",
        administrative_merger_2025:
          "Được sắp xếp lại theo phương án tổ chức ĐVHC mới của quận Thanh Xuân, tiếp giáp không gian sinh thái hồ Đầm Hồng và hồ Định Công.",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8158, 20.9942], // Bờ đông sông Tô Lịch tại Cầu Khương Đình
            [105.8185, 20.9935], // Ranh giới ngõ 211 Khương Trung
            [105.8185, 20.9905], // Dọc ngõ 117 Khương Đình (Chùa Tam Huyền)
            [105.8172, 20.9870], // Bùi Xương Trạch đoạn giao Khương Hạ
            [105.8142, 20.9855], // Đường Kim Giang ven sông Tô Lịch
            [105.8128, 20.9878], // Khúc uốn sông Tô Lịch
            [105.8135, 20.9912], // Bờ sông Tô Lịch đường Vũ Tông Phan
            [105.8158, 20.9942], // Khép kín Cầu Khương Đình
          ],
        ],
      },
    },

    // ── 4. LÀNG KHƯƠNG THƯỢNG (Đống Đa) ──
    {
      type: "Feature" as const,
      properties: {
        id: 4,
        slug: "khuong-thuong",
        name: "Khương Thượng",
        name_han_nom: "姜上",
        name_old: "Làng Khương Thượng (Đống Đa)",
        color: "#8A7DC8",
        colorDark: "#4A3F8B",
        district: "Quận Đống Đa",
        summary:
          "Làng Khương Thượng nằm ở phía bắc cụm làng Khương, bao trọn tứ giác vàng: Tây Sơn - Chùa Bộc - Tôn Thất Tùng - Trường Chinh. Nơi đây có hồ Khương Thượng, Chùa Bộc, Đình Khương Thượng, Đại học Y Hà Nội, Đại học Thủy Lợi, gắn liền với chiến thắng Ngọc Hồi - Đống Đa mùa xuân 1789.",
        area_ha: 55,
        established: "Thế kỷ XI–XV (thời Lý - Lê)",
        administrative_merger_2025:
          "ĐẶC BIỆT: Theo Nghị quyết số 1286/NQ-UBTVQH15 có hiệu lực từ 2025, toàn bộ phường Khương Thượng cùng phường Kim Liên sáp nhập thành PHƯỜNG KIM LIÊN MỚI (quận Đống Đa). Bản đồ 'Làng Trong Phố' đóng vai trò lưu trữ và tôn vinh địa danh lịch sử ngàn năm này.",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [105.8228, 21.0028], // Ngã Tư Sở (Tây Sơn giao Trường Chinh)
            [105.8242, 21.0080], // Ngã ba Tây Sơn - Chùa Bộc (ĐH Thủy Lợi)
            [105.8286, 21.0083], // Ngã tư Chùa Bộc - Tôn Thất Tùng
            [105.8322, 21.0035], // Phố Tôn Thất Tùng (Bệnh viện ĐH Y Hà Nội)
            [105.8306, 21.0010], // Ngã ba Tôn Thất Tùng - Trường Chinh
            [105.8260, 21.0014], // Dọc đường Trường Chinh (Vành đai 2)
            [105.8228, 21.0028], // Khép kín Ngã Tư Sở
          ],
        ],
      },
    },
  ],
};

// Tâm bản đồ bao trùm cả 4 làng từ Thanh Xuân đến Đống Đa
export const VILLAGES_CENTER: [number, number] = [105.8210, 20.9960];

// Hộp giới hạn bao phủ Khương Hạ, Khương Trung, Khương Đình và Khương Thượng
export const VILLAGES_BBOX: [number, number, number, number] = [
  105.8120, 20.9830, 105.8335, 21.0100,
];
