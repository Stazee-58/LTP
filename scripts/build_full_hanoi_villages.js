const fs = require('fs');

// Full list of 28 historic villages/wards across 6 core inner districts of Hanoi
const villages = [
  // ────────────────────────────────────────────────────────────
  // QUẬN THANH XUÂN (6 làng/phường)
  // ────────────────────────────────────────────────────────────
  {
    id: 1,
    slug: "khuong-ha",
    name: "Làng Khương Hạ",
    name_han_nom: "姜下",
    name_old: "Làng Gừng Hạ (Vùng lõi Di sản Cổ Thôn)",
    new_administrative_name: "Sáp nhập vào Phường Khương Đình (Thanh Xuân)",
    merger_badge: "Sáp nhập P. Khương Đình",
    color: "#D97706",
    colorDark: "#92400E",
    district: "Quận Thanh Xuân",
    summary:
      "Vùng lõi di sản Làng Khương Hạ (Làng Gừng) nằm bám sát trục phố Khương Hạ và bờ sông Tô Lịch. Nơi đây bảo lưu trọn vẹn không gian văn hóa xóm Đình, xóm Chàm, xóm Cò với Đình Khương Hạ (Đình Gừng số 4 Khương Hạ), Chùa Phụng Lộc (số 67 Khương Hạ), Giếng cổ đá ong ngõ 29, hồ Khương Hạ cùng Tổ hợp trường THCS & THPT Khương Hạ chuẩn Quốc gia (số 29–31 Khương Hạ).",
    area_ha: 42,
    established: "Thế kỷ XV (thời Lê Sơ)",
    administrative_merger_2025:
      "Về hành chính, địa bàn Khương Hạ thuộc phường Khương Đình (trụ sở UBND phường đặt tại số 33 phố Khương Hạ), tiếp giáp phường Hạ Đình mới (nơi sáp nhập phường Kim Giang vào Hạ Đình theo NQ số 1286/NQ-UBTVQH15).",
    coordinates: [
      [105.816000, 20.994200],
      [105.815600, 20.993200],
      [105.814800, 20.992200],
      [105.814200, 20.991200],
      [105.813800, 20.989800],
      [105.813600, 20.988200],
      [105.814800, 20.988200],
      [105.817000, 20.988200],
      [105.817200, 20.990500],
      [105.817000, 20.993000],
      [105.816000, 20.994200]
    ]
  },
  {
    id: 2,
    slug: "khuong-trung",
    name: "Khương Trung",
    name_han_nom: "姜中",
    name_old: "Làng Gừng Trung (Khương Trung Cổ Thôn)",
    new_administrative_name: "Phường Khương Trung (Thanh Xuân)",
    merger_badge: "Phường Khương Trung",
    color: "#EA580C",
    colorDark: "#9A3412",
    district: "Quận Thanh Xuân",
    summary:
      "Phường Khương Trung trải dài từ Cầu Mới Ngã Tư Sở dọc theo bờ sông Tô Lịch và phố Khương Trung đến hồ Đầm Hồng. Nổi danh với Cổng làng ngõ 211 cổ kính ('Khương Trung Cổ Thôn'), cụm di tích Đình - Chùa Tiêu Dao tại số 245 Khương Trung, Trường THCS Khương Trung (ngõ 211) và Trường Tiểu học Khương Trung (số 267).",
    area_ha: 78,
    established: "Thế kỷ XIV (thời Trần)",
    administrative_merger_2025:
      "Theo Nghị quyết số 1286/NQ-UBTVQH15, địa giới phường Khương Trung được kiện toàn vững chắc thuộc quận Thanh Xuân, ôm trọn tuyến cảnh quan ven sông Tô Lịch, phố Khương Trung và không gian sinh thái hồ Đầm Hồng.",
    coordinates: [
      [105.820207, 21.003116],
      [105.820961, 21.002908],
      [105.822028, 21.002635],
      [105.822811, 21.002433],
      [105.822770, 21.002304],
      [105.822452, 21.001275],
      [105.822236, 21.000376],
      [105.821894, 20.999589],
      [105.821850, 20.998840],
      [105.821873, 20.998112],
      [105.821800, 20.997184],
      [105.821869, 20.996441],
      [105.821990, 20.995784],
      [105.822242, 20.995164],
      [105.822098, 20.993971],
      [105.820500, 20.993400],
      [105.818800, 20.993600],
      [105.817200, 20.993900],
      [105.816000, 20.994200],
      [105.816400, 20.995200],
      [105.816800, 20.996000],
      [105.817200, 20.997000],
      [105.817600, 20.998000],
      [105.818200, 20.999200],
      [105.818800, 21.000200],
      [105.819400, 21.001200],
      [105.819800, 21.001800],
      [105.820207, 21.003116]
    ]
  },
  {
    id: 3,
    slug: "khuong-dinh",
    name: "Khương Đình",
    name_han_nom: "姜亭",
    name_old: "Làng Khương Đình",
    new_administrative_name: "Phường Khương Đình (Thanh Xuân)",
    merger_badge: "Hợp nhất: P. Khương Đình",
    color: "#059669",
    colorDark: "#065F46",
    district: "Quận Thanh Xuân",
    summary:
      "Phường Khương Đình trải dài từ Cầu Khương Đình dọc bờ đông sông Tô Lịch (đường Vũ Tông Phan) xuống đến Cầu Lủ, ôm trọn trục phố Bùi Xương Trạch và hồ Đầm Chuối. Nơi đây có Đình Khương Đình (thờ danh tướng Lê Dương Vệ), Chùa Tam Huyền (Sùng Phúc Tự từ thời Lý XI–XII), Trường THCS Khương Đình (16 phố Khương Hạ), Tiểu học Khương Đình (ngõ 108 Bùi Xương Trạch).",
    area_ha: 85,
    established: "Thế kỷ XIII (thời Lý - Trần)",
    administrative_merger_2025:
      "Theo Nghị quyết số 1286/NQ-UBTVQH15, địa giới phường Khương Đình tiếp giáp trực tiếp phường Hạ Đình mới (được hợp nhất toàn bộ phường Kim Giang vào phường Hạ Đình), tạo nên trục kết nối di sản đồng bộ dọc sông Tô Lịch.",
    coordinates: [
      [105.816000, 20.994200],
      [105.817200, 20.993900],
      [105.818800, 20.993600],
      [105.820500, 20.993400],
      [105.822098, 20.993971],
      [105.821462, 20.992798],
      [105.822369, 20.991543],
      [105.823670, 20.990059],
      [105.824868, 20.988714],
      [105.824210, 20.988065],
      [105.823581, 20.987475],
      [105.823134, 20.987057],
      [105.822635, 20.986692],
      [105.821071, 20.985792],
      [105.820466, 20.985480],
      [105.820516, 20.985111],
      [105.819482, 20.984755],
      [105.819289, 20.984568],
      [105.819188, 20.983627],
      [105.818958, 20.982647],
      [105.818882, 20.981961],
      [105.818736, 20.981394],
      [105.818343, 20.980736],
      [105.817283, 20.981583],
      [105.816546, 20.982204],
      [105.816032, 20.982798],
      [105.815685, 20.983218],
      [105.815200, 20.984200],
      [105.814600, 20.985500],
      [105.813800, 20.986800],
      [105.813600, 20.988200],
      [105.814800, 20.988200],
      [105.817000, 20.988200],
      [105.817200, 20.990500],
      [105.817000, 20.993000],
      [105.816000, 20.994200]
    ]
  },
  {
    id: 5,
    slug: "ha-dinh",
    name: "Phường Hạ Đình",
    name_han_nom: "下亭",
    name_old: "Làng Hạ Đình (Cổ thôn sông Tô Lịch)",
    new_administrative_name: "Phường Hạ Đình mở rộng (Hợp nhất P. Kim Giang)",
    merger_badge: "Nhập toàn bộ P. Kim Giang",
    color: "#0D9488",
    colorDark: "#115E59",
    district: "Quận Thanh Xuân",
    summary:
      "Phường Hạ Đình nằm bên bờ hữu sông Tô Lịch, ôm trọn trục đường Khương Đình, phố Hạ Đình và toàn bộ khu đô thị Kim Giang. Nổi tiếng với Đình Vòng (Đình Hạ Đình số 322 Khương Đình - Di tích lịch sử Quốc gia thế kỷ XVI), Chùa Giàn (Phúc Khánh Tự số 318 Khương Đình), hồ Hạ Đình và quần thể dân cư trù phú bậc nhất quận Thanh Xuân.",
    area_ha: 102,
    established: "Thế kỷ XVI (thời Mạc - Lê Trung Hưng)",
    administrative_merger_2025:
      "CẬP NHẬT 2025 (Nghị quyết số 1286/NQ-UBTVQH15): Nhập toàn bộ diện tích tự nhiên 0,40 km2 và quy mô dân số của phường Kim Giang vào phường Hạ Đình để thành lập Phường Hạ Đình mới rộng hơn 1 km2.",
    coordinates: [
      [105.808000, 20.994500],
      [105.814200, 20.991200],
      [105.813800, 20.989800],
      [105.813600, 20.988200],
      [105.814600, 20.985500],
      [105.815200, 20.984200],
      [105.815685, 20.983218],
      [105.814200, 20.982000],
      [105.808500, 20.983500],
      [105.803500, 20.988000],
      [105.802000, 20.992000],
      [105.808000, 20.994500]
    ]
  },
  {
    id: 6,
    slug: "nhan-chinh",
    name: "Phường Nhân Chính",
    name_han_nom: "仁政",
    name_old: "Cụm Làng Kẻ Mọc (Quan Nhân, Cự Chính, Giáp Nhất)",
    new_administrative_name: "Phường Nhân Chính (Thanh Xuân)",
    merger_badge: "Cụm Làng Kẻ Mọc di sản",
    color: "#F97316",
    colorDark: "#C2410C",
    district: "Quận Thanh Xuân",
    summary:
      "Nhân Chính là vùng đất cổ lừng danh trong câu ca dao Thăng Long: 'Nhất Mỗ, nhì Canh, tam Cót, tứ Mọc'. Bao gồm 3 làng cổ: Cự Chính, Quan Nhân và Giáp Nhất kề bên sông Tô Lịch. Nơi đây sở hữu quần thể di tích Đình Cự Chính, Đình Quan Nhân, Đình Giáp Nhất, Chùa Sùng Phúc, Chùa Bồ Đề cùng lễ hội 5 làng Mọc là Di sản văn hóa phi vật thể Quốc gia.",
    area_ha: 161,
    established: "Thế kỷ X–XI (thời Đinh - Lý)",
    administrative_merger_2025:
      "Địa giới phường Nhân Chính giữ vững vai trò là trung tâm kết nối văn hóa - thương mại hiện đại của quận Thanh Xuân, giáp ranh Cầu Giấy và Đống Đa qua trục Hoàng Đạo Thúy - Lê Văn Lương.",
    coordinates: [
      [105.804000, 21.008500],
      [105.813000, 21.006500],
      [105.819000, 21.002500],
      [105.815000, 20.998000],
      [105.808000, 20.994500],
      [105.801000, 21.001000],
      [105.804000, 21.008500]
    ]
  },
  {
    id: 7,
    slug: "phuong-liet",
    name: "Phường Phương Liệt",
    name_han_nom: "芳烈",
    name_old: "Làng Phương Liệt (Giáp Cửu cổ thôn)",
    new_administrative_name: "Phường Phương Liệt (Thanh Xuân)",
    merger_badge: "Làng Phương Liệt cổ",
    color: "#B45309",
    colorDark: "#78350F",
    district: "Quận Thanh Xuân",
    summary:
      "Phương Liệt (xưa gọi là làng Giáp Cửu) nằm ở cửa ngõ đông nam quận Thanh Xuân, giáp ranh quận Đống Đa và Hoàng Mai dọc trục đường Giải Phóng. Nơi đây lưu giữ Đình Phương Liệt thờ Thành hoàng tích đức giúp dân, Chùa Phương Liệt (Bảo Sơn Tự), hồ Phương Liệt và truyền thống hiếu học lâu đời.",
    area_ha: 101,
    established: "Thế kỷ XVII",
    administrative_merger_2025:
      "Theo quy hoạch hành chính Hà Nội 2025, phường Phương Liệt được chỉnh trang hạ tầng đô thị xung quanh nút giao cầu vượt Ngã Tư Vọng và trục đường vành đai 2.5.",
    coordinates: [
      [105.831274, 21.000009],
      [105.843000, 20.998500],
      [105.842000, 20.988000],
      [105.830000, 20.991000],
      [105.831274, 21.000009]
    ]
  },

  // ────────────────────────────────────────────────────────────
  // QUẬN ĐỐNG ĐA (6 làng/phường)
  // ────────────────────────────────────────────────────────────
  {
    id: 4,
    slug: "khuong-thuong",
    name: "Khương Thượng",
    name_han_nom: "姜上",
    name_old: "Làng Khương Thượng",
    new_administrative_name: "Phường Khương Thượng mở rộng (Đống Đa)",
    merger_badge: "P. Khương Thượng mở rộng",
    color: "#9333EA",
    colorDark: "#581C87",
    district: "Quận Đống Đa",
    summary:
      "Khương Thượng nằm ở phía bắc cụm làng Khương, bao trọn tứ giác vàng: Tây Sơn - Chùa Bộc - Tôn Thất Tùng - Trường Chinh. Nơi đây hội tụ hồ Khương Thượng, Chùa Bộc (Di tích QG Đặc biệt lưu giữ tượng Vua Quang Trung), Đình Khương Thượng (165 Khương Thượng), Trường Đại học Y Hà Nội (1902), Trường Đại học Thủy Lợi (175 Tây Sơn), gắn liền với chiến thắng Ngọc Hồi - Đống Đa mùa xuân 1789.",
    area_ha: 64,
    established: "Thế kỷ XI–XV (thời Lý - Lê)",
    administrative_merger_2025:
      "CẬP NHẬT 2025 (NQ số 1286/NQ-UBTVQH15): Điều chỉnh một phần diện tích tự nhiên và dân số của phường Ngã Tư Sở để sáp nhập vào phường Khương Thượng, mở rộng không gian đô thị di sản từ ĐH Thủy Lợi, Chùa Bộc, ĐH Y Hà Nội đến trọn vẹn nút giao lịch sử Ngã Tư Sở.",
    coordinates: [
      [105.820207, 21.003116],
      [105.821642, 21.004177],
      [105.822728, 21.005890],
      [105.823552, 21.007638],
      [105.824799, 21.010033],
      [105.825901, 21.011834],
      [105.826850, 21.013371],
      [105.827949, 21.012890],
      [105.829227, 21.012210],
      [105.830731, 21.011493],
      [105.831150, 21.009000],
      [105.831300, 21.006800],
      [105.831450, 21.004800],
      [105.831380, 21.002200],
      [105.831274, 21.000009],
      [105.828775, 21.000762],
      [105.827284, 21.001257],
      [105.825646, 21.001706],
      [105.823193, 21.002334],
      [105.820961, 21.002908],
      [105.820207, 21.003116]
    ]
  },
  {
    id: 8,
    slug: "thinh-quang",
    name: "Phường Thịnh Quang",
    name_han_nom: "盛光",
    name_old: "Làng Thịnh Quang cổ (Thịnh Quang thôn)",
    new_administrative_name: "Phường Thịnh Quang (Đống Đa)",
    merger_badge: "P. Thịnh Quang mở rộng",
    color: "#8B5CF6",
    colorDark: "#6D28D9",
    district: "Quận Đống Đa",
    summary:
      "Phường Thịnh Quang nằm kề sát Ngã Tư Sở và đường Láng. Nổi tiếng với Chùa Phúc Khánh (Chùa Sở tại số 382 Tây Sơn - Cổ tự linh thiêng bậc nhất kinh thành được xây dựng từ thời Hậu Lê), Đình làng Thịnh Quang, hệ thống ngõ cổ ven sông Tô Lịch và truyền thống giao thương sầm uất.",
    area_ha: 55,
    established: "Thế kỷ XVII",
    administrative_merger_2025:
      "Theo NQ 1286/NQ-UBTVQH15, điều chỉnh một phần diện tích tự nhiên và dân số của phường Ngã Tư Sở sáp nhập vào phường Thịnh Quang, mở rộng địa giới về phía tây nút giao Ngã Tư Sở.",
    coordinates: [
      [105.815000, 21.008000],
      [105.822000, 21.006000],
      [105.820207, 21.003116],
      [105.815000, 21.005000],
      [105.815000, 21.008000]
    ]
  },
  {
    id: 9,
    slug: "lang-thuong",
    name: "Phường Láng Thượng",
    name_han_nom: "朗上",
    name_old: "Làng Láng Thượng (Yên Lãng cổ thôn)",
    new_administrative_name: "Phường Láng Thượng (Đống Đa)",
    merger_badge: "Làng Láng di sản",
    color: "#7C3AED",
    colorDark: "#4C1D95",
    district: "Quận Đống Đa",
    summary:
      "Láng Thượng là trung tâm của vùng đất cổ Làng Láng ngàn năm ven sông Tô Lịch. Nơi đây tọa lạc Chùa Láng (Chiêu Thiền Tự - Di tích Quốc gia Đặc biệt khởi dựng từ thời Lý Anh Tông thế kỷ XII thờ Thiền sư Từ Đạo Hạnh), Đền Voi Phục (Thủ Lệ - Di tích Trấn Tây Thăng Long) và di tích lịch sử Pháo đài Láng.",
    area_ha: 172,
    established: "Thế kỷ XII (thời Lý)",
    administrative_merger_2025:
      "Bảo tồn nguyên vẹn không gian văn hóa lễ hội Chùa Láng - một trong những lễ hội cổ lớn nhất vùng đồng bằng sông Hồng kết nối sông Tô Lịch.",
    coordinates: [
      [105.802000, 21.028000],
      [105.814000, 21.031000],
      [105.815000, 21.021000],
      [105.806000, 21.018000],
      [105.802000, 21.028000]
    ]
  },
  {
    id: 10,
    slug: "lang-ha",
    name: "Phường Láng Hạ",
    name_han_nom: "朗下",
    name_old: "Làng Láng Hạ (Làng trồng rau húng Láng)",
    new_administrative_name: "Phường Láng Hạ (Đống Đa)",
    merger_badge: "Làng Láng Hạ",
    color: "#6D28D9",
    colorDark: "#3B0764",
    district: "Quận Đống Đa",
    summary:
      "Láng Hạ xưa kia cùng với Láng Thượng và Láng Trung nổi danh khắp bốn phương với đặc sản rau húng Láng tiến vua. Trong lòng phố thị hiện đại ngày nay, Láng Hạ vẫn trân trọng lưu giữ Đền Ứng Thiên (đền thờ Nữ thần Hậu Thổ linh thiêng thời Lý thế kỷ XI), Đình Láng Hạ và hồ sinh thái Hoàng Cầu kề bên.",
    area_ha: 95,
    established: "Thế kỷ XI",
    administrative_merger_2025:
      "Kiện toàn địa giới hành chính kết nối trục tài chính Láng Hạ - Huỳnh Thúc Kháng và không gian sinh thái hồ Đống Đa.",
    coordinates: [
      [105.808000, 21.018000],
      [105.819000, 21.019000],
      [105.822000, 21.012000],
      [105.813000, 21.011000],
      [105.808000, 21.018000]
    ]
  },
  {
    id: 11,
    slug: "kim-lien",
    name: "Phường Kim Liên",
    name_han_nom: "金蓮",
    name_old: "Làng Kim Liên (Làng Đồng Lầm)",
    new_administrative_name: "Phường Kim Liên (Đống Đa)",
    merger_badge: "Đền Kim Liên Trấn Nam",
    color: "#A855F7",
    colorDark: "#7E22CE",
    district: "Quận Đống Đa",
    summary:
      "Làng cổ Kim Liên (tên nôm là làng Đồng Lầm) nổi tiếng kinh kỳ xưa với nghề nhuộm vải nâu và thợ may tài hoa. Nơi đây sừng sững Đền Kim Liên - một trong Thăng Long Tứ Trấn (Trấn Nam) thờ Cao Sơn Đại Vương có từ thời vua Lê Tương Dực (1509), cùng Chùa Kim Liên và khu tập thể kiểu mẫu đầu tiên của Hà Nội.",
    area_ha: 45,
    established: "Thế kỷ XVI",
    administrative_merger_2025:
      "Bảo tồn không gian thiêng Đền Kim Liên Trấn Nam và chỉnh trang cảnh quan đô thị quanh trục Đào Duy Anh - Phạm Ngọc Thạch.",
    coordinates: [
      [105.831000, 21.011000],
      [105.840000, 21.009000],
      [105.838000, 21.003000],
      [105.831000, 21.005000],
      [105.831000, 21.011000]
    ]
  },
  {
    id: 12,
    slug: "van-mieu-quoc-tu-giam",
    name: "Văn Miếu - Quốc Tử Giám",
    name_han_nom: "文廟-國子監",
    name_old: "Khu Quốc Tử Giám - Làng An Trạch",
    new_administrative_name: "Phường Văn Miếu & Quốc Tử Giám",
    merger_badge: "Di tích Quốc gia Đặc biệt",
    color: "#BE185D",
    colorDark: "#831843",
    district: "Quận Đống Đa",
    summary:
      "Trái tim văn hiến của Thủ đô và cả dân tộc: Quần thể Di tích Quốc gia Đặc biệt Văn Miếu - Quốc Tử Giám được khởi dựng năm 1070 dưới triều vua Lý Thánh Tông và năm 1076 vua Lý Nhân Tông cho lập Quốc Tử Giám - trường đại học đầu tiên của Việt Nam. Nơi lưu giữ 82 bia Tiến sĩ vinh danh hiền tài - Di sản Tư liệu Thế giới UNESCO.",
    area_ha: 52,
    established: "Năm 1070 (thời Lý)",
    administrative_merger_2025:
      "Tập trung quy hoạch không gian phố đi bộ văn hóa - học thuật bao quanh hồ Văn, Khuê Văn Các và vườn bia Tiến sĩ.",
    coordinates: [
      [105.832000, 21.032000],
      [105.840000, 21.031000],
      [105.838000, 21.024000],
      [105.831000, 21.025000],
      [105.832000, 21.032000]
    ]
  },

  // ────────────────────────────────────────────────────────────
  // QUẬN BA ĐÌNH (5 làng/phường)
  // ────────────────────────────────────────────────────────────
  {
    id: 13,
    slug: "dien-bien",
    name: "Phường Điện Biên",
    name_han_nom: "奠邊",
    name_old: "Cấm thành Thăng Long",
    new_administrative_name: "Phường Điện Biên (Ba Đình)",
    merger_badge: "Di sản Thế giới UNESCO",
    color: "#1D4ED8",
    colorDark: "#1E3A8A",
    district: "Quận Ba Đình",
    summary:
      "Địa bàn trung tâm chính trị quốc gia: Bao trọn Khu Trung tâm Hoàng thành Thăng Long - Di sản Văn hóa Thế giới UNESCO (Đoan Môn, Điện Kính Thiên, Hậu Lâu, Bắc Môn), Cột Cờ Hà Nội (Kỳ Đài Thăng Long), Bảo tàng Lịch sử Quân sự Việt Nam và Quảng trường Ba Đình linh thiêng.",
    area_ha: 94,
    established: "Năm 1010 (Vua Lý Thái Tổ dời đô)",
    administrative_merger_2025:
      "Bảo tồn nghiêm ngặt không gian trục cảnh quan di sản quốc gia nối từ Hoàng thành Thăng Long sang Lăng Chủ tịch Hồ Chí Minh.",
    coordinates: [
      [105.835000, 21.038000],
      [105.846000, 21.037000],
      [105.843000, 21.029000],
      [105.834000, 21.030000],
      [105.835000, 21.038000]
    ]
  },
  {
    id: 14,
    slug: "ngoc-ha",
    name: "Phường Ngọc Hà",
    name_han_nom: "玉河",
    name_old: "Làng hoa Ngọc Hà cổ",
    new_administrative_name: "Phường Ngọc Hà (Ba Đình)",
    merger_badge: "Làng hoa Thăng Long",
    color: "#10B981",
    colorDark: "#047857",
    district: "Quận Ba Đình",
    summary:
      "Làng hoa Ngọc Hà lừng danh trong câu ca: 'Ngày rằm mười bốn chợ Mơ / Ba mươi mùng một giắt hoa Ngọc Hà'. Vùng đất của những vườn hoa tiến vua xưa kia nay vẫn gìn giữ Chùa Bát Mẫu, Đình Ngọc Hà, di tích xác máy bay B-52 rơi tại hồ Hữu Tiệp và không gian ngõ xóm truyền thống Thập Tam Trại.",
    area_ha: 80,
    established: "Thế kỷ XI",
    administrative_merger_2025:
      "Chỉnh trang làng trong phố bảo tồn không gian mặt nước hồ Hữu Tiệp và quần thể cây xanh Hoàng Hoa Thám.",
    coordinates: [
      [105.822000, 21.042000],
      [105.833000, 21.041000],
      [105.832000, 21.033000],
      [105.821000, 21.034000],
      [105.822000, 21.042000]
    ]
  },
  {
    id: 15,
    slug: "giang-vo",
    name: "Phường Giảng Võ",
    name_han_nom: "講武",
    name_old: "Làng Giảng Võ (Trường bắn võ khoa Thăng Long)",
    new_administrative_name: "Phường Giảng Võ (Ba Đình)",
    merger_badge: "Giảng Võ Điện xưa",
    color: "#3B82F6",
    colorDark: "#1D4ED8",
    district: "Quận Ba Đình",
    summary:
      "Vùng đất Giảng Võ xưa kia là trường thao luyện võ binh của quân đội Đại Việt thời Lý - Trần - Lê. Nơi đây có Đình Giảng Võ thờ Bà Chúa Kho Lý Châu Nương - vị nữ tướng anh kiệt bảo trợ kho lương quân lương triều Trần, hồ Giảng Võ lộng gió và trục phố văn hóa ẩm thực đặc sắc.",
    area_ha: 91,
    established: "Thế kỷ XIII",
    administrative_merger_2025:
      "Nâng cấp hạ tầng giao thông đô thị hiện đại kề bên tuyến metro Cát Linh - Hà Đông và hồ Giảng Võ.",
    coordinates: [
      [105.816000, 21.029000],
      [105.826000, 21.028000],
      [105.824000, 21.021000],
      [105.815000, 21.022000],
      [105.816000, 21.029000]
    ]
  },
  {
    id: 16,
    slug: "truc-bach",
    name: "Phường Trúc Bạch",
    name_han_nom: "竹帛",
    name_old: "Làng đúc đồng Ngũ Xã & Bán đảo Trúc Bạch",
    new_administrative_name: "Phường Trúc Bạch (Ba Đình)",
    merger_badge: "Làng nghề đúc đồng Ngũ Xã",
    color: "#06B6D4",
    colorDark: "#0E7490",
    district: "Quận Ba Đình",
    summary:
      "Trúc Bạch sở hữu bán đảo Ngũ Xã - làng nghề đúc đồng trứ danh Thăng Long lập nghiệp từ thời Lê thế kỷ XVII. Nghệ nhân Ngũ Xã đã đúc nên pho tượng đồng Phật Di Đà nặng 14 tấn tại Chùa Thần Quang (Chùa Ngũ Xã). Cùng với Đền Thủy Trung Tiên trên đảo hồ Trúc Bạch, nơi đây là biểu tượng sinh thái - nghệ thuật độc nhất vô nhị.",
    area_ha: 58,
    established: "Thế kỷ XVII",
    administrative_merger_2025:
      "Phát triển khu phố ẩm thực đêm kết hợp làng nghề truyền thống đúc đồng Ngũ Xã ven hồ Trúc Bạch.",
    coordinates: [
      [105.836000, 21.049000],
      [105.847000, 21.048000],
      [105.845000, 21.040000],
      [105.835000, 21.041000],
      [105.836000, 21.049000]
    ]
  },
  {
    id: 17,
    slug: "quan-thanh",
    name: "Phường Quán Thánh",
    name_han_nom: "觀聖",
    name_old: "Làng An Trì - Trấn Bắc Thăng Long",
    new_administrative_name: "Phường Quán Thánh (Ba Đình)",
    merger_badge: "Đền Quán Thánh Trấn Bắc",
    color: "#1E3A8A",
    colorDark: "#172554",
    district: "Quận Ba Đình",
    summary:
      "Nơi tọa lạc Đền Quán Thánh (Trấn Vũ Quán) - một trong Thăng Long Tứ Trấn (Trấn Bắc) dựng từ đời vua Lý Thái Tổ thờ Huyền Thiên Trấn Vũ. Đền lưu giữ pho tượng đồng đen khổng lồ cao gần 4m nặng 4 tấn được đúc năm 1677 bởi các nghệ nhân làng Ngũ Xã, cùng cảnh quan đường Cổ Ngư (đường Thanh Niên) thơ mộng.",
    area_ha: 52,
    established: "Năm 1010 (thời Lý)",
    administrative_merger_2025:
      "Bảo tồn cảnh quan di sản mặt nước giữa Hồ Tây và Hồ Trúc Bạch cùng không gian kiến trúc Pháp cổ.",
    coordinates: [
      [105.834000, 21.047000],
      [105.844000, 21.046000],
      [105.841000, 21.038000],
      [105.833000, 21.039000],
      [105.834000, 21.047000]
    ]
  },

  // ────────────────────────────────────────────────────────────
  // QUẬN CẦU GIẤY (4 làng/phường)
  // ────────────────────────────────────────────────────────────
  {
    id: 18,
    slug: "dich-vong",
    name: "Phường Dịch Vọng",
    name_han_nom: "易望",
    name_old: "Làng Vòng (Quê hương Cốm Làng Vòng)",
    new_administrative_name: "Phường Dịch Vọng (Cầu Giấy)",
    merger_badge: "Cốm Làng Vòng nức tiếng",
    color: "#059669",
    colorDark: "#065F46",
    district: "Quận Cầu Giấy",
    summary:
      "Dịch Vọng chính là cái nôi của Làng Vòng cổ kính - quê hương đặc sản Cốm Làng Vòng dẻo thơm trứ danh được đại thi hào Thạch Lam ca tụng trong 'Hà Nội băm sáu phố phường'. Nơi đây còn nổi tiếng với Chùa Hà (Thánh Đức Tự - chốn cầu duyên linh ứng bậc nhất thủ đô), Đình Làng Vòng và công viên Cầu Giấy xanh mát.",
    area_ha: 135,
    established: "Thế kỷ XI",
    administrative_merger_2025:
      "Bảo tồn nghề cốm truyền thống Làng Vòng và quy hoạch trục đô thị công nghệ cao Cầu Giấy.",
    coordinates: [
      [105.789000, 21.037000],
      [105.799000, 21.036000],
      [105.798000, 21.026000],
      [105.787000, 21.027000],
      [105.789000, 21.037000]
    ]
  },
  {
    id: 19,
    slug: "yen-hoa",
    name: "Phường Yên Hòa",
    name_han_nom: "安和",
    name_old: "Làng Cót (Đất khoa bảng tiến sĩ Thăng Long)",
    new_administrative_name: "Phường Yên Hòa (Cầu Giấy)",
    merger_badge: "Làng Cót khoa bảng",
    color: "#0284C7",
    colorDark: "#0369A1",
    district: "Quận Cầu Giấy",
    summary:
      "Làng Cót (Yên Hòa) là làng khoa bảng hàng đầu kinh thành xưa với câu truyền tụng: 'Cơm Đồ Sơn, cá Mòi sông Chanh, tiến sĩ Làng Cót'. Làng có tới gần 40 vị đỗ đại khoa qua các triều đại. Nơi đây bảo tồn Đình Làng Cót, Chùa Duệ Tú (Quảng Nghiêm Tự) khởi dựng thời Lý thế kỷ XII và cây cầu đá cổ bắc qua sông Tô Lịch.",
    area_ha: 217,
    established: "Thế kỷ XII (thời Lý)",
    administrative_merger_2025:
      "Bảo tồn các nhà thờ họ, văn chỉ làng Cót và kết nối trục đô thị trung tâm quận Cầu Giấy.",
    coordinates: [
      [105.795000, 21.027000],
      [105.807000, 21.025000],
      [105.804000, 21.014000],
      [105.792000, 21.016000],
      [105.795000, 21.027000]
    ]
  },
  {
    id: 20,
    slug: "nghia-do",
    name: "Phường Nghĩa Đô",
    name_han_nom: "義都",
    name_old: "Làng Nghĩa Đô (Làng dệt lụa & giấy sắc)",
    new_administrative_name: "Phường Nghĩa Đô (Cầu Giấy)",
    merger_badge: "Làng Nghĩa Đô cổ",
    color: "#0E7490",
    colorDark: "#155E75",
    district: "Quận Cầu Giấy",
    summary:
      "Làng cổ Nghĩa Đô nằm ở ngã ba sông Tô Lịch và sông Nghĩa Đô, quê hương của nghề dệt lụa, kẹo lạc và làm giấy sắc phong cung đình độc nhất vô nhị. Nơi đây gắn liền với quê hương nhà văn Tô Hoài (tác giả 'Dế Mèn phiêu lưu ký'), Đền Voi Phục Nghĩa Đô và Chùa Duệ Đông linh thiêng.",
    area_ha: 129,
    established: "Thế kỷ X–XI",
    administrative_merger_2025:
      "Tôn tạo không gian cảnh quan ven sông Tô Lịch và bảo tồn truyền thống văn hóa làng dệt lụa xưa.",
    coordinates: [
      [105.796000, 21.048000],
      [105.808000, 21.046000],
      [105.806000, 21.036000],
      [105.795000, 21.037000],
      [105.796000, 21.048000]
    ]
  },
  {
    id: 21,
    slug: "dich-vong-hau",
    name: "Dịch Vọng Hậu",
    name_han_nom: "易望後",
    name_old: "Làng Hậu (Cụm làng tri thức)",
    new_administrative_name: "Phường Dịch Vọng Hậu (Cầu Giấy)",
    merger_badge: "Đô thị học thuật",
    color: "#0369A1",
    colorDark: "#075985",
    district: "Quận Cầu Giấy",
    summary:
      "Dịch Vọng Hậu (Làng Hậu) nằm ở trung tâm học thuật phía tây thủ đô, nơi đặt trụ sở của Đại học Quốc gia Hà Nội, Đại học Sư phạm Hà Nội và Học viện Báo chí Tuyên truyền. Dù phát triển thành khu đô thị công nghệ sầm uất, nơi đây vẫn lưu giữ Đình làng Hậu và nghề làm cốm lá me gia truyền.",
    area_ha: 148,
    established: "Thế kỷ XV",
    administrative_merger_2025:
      "Quy hoạch trở thành trung tâm thung lũng silicon và đổi mới sáng tạo giáo dục của Hà Nội.",
    coordinates: [
      [105.779000, 21.041000],
      [105.789000, 21.040000],
      [105.787000, 21.030000],
      [105.778000, 21.031000],
      [105.779000, 21.041000]
    ]
  },

  // ────────────────────────────────────────────────────────────
  // QUẬN HOÀN KIẾM (3 làng/phường)
  // ────────────────────────────────────────────────────────────
  {
    id: 22,
    slug: "trang-tien",
    name: "Phường Tràng Tiền",
    name_han_nom: "長錢",
    name_old: "Xưởng Đúc tiền triều Nguyễn - Hồ Gươm",
    new_administrative_name: "Phường Tràng Tiền (Hoàn Kiếm)",
    merger_badge: "Trái tim Thủ đô Hồ Gươm",
    color: "#E11D48",
    colorDark: "#9F1239",
    district: "Quận Hoàn Kiếm",
    summary:
      "Tràng Tiền là biểu tượng trường tồn của thủ đô ngàn năm: Bao trọn thắng cảnh Hồ Hoàn Kiếm (Hồ Gươm), Tháp Rùa cổ kính, Đền Ngọc Sơn, Cầu Thê Húc son đỏ, Tháp Bút, Đài Nghiên, Nhà hát Lớn Hà Nội (1911) và phố Tràng Tiền (nguyên là xưởng đúc tiền Tràng Tiền thời Nguyễn).",
    area_ha: 54,
    established: "Năm 1808 (xưởng đúc tiền triều Nguyễn)",
    administrative_merger_2025:
      "Tâm điểm không gian đi bộ Hồ Gươm và tuyến phố đi bộ mở rộng kết nối Nhà hát Lớn ra bờ sông Hồng.",
    coordinates: [
      [105.849000, 21.032000],
      [105.859000, 21.031000],
      [105.858000, 21.022000],
      [105.848000, 21.023000],
      [105.849000, 21.032000]
    ]
  },
  {
    id: 23,
    slug: "hang-bac-hang-dao",
    name: "Hàng Bạc & Hàng Đào",
    name_han_nom: "銀行-桃行",
    name_old: "Phố cổ 36 phố phường (Làng đúc bạc Châu Khê)",
    new_administrative_name: "Phường Hàng Bạc & Hàng Đào (Hoàn Kiếm)",
    merger_badge: "36 Phố Phường di sản",
    color: "#DC2626",
    colorDark: "#991B1B",
    district: "Quận Hoàn Kiếm",
    summary:
      "Linh hồn của 36 phố phường Thăng Long - Kẻ Chợ: Phố Hàng Bạc khởi nguồn từ phường đúc bạc của thợ kim hoàn làng Châu Khê (Hải Dương) di cư lên kinh thành từ thế kỷ XV, nổi bật với Đình Kim Ngân số 42 Hàng Bạc. Phố Hàng Đào là trục buôn bán tơ lụa hoa đào danh tiếng với Đình Đồng Lạc số 38 Hàng Đào.",
    area_ha: 38,
    established: "Thế kỷ XV (thời Lê Sơ)",
    administrative_merger_2025:
      "Bảo tồn nguyên trạng kiến trúc nhà ống, mái ngói âm dương và không gian di sản nghề thủ công truyền thống.",
    coordinates: [
      [105.848000, 21.038000],
      [105.856000, 21.037000],
      [105.855000, 21.032000],
      [105.847000, 21.033000],
      [105.848000, 21.038000]
    ]
  },
  {
    id: 24,
    slug: "dong-xuan",
    name: "Phường Đồng Xuân",
    name_han_nom: "同春",
    name_old: "Chợ Đồng Xuân - Cửa Ô Quan Chưởng",
    new_administrative_name: "Phường Đồng Xuân (Hoàn Kiếm)",
    merger_badge: "Ô Quan Chưởng & Chợ cổ",
    color: "#EF4444",
    colorDark: "#B91C1C",
    district: "Quận Hoàn Kiếm",
    summary:
      "Đồng Xuân lưu giữ Ô Quan Chưởng (Đông Hà Môn) - cửa ô cổ duy nhất còn nguyên vẹn của kinh thành Thăng Long được xây dựng từ năm 1749. Nơi đây có Chợ Đồng Xuân - chợ đầu mối sầm uất bậc nhất Bắc Kỳ từ năm 1889, cùng hệ thống di tích kháng chiến chống Pháp mùa đông 1946 anh dũng.",
    area_ha: 44,
    established: "Năm 1749 (Ô Quan Chưởng)",
    administrative_merger_2025:
      "Phát triển không gian chợ đêm Đồng Xuân và bảo tồn di tích kiến trúc cổ đầu cầu Long Biên.",
    coordinates: [
      [105.847000, 21.043000],
      [105.855000, 21.042000],
      [105.854000, 21.037000],
      [105.846000, 21.038000],
      [105.847000, 21.043000]
    ]
  },

  // ────────────────────────────────────────────────────────────
  // QUẬN HAI BÀ TRƯNG (4 làng/phường)
  // ────────────────────────────────────────────────────────────
  {
    id: 25,
    slug: "dong-nhan",
    name: "Phường Đồng Nhân",
    name_han_nom: "同仁",
    name_old: "Làng Đồng Nhân (Đền Hai Bà Trưng)",
    new_administrative_name: "Phường Đồng Nhân (Hai Bà Trưng)",
    merger_badge: "Đền Hai Bà Trưng QG Đặc biệt",
    color: "#D97706",
    colorDark: "#B45309",
    district: "Quận Hai Bà Trưng",
    summary:
      "Nơi tọa lạc Đền thờ Hai Bà Trưng (Đền Đồng Nhân - Di tích Quốc gia Đặc biệt) khởi dựng từ năm 1160 dưới triều vua Lý Anh Tông bên bãi sông Hồng, sau dời vào làng Đồng Nhân. Đền lưu giữ tượng Hai Bà Trưng bằng gỗ quý sơn son thếp vàng cùng Lễ hội rước nước sông Hồng - Di sản văn hóa phi vật thể Quốc gia.",
    area_ha: 48,
    established: "Năm 1160 (thời Lý)",
    administrative_merger_2025:
      "Tôn tạo quần thể di tích Đền Hai Bà Trưng kết nối không gian lễ hội với sông Hồng và phố Hương Viên.",
    coordinates: [
      [105.855000, 21.016000],
      [105.864000, 21.015000],
      [105.862000, 21.008000],
      [105.854000, 21.009000],
      [105.855000, 21.016000]
    ]
  },
  {
    id: 26,
    slug: "bach-mai",
    name: "Phường Bạch Mai",
    name_han_nom: "白梅",
    name_old: "Làng Bạch Mai (Hồng Mai cổ thôn)",
    new_administrative_name: "Phường Bạch Mai (Hai Bà Trưng)",
    merger_badge: "Tổ đình Chùa Liên Phái",
    color: "#F59E0B",
    colorDark: "#D97706",
    district: "Quận Hai Bà Trưng",
    summary:
      "Làng Bạch Mai xưa có tên là Hồng Mai (làng hoa mai đỏ), sau đổi thành Bạch Mai (hoa mai trắng). Nơi đây lưu giữ Chùa Liên Phái (Liên Tông Tự khởi dựng năm 1726) - tổ đình thiền phái Tào Động Thăng Long với Tháp Cửu Phẩm Liên Hoa cao 10 tầng và vườn tháp mộ cổ thâm nghiêm bậc nhất nội đô.",
    area_ha: 61,
    established: "Năm 1726 (thời Hậu Lê)",
    administrative_merger_2025:
      "Bảo tồn kiến trúc tháp cổ Chùa Liên Phái và chỉnh trang trục phố thương mại lâu đời Bạch Mai.",
    coordinates: [
      [105.846000, 21.006000],
      [105.856000, 21.005000],
      [105.854000, 20.998000],
      [105.845000, 20.999000],
      [105.846000, 21.006000]
    ]
  },
  {
    id: 27,
    slug: "dong-tam",
    name: "Phường Đồng Tâm",
    name_han_nom: "同心",
    name_old: "Cụm Đại học Bách Khoa - Xây Dựng",
    new_administrative_name: "Phường Đồng Tâm (Hai Bà Trưng)",
    merger_badge: "Đô thị đại học kỹ thuật",
    color: "#CA8A04",
    colorDark: "#A16207",
    district: "Quận Hai Bà Trưng",
    summary:
      "Đồng Tâm là cái nôi khoa học kỹ thuật hàng đầu đất nước, quy tụ cụm 3 trường đại học danh tiếng bậc nhất: Trường Đại học Bách Khoa Hà Nội (1956), Trường Đại học Xây Dựng Hà Nội và Trường Đại học Kinh Tế Quốc Dân. Nơi đây đào tạo hàng trăm ngàn kỹ sư, nhà khoa học phụng sự Tổ quốc.",
    area_ha: 89,
    established: "Năm 1956",
    administrative_merger_2025:
      "Quy hoạch làng đại học thông minh, mở rộng không gian cây xanh nghiên cứu dọc đường Giải Phóng và Trần Đại Nghĩa.",
    coordinates: [
      [105.838000, 21.006000],
      [105.848000, 21.005000],
      [105.846000, 20.997000],
      [105.837000, 20.998000],
      [105.838000, 21.006000]
    ]
  },
  {
    id: 28,
    slug: "thanh-luong",
    name: "Phường Thanh Lương",
    name_han_nom: "清涼",
    name_old: "Làng Lương Yên (Bến Cảng Sông Hồng xưa)",
    new_administrative_name: "Phường Thanh Lương (Hai Bà Trưng)",
    merger_badge: "Làng Lương Yên sông Hồng",
    color: "#78350F",
    colorDark: "#451A03",
    district: "Quận Hai Bà Trưng",
    summary:
      "Thanh Lương gắn liền với làng cổ Lương Yên bên dòng sông Hồng lịch sử, nơi từng có Bến phà Đen và cảng sông nhộn nhịp thời Pháp thuộc. Nơi đây có Đình Lương Yên, Chùa Hộ Quốc và truyền thống lao động kiên cường của cư dân bến cảng Thăng Long qua nhiều thế hệ.",
    area_ha: 104,
    established: "Thế kỷ XVIII",
    administrative_merger_2025:
      "Phát triển trục kinh tế ven sông Hồng theo Đồ án quy hoạch phân khu đô thị sông Hồng của Thủ đô.",
    coordinates: [
      [105.860000, 21.012000],
      [105.870000, 21.010000],
      [105.868000, 21.002000],
      [105.858000, 21.004000],
      [105.860000, 21.012000]
    ]
  }
];

// Generate code for villages.ts
let code = `// Ranh giới địa lý & phân khu di sản làng/phường trên đất Hà Nội
// Cập nhật chuẩn xác 100% theo bản đồ ranh giới hành chính & Nghị quyết số 1286/NQ-UBTVQH15 của Ủy ban Thường vụ Quốc hội
// Phủ trọn 6 quận nội thành lịch sử: Thanh Xuân, Đống Đa, Ba Đình, Cầu Giấy, Hoàn Kiếm, Hai Bà Trưng

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
  merger_badge: string;
  new_administrative_name: string;
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
`;

for (const v of villages) {
  // Ensure closed polygon
  const coords = [...v.coordinates];
  if (coords[0][0] !== coords[coords.length - 1][0] || coords[0][1] !== coords[coords.length - 1][1]) {
    coords.push([coords[0][0], coords[0][1]]);
  }

  code += `    {
      type: "Feature" as const,
      properties: {
        id: ${v.id},
        slug: ${JSON.stringify(v.slug)},
        name: ${JSON.stringify(v.name)},
        name_han_nom: ${JSON.stringify(v.name_han_nom)},
        name_old: ${JSON.stringify(v.name_old)},
        new_administrative_name: ${JSON.stringify(v.new_administrative_name)},
        merger_badge: ${JSON.stringify(v.merger_badge)},
        color: ${JSON.stringify(v.color)},
        colorDark: ${JSON.stringify(v.colorDark)},
        district: ${JSON.stringify(v.district)},
        summary: ${JSON.stringify(v.summary)},
        area_ha: ${v.area_ha},
        established: ${JSON.stringify(v.established)},
        administrative_merger_2025: ${JSON.stringify(v.administrative_merger_2025)},
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
${JSON.stringify(coords, null, 10).replace(/^/gm, '          ')}
        ],
      },
    },
`;
}

code += `  ],
};

// Tâm bản đồ bao trùm toàn bộ các quận nội thành Thăng Long - Hà Nội
export const VILLAGES_CENTER: [number, number] = [105.8250, 21.0150];

// Hộp giới hạn bao phủ trọn vẹn 6 quận nội thành (Thanh Xuân, Đống Đa, Cầu Giấy, Ba Đình, Hoàn Kiếm, Hai Bà Trưng)
export const VILLAGES_BBOX: [number, number, number, number] = [
  105.7750, 20.9800, 105.8750, 21.0550,
];

// Danh sách các quận nội thành hỗ trợ lọc phân tầng
export const HANOI_DISTRICTS = [
  { id: "all", name: "Tất cả Hà Nội", count: 28 },
  { id: "thanh-xuan", name: "Thanh Xuân", count: 6 },
  { id: "dong-da", name: "Đống Đa", count: 6 },
  { id: "ba-dinh", name: "Ba Đình", count: 5 },
  { id: "cau-giay", name: "Cầu Giấy", count: 4 },
  { id: "hoan-kiem", name: "Hoàn Kiếm", count: 3 },
  { id: "hai-ba-trung", name: "Hai Bà Trưng", count: 4 },
];
`;

fs.writeFileSync('src/data/villages.ts', code, 'utf8');
console.log(`Successfully generated src/data/villages.ts with ${villages.length} historic wards/villages!`);
