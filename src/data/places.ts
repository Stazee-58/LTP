// Danh mục di tích văn hóa, lịch sử và thiết chế giáo dục 4 làng cổ
// Đã chuẩn hóa tọa độ GPS chính xác thực địa tại Hà Nội

export const SAMPLE_PLACES = [
  // ============================================================
  // LÀNG KHƯƠNG HẠ (Quận Thanh Xuân)
  // ============================================================
  {
    id: 1,
    village_slug: "khuong-ha",
    slug: "dinh-khuong-ha",
    name: "Đình Khương Hạ",
    name_han_nom: "亭姜下",
    category: "dinh",
    lat: 20.9926,
    lng: 105.8162,
    built_year: 1680,
    deity: "Thành Hoàng làng & Danh tướng thời Lê",
    rank: "Di tích lịch sử - kiến trúc cấp Quốc gia",
    description:
      "Đình Khương Hạ (còn gọi là đình Gừng) tọa lạc tại số 4 phố Khương Hạ, bên bờ hữu sông Tô Lịch. Đình thờ Thành Hoàng bảo trợ dân làng và danh tướng thời Lê Sơ. Kiến trúc mang đậm dấu ấn phong cách đình làng đồng bằng Bắc Bộ với mái ngói âm dương, vì kèo chạm khắc rồng phượng tinh xảo cùng hồ bán nguyệt phía trước.",
    description_en:
      "Khuong Ha communal house (also known as Gung Communal House), located at No. 4 Khuong Ha Street on the right bank of the To Lich River, is dedicated to the village guardian deity. Built in 1680 and designated a National Historical Monument, it features classical Northern Vietnamese wooden architectural joinery with dragon motifs and a reflective crescent pond.",
    festivals: ["Lễ hội truyền thống rước kiệu mùng 10 đến 12 tháng Hai âm lịch"],
    images: [
      {
        url: "/images/village_gate.jpg",
        caption: "Không gian cổ kính Đình Khương Hạ",
        credit: "Khảo sát thực địa 2024",
        year: 2024,
      },
    ],
    sources: [
      { citation: "Đồng Khánh địa dư chí & Hà Nội danh tích, NXB Hà Nội, 2008", url: null, reliability: "cao" },
    ],
    confidence: 5,
  },
  {
    id: 2,
    village_slug: "khuong-ha",
    slug: "chua-khuong-ha",
    name: "Chùa Khương Hạ (Phụng Lộc Tự)",
    name_han_nom: "奉祿寺",
    category: "chua",
    lat: 20.9908,
    lng: 105.8169,
    built_year: 1690,
    deity: "Phật Thích Ca Mâu Ni & Tam Tòa Thánh Mẫu",
    rank: "Di tích kiến trúc nghệ thuật cấp Quốc gia",
    description:
      "Chùa Phụng Lộc (chùa Khương Hạ) tọa lạc tại số 67 phố Khương Hạ. Chùa được khởi dựng từ thế kỷ XVII, lưu giữ hệ thống tượng Phật cổ bằng gỗ sơn son thếp vàng, chuông đồng đúc năm Cảnh Hưng và các văn bia ghi lại công đức trùng tu qua các triều đại.",
    description_en:
      "Phung Loc Pagoda (Khuong Ha Pagoda) at No. 67 Khuong Ha Street dates back to the late 17th century. A designated National Architectural Monument, it preserves rare lacquered wooden Buddhist statues, ancient bronze bells cast during the Canh Hung era, and stone stelae commemorating community restorations.",
    festivals: ["Lễ Phật Đản mùng 8 tháng Tư", "Lễ Vu Lan tháng Bảy âm lịch"],
    images: [
      {
        url: "/images/historic_map.jpg",
        caption: "Khuôn viên chùa Phụng Lộc",
        credit: "Tư liệu di sản",
        year: 2023,
      },
    ],
    sources: [{ citation: "Văn bia chùa Phụng Lộc & Địa chí Thanh Xuân, 2015", url: null, reliability: "cao" }],
    confidence: 5,
  },
  {
    id: 3,
    village_slug: "khuong-ha",
    slug: "gieng-co-khuong-ha",
    name: "Giếng cổ làng Khương Hạ",
    name_han_nom: "姜下古井",
    category: "gieng",
    lat: 20.9918,
    lng: 105.8145,
    built_year: 1750,
    deity: "Long Vương bảo trợ nguồn nước",
    rank: "Di sản ký ức dân gian",
    description:
      "Nằm tại khu dân cư ngõ 29 phố Khương Hạ, giếng cổ được xây ghép bằng đá ong và gạch cổ tròn đều. Nguồn nước mạch ngầm mát lành từng nuôi dưỡng bao thế hệ dân làng Khương Hạ trước khi có hệ thống cấp nước máy đô thị.",
    description_en:
      "Situated in Alley 29 Khuong Ha, this ancient brick-and-laterite well provided crystal-clear spring water to generations of villagers for centuries before modern city tap water, standing as a living symbol of rural Vietnamese communal life.",
    festivals: ["Nghi lễ tạ giếng đầu năm mới"],
    images: [
      {
        url: "/images/village_gate.jpg",
        caption: "Thành giếng cổ bằng đá ong",
        credit: "Ảnh khảo sát",
        year: 2024,
      },
    ],
    sources: [{ citation: "Ghi chép điền dã người cao tuổi làng Khương Hạ, 2024", url: null, reliability: "trung_binh" }],
    confidence: 4,
  },
  {
    id: 4,
    village_slug: "khuong-ha",
    slug: "ao-lang-khuong-ha",
    name: "Hồ Khương Hạ (Ao làng cổ)",
    name_han_nom: "姜下湖",
    category: "ao",
    lat: 20.9920,
    lng: 105.8155,
    built_year: 1700,
    deity: "Thủy thần tụ khí phong thủy",
    rank: "Không gian cảnh quan sinh thái văn hóa",
    description:
      "Hồ Khương Hạ nằm kề bên đình làng, đóng vai trò tụ thủy tụ khí theo phong thủy truyền thống, điều hòa không khí và là nơi diễn ra các hoạt động văn hóa bơi chải, thả sen mùa hạ của nhân dân.",
    description_en:
      "Khuong Ha Lake is the traditional village pond adjacent to the communal house. According to feng shui, it gathers vital water energy, regulates microclimate, and hosts traditional boat racing and lotus blossom festivals.",
    festivals: ["Bơi chải hội làng tháng Hai"],
    images: [
      {
        url: "/images/historic_map.jpg",
        caption: "Mặt nước hồ Khương Hạ",
        credit: "Ảnh tư liệu",
        year: 2023,
      },
    ],
    sources: [{ citation: "Quy hoạch bảo tồn cảnh quan mặt nước Hà Nội, 2020", url: null, reliability: "cao" }],
    confidence: 4,
  },
  {
    id: 5,
    village_slug: "khuong-ha",
    slug: "thcs-khuong-ha",
    name: "Trường THCS Khương Hạ",
    name_han_nom: "姜下初級中學校",
    category: "truong_hoc",
    lat: 20.9896,
    lng: 105.8158,
    built_year: 1996,
    deity: "Thiết chế giáo dục công lập",
    rank: "Trường chuẩn Quốc gia",
    description:
      "Trường THCS Khương Hạ tọa lạc tại số 29 phố Khương Hạ, phường Khương Đình. Trường đạt chuẩn quốc gia với quy mô giảng dạy hiện đại, kế thừa truyền thống hiếu học lâu đời của cư dân vùng đất Khương Hạ.",
    description_en:
      "Khuong Ha Secondary School at No. 29 Khuong Ha Street is a National Standard public school carrying forward the time-honored academic tradition of the historic Khuong Ha village community.",
    festivals: ["Khai giảng mùng 5 tháng 9", "Hội thi Nét đẹp thầy trò 20/11"],
    images: [
      {
        url: "/images/heritage_icons.jpg",
        caption: "Khuôn viên Trường THCS Khương Hạ",
        credit: "Cổng thông tin giáo dục",
        year: 2024,
      },
    ],
    sources: [{ citation: "Phòng GD&ĐT quận Thanh Xuân, 2024", url: null, reliability: "cao" }],
    confidence: 5,
  },
  {
    id: 6,
    village_slug: "khuong-ha",
    slug: "thpt-khuong-ha",
    name: "Trường THPT Khương Hạ",
    name_han_nom: "姜下高級中學校",
    category: "truong_hoc",
    lat: 20.9892,
    lng: 105.8152,
    built_year: 2021,
    deity: "Thiết chế giáo dục công lập",
    rank: "Trường THPT công lập chất lượng cao",
    description:
      "Trường THPT Khương Hạ nằm tại ngõ 29 phố Khương Hạ, là trường THPT công lập mới hiện đại của thành phố Hà Nội, phục vụ con em nhân dân các phường Khương Đình, Khương Trung, Hạ Đình và vùng phụ cận.",
    description_en:
      "Khuong Ha High School in Alley 29 Khuong Ha is a modern public high school serving students across Khuong Dinh, Khuong Trung, and surrounding districts.",
    festivals: ["Khai giảng 5/9", "Ngày hội Văn hóa Thanh niên"],
    images: [
      {
        url: "/images/heritage_icons.jpg",
        caption: "Trường THPT Khương Hạ",
        credit: "Sở GD&ĐT Hà Nội",
        year: 2024,
      },
    ],
    sources: [{ citation: "Sở Giáo dục và Đào tạo Hà Nội, 2024", url: null, reliability: "cao" }],
    confidence: 5,
  },

  // ============================================================
  // LÀNG KHƯƠNG TRUNG (Quận Thanh Xuân)
  // ============================================================
  {
    id: 7,
    village_slug: "khuong-trung",
    slug: "dinh-khuong-trung",
    name: "Đình Khương Trung",
    name_han_nom: "亭姜中",
    category: "dinh",
    lat: 20.9965,
    lng: 105.8198,
    built_year: 1620,
    deity: "Thành Hoàng bảo hộ làng Gừng Trung",
    rank: "Di tích lịch sử - văn hóa cấp Quốc gia",
    description:
      "Đình Khương Trung tọa lạc tại số 245 phố Khương Trung, phường Khương Trung. Ngôi đình cổ kính thờ Thành Hoàng làng, được xây dựng từ đầu thế kỷ XVII và trùng tu vào thời Nguyễn. Bên trong lưu giữ nhiều hoành phi câu đối sơn son, sắc phong của các triều vua Lê - Nguyễn.",
    description_en:
      "Khuong Trung Communal House at No. 245 Khuong Trung Street was originally constructed in the early 17th century. Designated a National Cultural Heritage site, it preserves imperial royal decrees from the Le and Nguyen dynasties and carved wooden altars.",
    festivals: ["Lễ hội làng Khương Trung ngày 12 tháng Hai âm lịch"],
    images: [
      {
        url: "/images/village_gate.jpg",
        caption: "Đình làng Khương Trung số 245",
        credit: "Khảo sát thực địa 2024",
        year: 2024,
      },
    ],
    sources: [{ citation: "Hồ sơ di tích Đình Khương Trung, Cục Di sản Văn hóa, 1993", url: null, reliability: "cao" }],
    confidence: 5,
  },
  {
    id: 8,
    village_slug: "khuong-trung",
    slug: "chua-khuong-trung",
    name: "Chùa Khương Trung (Chùa Tiêu Dao)",
    name_han_nom: "逍遙寺",
    category: "chua",
    lat: 20.9967,
    lng: 105.8196,
    built_year: 1650,
    deity: "Đức Phật & Đức Thánh Hiền",
    rank: "Di tích kiến trúc nghệ thuật cấp Quốc gia",
    description:
      "Chùa Tiêu Dao (Chùa Khương Trung) nằm liền kề bên đình Khương Trung tại số 245 phố Khương Trung. Ngôi chùa rợp bóng cây bồ đề cổ thụ, có gác chuông hai tầng mái ngói mũi hài, vườn bia đá cổ ghi lại Phật pháp và sự hưng thịnh của làng Gừng xưa.",
    description_en:
      "Tieu Dao Pagoda sits adjacent to Khuong Trung communal house at No. 245 Khuong Trung Street. Sheltered by centuries-old Bodhi trees, it features a traditional two-tiered bell tower and ancient stelae garden documenting local Buddhist history.",
    festivals: ["Lễ cầu an đầu xuân rằm tháng Giêng", "Lễ Phật Đản mùng 8/4"],
    images: [
      {
        url: "/images/historic_map.jpg",
        caption: "Chùa Tiêu Dao - Khương Trung",
        credit: "Ảnh tư liệu",
        year: 2023,
      },
    ],
    sources: [{ citation: "Văn bia Tiêu Dao tự & Địa chí Hà Nội, 2005", url: null, reliability: "cao" }],
    confidence: 5,
  },
  {
    id: 9,
    village_slug: "khuong-trung",
    slug: "cong-lang-khuong-trung",
    name: "Cổng làng Khương Trung Cổ Thôn",
    name_han_nom: "姜中古村門",
    category: "cong_lang",
    lat: 20.9982,
    lng: 105.8208,
    built_year: 1890,
    deity: "Biểu tượng không gian làng cổ",
    rank: "Di sản kiến trúc đô thị lịch sử",
    description:
      "Cổng làng tọa lạc tại đầu ngõ 211 phố Khương Trung, được xây dựng cuối thế kỷ XIX theo lối kiến trúc cổng tam quan cổ. Trên trán cổng đắp nổi 4 chữ Hán 'Khương Trung Cổ Thôn' (Làng cổ Khương Trung), là ranh giới ước lệ thiêng liêng giữa không gian phố thị hiện đại và làng cổ.",
    description_en:
      "The ancient village gate of Khuong Trung at the entrance of Alley 211 Khuong Trung was built in the late 19th century in classical three-door archway architecture. It proudly bears the embossed Han script 'Khuong Trung Ancient Village'.",
    festivals: ["Nơi cử hành nghi lễ đón rước kiệu làng"],
    images: [
      {
        url: "/images/village_gate.jpg",
        caption: "Cổng làng Khương Trung Cổ Thôn ngõ 211",
        credit: "Khảo sát ảnh 2024",
        year: 2024,
      },
    ],
    sources: [{ citation: "Khảo sát thực địa di sản kiến trúc Hà Nội, 2024", url: null, reliability: "cao" }],
    confidence: 5,
  },
  {
    id: 10,
    village_slug: "khuong-trung",
    slug: "thcs-khuong-trung",
    name: "Trường THCS Khương Trung",
    name_han_nom: "姜中初級中學校",
    category: "truong_hoc",
    lat: 20.9978,
    lng: 105.8216,
    built_year: 1998,
    deity: "Thiết chế giáo dục công lập",
    rank: "Trường chuẩn Quốc gia mức độ 1",
    description:
      "Trường THCS Khương Trung tọa lạc tại ngõ 211 phố Khương Trung. Trường có khuôn viên rộng rãi, cơ sở vật chất khang trang, đạt thành tích cao trong giáo dục và gìn giữ nét đẹp văn hóa truyền thống địa phương.",
    description_en:
      "Khuong Trung Secondary School, situated in Alley 211 Khuong Trung Street, is an accredited National Standard school educating generations of neighborhood youth.",
    festivals: ["Lễ kỷ niệm Ngày Nhà giáo Việt Nam 20/11"],
    images: [
      {
        url: "/images/heritage_icons.jpg",
        caption: "Khuôn viên Trường THCS Khương Trung",
        credit: "Tư liệu trường",
        year: 2024,
      },
    ],
    sources: [{ citation: "UBND quận Thanh Xuân, 2024", url: null, reliability: "cao" }],
    confidence: 5,
  },
  {
    id: 11,
    village_slug: "khuong-trung",
    slug: "tieu-hoc-khuong-trung",
    name: "Trường Tiểu học Khương Trung",
    name_han_nom: "姜中小學校",
    category: "truong_hoc",
    lat: 20.9950,
    lng: 105.8188,
    built_year: 1992,
    deity: "Thiết chế giáo dục tiểu học",
    rank: "Trường chuẩn Quốc gia",
    description:
      "Trường Tiểu học Khương Trung tại số 267 phố Khương Trung, là cái nôi ươm mầm học vấn của con em phường Khương Trung suốt hơn ba thập kỷ qua.",
    description_en:
      "Khuong Trung Primary School at No. 267 Khuong Trung Street has nurtured primary education for local children for more than three decades.",
    festivals: ["Ngày hội Trạng nguyên nhí"],
    images: [
      {
        url: "/images/heritage_icons.jpg",
        caption: "Trường Tiểu học Khương Trung",
        credit: "Ảnh tư liệu",
        year: 2024,
      },
    ],
    sources: [{ citation: "Cổng thông tin GD&ĐT Thanh Xuân, 2024", url: null, reliability: "cao" }],
    confidence: 5,
  },

  // ============================================================
  // LÀNG KHƯƠNG ĐÌNH (Quận Thanh Xuân)
  // ============================================================
  {
    id: 12,
    village_slug: "khuong-dinh",
    slug: "dinh-khuong-dinh",
    name: "Đình Khương Đình",
    name_han_nom: "亭姜亭",
    category: "dinh",
    lat: 20.9915,
    lng: 105.8182,
    built_year: 1550,
    deity: "Danh tướng Lê Dương Vệ (Thành Hoàng)",
    rank: "Di tích lịch sử cấp Thành phố",
    description:
      "Đình Khương Đình tọa lạc trên trục đường Bùi Xương Trạch - Vũ Tông Phan. Đình có niên đại từ thế kỷ XVI thời nhà Mạc - Lê Trung Hưng, thờ tướng quân Lê Dương Vệ có công bảo quốc an dân. Kiến trúc chữ Đinh gồm Tiền tế và Hậu cung với nhiều hiện vật điêu khắc gỗ cổ quý báu.",
    description_en:
      "Khuong Dinh Communal House, located between Bui Xuong Trach and Vu Tong Phan streets, dates back to the 16th century. It honors General Le Duong Ve and features classical wooden pillar architecture with ornate carving preserved through centuries.",
    festivals: ["Lễ hội mùa xuân ngày 14 tháng Giêng âm lịch"],
    images: [
      {
        url: "/images/village_gate.jpg",
        caption: "Cung Tiền tế Đình Khương Đình",
        credit: "Ảnh khảo sát 2024",
        year: 2024,
      },
    ],
    sources: [{ citation: "Hà Nội danh tích văn hóa, 2012", url: null, reliability: "cao" }],
    confidence: 5,
  },
  {
    id: 13,
    village_slug: "khuong-dinh",
    slug: "chua-tam-huyen",
    name: "Chùa Tam Huyền (Sùng Phúc Tự)",
    name_han_nom: "三玄寺 · 崇福寺",
    category: "chua",
    lat: 20.9910,
    lng: 105.8175,
    built_year: 1100,
    deity: "Đức Phật & Tăng quan Từ Vinh (thân phụ Từ Đạo Hạnh)",
    rank: "Di tích lịch sử - văn hóa cổ thời Lý",
    description:
      "Chùa Tam Huyền (tên chữ Sùng Phúc Tự) tại ngõ 117 Khương Đình, là một trong những ngôi chùa cổ bậc nhất vùng nam Thăng Long, có gốc tích từ thời Lý thế kỷ XI–XII. Chùa gắn liền với truyền thuyết về thân phụ của Đại thánh Thiền sư Từ Đạo Hạnh.",
    description_en:
      "Tam Huyen Pagoda (Sung Phuc Tu) in Alley 117 Khuong Dinh is among the oldest Buddhist shrines in southern Hanoi, with origins tracing back to the 11th-century Ly Dynasty, closely linked to the legendary Zen Master Tu Dao Hanh.",
    festivals: ["Lễ hội chùa Tam Huyền tháng Giêng"],
    images: [
      {
        url: "/images/historic_map.jpg",
        caption: "Không gian cổ tự Tam Huyền",
        credit: "Ảnh tư liệu",
        year: 2023,
      },
    ],
    sources: [{ citation: "Thiền uyển tập anh & Địa chí di tích Hà Nội, 2010", url: null, reliability: "cao" }],
    confidence: 5,
  },
  {
    id: 14,
    village_slug: "khuong-dinh",
    slug: "thcs-khuong-dinh",
    name: "Trường THCS Khương Đình",
    name_han_nom: "姜亭初級中學校",
    category: "truong_hoc",
    lat: 20.9902,
    lng: 105.8204,
    built_year: 1995,
    deity: "Thiết chế giáo dục công lập",
    rank: "Trường chuẩn Quốc gia",
    description:
      "Trường THCS Khương Đình nằm tại số 16 phố Bùi Xương Trạch, phường Khương Đình. Trường có bề dày thành tích dạy tốt học tốt, đóng góp lớn cho sự phát triển giáo dục của địa phương.",
    description_en:
      "Khuong Dinh Secondary School at No. 16 Bui Xuong Trach Street is a prestigious National Standard public school with outstanding educational achievements.",
    festivals: ["Lễ khai giảng 5/9", "Hội chợ Xuân truyền thống"],
    images: [
      {
        url: "/images/heritage_icons.jpg",
        caption: "Trường THCS Khương Đình",
        credit: "Cổng thông tin trường",
        year: 2024,
      },
    ],
    sources: [{ citation: "UBND phường Khương Đình, 2024", url: null, reliability: "cao" }],
    confidence: 5,
  },
  {
    id: 15,
    village_slug: "khuong-dinh",
    slug: "tieu-hoc-khuong-dinh",
    name: "Trường Tiểu học Khương Đình",
    name_han_nom: "姜亭小學校",
    category: "truong_hoc",
    lat: 20.9888,
    lng: 105.8210,
    built_year: 1990,
    deity: "Thiết chế giáo dục tiểu học",
    rank: "Trường chuẩn Quốc gia",
    description:
      "Trường Tiểu học Khương Đình tọa lạc tại ngõ 108 Bùi Xương Trạch, là ngôi trường tiểu học gắn bó với tuổi thơ của biết bao thế hệ con em làng Khương Đình.",
    description_en:
      "Khuong Dinh Primary School in Alley 108 Bui Xuong Trach Street is a respected community elementary school.",
    festivals: ["Tết Trung thu trăng rằm tháng Tám"],
    images: [
      {
        url: "/images/heritage_icons.jpg",
        caption: "Trường Tiểu học Khương Đình",
        credit: "Ảnh khảo sát",
        year: 2024,
      },
    ],
    sources: [{ citation: "Phòng GD&ĐT quận Thanh Xuân, 2024", url: null, reliability: "cao" }],
    confidence: 5,
  },

  // ============================================================
  // LÀNG KHƯƠNG THƯỢNG (Quận Đống Đa - Sáp nhập phường Kim Liên mới 2025)
  // ============================================================
  {
    id: 16,
    village_slug: "khuong-thuong",
    slug: "dinh-khuong-thuong",
    name: "Đình Khương Thượng",
    name_han_nom: "亭姜上",
    category: "dinh",
    lat: 21.0036,
    lng: 105.8247,
    built_year: 1590,
    deity: "Thần Quy Động & Đức Vua Quang Trung",
    rank: "Di tích lịch sử - văn hóa cấp Quốc gia",
    description:
      "Đình Khương Thượng tọa lạc tại số 165 phố Khương Thượng (quận Đống Đa, nay thuộc phường Kim Liên mới). Đình nằm ven hồ Khương Thượng, thờ thần Quy Động và ghi dấu chiến công vang dội của nghĩa quân Tây Sơn trong trận đánh giải phóng Thăng Long mùa xuân Kỷ Dậu 1789.",
    description_en:
      "Khuong Thuong Communal House, located at No. 165 Khuong Thuong Street near Khuong Thuong Lake (Dong Da District, now part of the new Kim Lien Ward), honors the deity Quy Dong and commemorates Emperor Quang Trung's historic 1789 victory over the Qing army.",
    festivals: ["Lễ hội chiến thắng Đống Đa mùng 5 tháng Giêng", "Hội làng rằm tháng Chín"],
    images: [
      {
        url: "/images/village_gate.jpg",
        caption: "Đình Khương Thượng ven hồ nước",
        credit: "Khảo sát thực địa 2024",
        year: 2024,
      },
    ],
    sources: [{ citation: "Hồ sơ di tích Đình Khương Thượng, Bộ Văn hóa, 1990", url: null, reliability: "cao" }],
    confidence: 5,
  },
  {
    id: 17,
    village_slug: "khuong-thuong",
    slug: "chua-boc",
    name: "Chùa Bộc (Sùng Phúc Tự)",
    name_han_nom: "崇福寺 (俗稱僕寺)",
    category: "chua",
    lat: 21.0072,
    lng: 105.8276,
    built_year: 1676,
    deity: "Đức Phật & Bàn thờ Vua Quang Trung (Đức Ông)",
    rank: "Di tích lịch sử - văn hóa cấp Quốc gia đặc biệt",
    description:
      "Chùa Bộc tọa lạc tại số 14 phố Chùa Bộc, phường Khương Thượng. Chùa là di tích lịch sử vô giá gắn liền với trận đánh đồn Khương Thượng năm 1789. Tại đây, tượng Đức Ông được nhân dân tạc ngầm với mũ áo chiến bào của Hoàng đế Quang Trung Nguyễn Huệ, cùng tấm bia 'Quang Trung tạo lập' độc nhất vô nhị.",
    description_en:
      "Chua Boc Pagoda at No. 14 Chua Boc Street is an internationally renowned national historical monument of the 1789 Battle of Dong Da. Inside, the shrine deity statue was covertly sculpted with the armor and countenance of Emperor Quang Trung Nguyen Hue.",
    festivals: ["Đại lễ tưởng niệm Quang Trung mùng 5 tháng Giêng"],
    images: [
      {
        url: "/images/historic_map.jpg",
        caption: "Cổng tam quan Chùa Bộc",
        credit: "Bảo tàng Hà Nội",
        year: 2023,
      },
    ],
    sources: [{ citation: "Văn bia Chùa Bộc & Đại Nam nhất thống chí, 1998", url: null, reliability: "cao" }],
    confidence: 5,
  },
  {
    id: 18,
    village_slug: "khuong-thuong",
    slug: "go-dong-da",
    name: "Gò Khương Thượng - Gò Đống Đa",
    name_han_nom: "姜上丘 · 棟多丘",
    category: "mieu",
    lat: 21.0115,
    lng: 105.8236,
    built_year: 1789,
    deity: "Chiến sĩ trận vong & Vua Quang Trung",
    rank: "Di tích Quốc gia Đặc biệt",
    description:
      "Khu di tích lịch sử Gò Đống Đa - gò Khương Thượng là mồ chôn xác giặc Thanh và chiến tích bất tử của trận đánh rạng danh non sông mùa xuân Kỷ Dậu 1789 do người anh hùng áo vải cờ đào Quang Trung chỉ huy.",
    description_en:
      "The Dong Da - Khuong Thuong Mound is a Special National Monument preserving the immortal memory of Emperor Quang Trung's lightning campaign liberating Thang Long in spring 1789.",
    festivals: ["Lễ hội kỷ niệm Chiến thắng Ngọc Hồi - Đống Đa mùng 5 Tết"],
    images: [
      {
        url: "/images/historic_map.jpg",
        caption: "Tượng đài Quang Trung tại Gò Đống Đa",
        credit: "Di tích Quốc gia",
        year: 2024,
      },
    ],
    sources: [{ citation: "Cục Di sản Văn hóa Việt Nam, 2018", url: null, reliability: "cao" }],
    confidence: 5,
  },
  {
    id: 19,
    village_slug: "khuong-thuong",
    slug: "dai-hoc-y-ha-noi",
    name: "Trường Đại học Y Hà Nội",
    name_han_nom: "河內醫科大學",
    category: "truong_hoc",
    lat: 21.0030,
    lng: 105.8315,
    built_year: 1902,
    deity: "Cái nôi y học hàng đầu Việt Nam",
    rank: "Đại học trọng điểm Quốc gia",
    description:
      "Tọa lạc tại số 1 phố Tôn Thất Tùng, tiếp giáp làng Khương Thượng. Thành lập năm 1902 dưới thời Toàn quyền Paul Doumer với hiệu trưởng đầu tiên là bác sĩ Alexandre Yersin, đây là trường đại học y khoa lâu đời và uy tín nhất cả nước.",
    description_en:
      "Hanoi Medical University at No. 1 Ton That Tung Street, bordering ancient Khuong Thuong village, was founded in 1902 with Dr. Alexandre Yersin as its first dean. It is Vietnam's oldest and most renowned medical school.",
    festivals: ["Lễ trao bằng Bác sĩ y khoa", "Ngày Thầy thuốc Việt Nam 27/2"],
    images: [
      {
        url: "/images/heritage_icons.jpg",
        caption: "Khuôn viên Đại học Y Hà Nội",
        credit: "HMU Media",
        year: 2024,
      },
    ],
    sources: [{ citation: "Lịch sử Đại học Y Hà Nội 1902 - 2022, NXB Y học", url: null, reliability: "cao" }],
    confidence: 5,
  },
  {
    id: 20,
    village_slug: "khuong-thuong",
    slug: "dai-hoc-thuy-loi",
    name: "Trường Đại học Thủy Lợi",
    name_han_nom: "水利大學",
    category: "truong_hoc",
    lat: 21.0085,
    lng: 105.8242,
    built_year: 1959,
    deity: "Trường đại học kỹ thuật đa ngành",
    rank: "Đại học trọng điểm Quốc gia",
    description:
      "Nằm tại số 175 Tây Sơn, giáp phố Chùa Bộc và làng Khương Thượng. Trường Đại học Thủy Lợi là trung tâm đào tạo nguồn nhân lực chất lượng cao về thủy lợi, tài nguyên nước, kỹ thuật công trình hàng đầu Việt Nam.",
    description_en:
      "Thuy Loi University at No. 175 Tay Son, bordering Chua Boc Street and Khuong Thuong village, is Vietnam's premier university for water resources, civil engineering, and environmental technology.",
    festivals: ["Lễ kỷ niệm thành lập trường 17/11"],
    images: [
      {
        url: "/images/heritage_icons.jpg",
        caption: "Trường Đại học Thủy Lợi",
        credit: "TLU Media",
        year: 2024,
      },
    ],
    sources: [{ citation: "Trường Đại học Thủy Lợi, 2024", url: null, reliability: "cao" }],
    confidence: 5,
  },
  {
    id: 21,
    village_slug: "khuong-thuong",
    slug: "tieu-hoc-khuong-thuong",
    name: "Trường Tiểu học Khương Thượng",
    name_han_nom: "姜上小學校",
    category: "truong_hoc",
    lat: 21.0048,
    lng: 105.8290,
    built_year: 1985,
    deity: "Thiết chế giáo dục tiểu học",
    rank: "Trường chuẩn Quốc gia",
    description:
      "Trường Tiểu học Khương Thượng tọa lạc tại ngõ 40 phố Tôn Thất Tùng, là ngôi trường rực rỡ cờ hoa nuôi dưỡng tinh thần học tập của con em vùng đất Khương Thượng anh hùng.",
    description_en:
      "Khuong Thuong Primary School in Alley 40 Ton That Tung Street serves primary school education for local families in historic Khuong Thuong.",
    festivals: ["Lễ bế giảng và khen thưởng học sinh giỏi"],
    images: [
      {
        url: "/images/heritage_icons.jpg",
        caption: "Trường Tiểu học Khương Thượng",
        credit: "GD&ĐT Đống Đa",
        year: 2024,
      },
    ],
    sources: [{ citation: "Phòng GD&ĐT quận Đống Đa, 2024", url: null, reliability: "cao" }],
    confidence: 5,
  },
];

export type Place = (typeof SAMPLE_PLACES)[0];

export const CATEGORY_LABELS: Record<string, { vi: string; en: string; icon: string }> = {
  dinh: { vi: "Đình làng", en: "Communal House", icon: "🏛️" },
  chua: { vi: "Chùa", en: "Buddhist Pagoda", icon: "🛕" },
  mieu: { vi: "Miếu / Gò", en: "Shrine / Historic Mound", icon: "⛩️" },
  gieng: { vi: "Giếng cổ", en: "Ancient Well", icon: "🪣" },
  cong_lang: { vi: "Cổng làng", en: "Village Gate", icon: "🚪" },
  ao: { vi: "Ao / Hồ làng", en: "Village Pond / Lake", icon: "💧" },
  truong_hoc: { vi: "Trường học", en: "School & University", icon: "🏫" },
  nha_tho_ho: { vi: "Nhà thờ họ", en: "Clan House", icon: "🏠" },
};
