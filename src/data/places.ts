// Dữ liệu mẫu 10 di tích — sẽ được thay bằng API PostgreSQL/PostGIS
export const SAMPLE_PLACES = [
  {
    id: 1,
    village_slug: "khuong-ha",
    slug: "dinh-khuong-ha",
    name: "Đình Khương Hạ",
    name_han_nom: "亭姜下",
    category: "dinh",
    geom: { type: "Point", coordinates: [105.8098, 20.9915] },
    built_year: 1680,
    deity: "Thành Hoàng làng",
    rank: "Di tích lịch sử cấp Thành phố",
    description:
      "Đình Khương Hạ là công trình kiến trúc tâm linh trọng tâm của làng, thờ Thành Hoàng bảo hộ dân làng. Đình được xây dựng vào cuối thế kỷ XVII, tu bổ lần cuối năm 1995. Kiến trúc theo phong cách đình làng Bắc Bộ với mái ngói âm dương, hệ thống kèo vì kẻ chuyền tinh xảo.",
    description_en:
      "Khuong Ha communal house (đình) is the spiritual heart of the village, dedicated to the village guardian deity. Built in the late 17th century and last restored in 1995, it features classic Northern Vietnamese communal house architecture with yin-yang roof tiles and intricately carved wooden frames.",
    festivals: ["Lễ hội tháng Ba âm lịch", "Lễ nhập tịch"],
    images: [
      {
        url: "https://picsum.photos/seed/dinh-khuong-ha/800/600",
        caption: "Mặt tiền Đình Khương Hạ",
        credit: "Ảnh tư liệu",
        year: 2023,
      },
    ],
    sources: [
      {
        citation: "Hà Nội danh tích, NXB Hà Nội, 2008",
        url: null,
        reliability: "cao",
      },
    ],
    confidence: 4,
    lat: 20.9915,
    lng: 105.8098,
  },
  {
    id: 2,
    village_slug: "khuong-ha",
    slug: "chua-khuong-ha",
    name: "Chùa Khương Hạ",
    name_han_nom: "寺姜下",
    category: "chua",
    geom: { type: "Point", coordinates: [105.8105, 20.9920] },
    built_year: 1750,
    deity: "Phật Thích Ca Mâu Ni",
    rank: null,
    description:
      "Chùa làng Khương Hạ thờ Phật, là nơi sinh hoạt tâm linh của người dân trong làng. Chùa có vườn thiền yên tĩnh với cây đa cổ thụ hàng trăm năm tuổi.",
    description_en:
      "The Buddhist pagoda of Khuong Ha village, a center of spiritual life for local residents. Features a tranquil meditation garden with century-old banyan trees.",
    festivals: ["Rằm tháng Giêng", "Lễ Phật Đản"],
    images: [
      {
        url: "https://picsum.photos/seed/chua-khuong-ha/800/600",
        caption: "Chùa Khương Hạ",
        credit: "Ảnh tư liệu",
        year: 2022,
      },
    ],
    sources: [
      { citation: "Khảo sát thực địa, 2024", url: null, reliability: "cao" },
    ],
    confidence: 3,
    lat: 20.992,
    lng: 105.8105,
  },
  {
    id: 3,
    village_slug: "khuong-ha",
    slug: "gieng-co-khuong-ha",
    name: "Giếng cổ Khương Hạ",
    name_han_nom: "古井姜下",
    category: "gieng",
    geom: { type: "Point", coordinates: [105.8090, 20.9910] },
    built_year: null,
    deity: null,
    rank: null,
    description:
      "Giếng đá cổ nằm giữa xóm, tương truyền có từ thời lập làng. Nước giếng trong mát quanh năm, từng là nguồn nước sinh hoạt chính của cả làng.",
    description_en:
      "An ancient stone well at the heart of the hamlet, believed to date back to the village's founding. Once the primary water source for the entire community.",
    festivals: [],
    images: [
      {
        url: "https://picsum.photos/seed/gieng-co/800/600",
        caption: "Giếng cổ Khương Hạ",
        credit: "Ảnh tư liệu",
        year: 2023,
      },
    ],
    sources: [{ citation: "Truyền miệng, 2024", url: null, reliability: "truyền miệng" }],
    confidence: 2,
    lat: 20.991,
    lng: 105.809,
  },
  {
    id: 4,
    village_slug: "khuong-trung",
    slug: "dinh-khuong-trung",
    name: "Đình Khương Trung",
    name_han_nom: "亭姜中",
    category: "dinh",
    geom: { type: "Point", coordinates: [105.8148, 20.9930] },
    built_year: 1620,
    deity: "Đức Thánh Trần Hưng Đạo",
    rank: "Di tích lịch sử cấp Quốc gia",
    description:
      "Đình Khương Trung thờ Đức Thánh Trần Hưng Đạo — vị tướng huyền thoại đã ba lần đại phá quân Nguyên Mông. Đình được công nhận là Di tích lịch sử cấp Quốc gia. Lễ hội đình Khương Trung được tổ chức vào tháng Tám âm lịch hằng năm.",
    description_en:
      "Khuong Trung communal house is dedicated to General Tran Hung Dao, legendary victor of three battles against the Mongol Yuan dynasty. Recognized as a National Historical Monument. The annual festival is held in the eighth lunar month.",
    festivals: ["Hội tháng Tám âm lịch", "Lễ kỷ niệm chiến thắng Bạch Đằng"],
    images: [
      {
        url: "https://picsum.photos/seed/dinh-khuong-trung/800/600",
        caption: "Đình Khương Trung",
        credit: "Ảnh tư liệu",
        year: 2023,
      },
    ],
    sources: [
      {
        citation: "Quyết định công nhận DTLS, Bộ VHTTDL, 1998",
        url: null,
        reliability: "cao",
      },
    ],
    confidence: 5,
    lat: 20.993,
    lng: 105.8148,
  },
  {
    id: 5,
    village_slug: "khuong-trung",
    slug: "cong-lang-khuong-trung",
    name: "Cổng làng Khương Trung",
    name_han_nom: "門姜中",
    category: "cong_lang",
    geom: { type: "Point", coordinates: [105.8135, 20.9920] },
    built_year: 1890,
    deity: null,
    rank: null,
    description:
      "Cổng làng xây cuối thế kỷ XIX theo kiến trúc cổng tam quan truyền thống, nay vẫn là ranh giới tượng trưng của làng. Khắc chữ Hán Nôm: 'Khương Trung Cổ Thôn'.",
    description_en:
      "A late 19th-century triple-arched village gate, still serving as the symbolic boundary of Khuong Trung. Bears a Han-Nom inscription reading 'Khuong Trung Ancient Village'.",
    festivals: [],
    images: [
      {
        url: "https://picsum.photos/seed/cong-lang/800/600",
        caption: "Cổng làng Khương Trung",
        credit: "Ảnh tư liệu",
        year: 2023,
      },
    ],
    sources: [{ citation: "Khảo sát thực địa, 2024", url: null, reliability: "cao" }],
    confidence: 4,
    lat: 20.992,
    lng: 105.8135,
  },
  {
    id: 6,
    village_slug: "khuong-dinh",
    slug: "dinh-khuong-dinh",
    name: "Đình Khương Đình",
    name_han_nom: "亭姜亭",
    category: "dinh",
    geom: { type: "Point", coordinates: [105.8205, 20.9940] },
    built_year: 1550,
    deity: "Cao Sơn Đại Vương",
    rank: "Di tích lịch sử cấp Thành phố",
    description:
      "Đình Khương Đình — một trong những đình làng cổ nhất trong cụm, có niên đại từ thế kỷ XVI, thờ Cao Sơn Đại Vương. Đây là di tích tiêu biểu của kiến trúc đình làng vùng đồng bằng sông Hồng.",
    description_en:
      "One of the oldest communal houses in the cluster, dating to the 16th century. Dedicated to Cao Son Dai Vuong (Great King of High Mountains), it exemplifies Red River Delta communal house architecture.",
    festivals: ["Lễ hội mùa xuân tháng Ba", "Lễ hội Thu tháng Chín"],
    images: [
      {
        url: "https://picsum.photos/seed/dinh-khuong-dinh/800/600",
        caption: "Đình Khương Đình",
        credit: "Ảnh tư liệu",
        year: 2022,
      },
    ],
    sources: [
      {
        citation: "Lịch sử làng Khương Đình, Ban quản lý di tích, 2015",
        url: null,
        reliability: "cao",
      },
    ],
    confidence: 4,
    lat: 20.994,
    lng: 105.8205,
  },
  {
    id: 7,
    village_slug: "khuong-dinh",
    slug: "mieu-tho-khuong-dinh",
    name: "Miếu thờ Khương Đình",
    name_han_nom: "廟姜亭",
    category: "mieu",
    geom: { type: "Point", coordinates: [105.8195, 20.9930] },
    built_year: 1720,
    deity: "Thổ thần",
    rank: null,
    description:
      "Miếu nhỏ thờ Thổ thần (thần đất) nằm tại ngõ chính của làng. Người dân hằng năm cúng vào ngày Rằm tháng Giêng và trước khi khởi công xây nhà.",
    description_en:
      "A small shrine dedicated to the Earth God (Tho Than), located at the village's main alleyway. Locals offer prayers annually on the first full moon and before beginning construction.",
    festivals: ["Rằm tháng Giêng"],
    images: [
      {
        url: "https://picsum.photos/seed/mieu-khuong-dinh/800/600",
        caption: "Miếu Khương Đình",
        credit: "Ảnh tư liệu",
        year: 2023,
      },
    ],
    sources: [{ citation: "Truyền miệng, 2024", url: null, reliability: "truyền miệng" }],
    confidence: 2,
    lat: 20.993,
    lng: 105.8195,
  },
  {
    id: 8,
    village_slug: "khuong-thuong",
    slug: "dinh-khuong-thuong",
    name: "Đình Khương Thượng",
    name_han_nom: "亭姜上",
    category: "dinh",
    geom: { type: "Point", coordinates: [105.8090, 20.9965] },
    built_year: 1700,
    deity: "Linh Lang Đại Vương",
    rank: "Di tích lịch sử cấp Thành phố",
    description:
      "Đình Khương Thượng thờ Linh Lang Đại Vương — hoàng tử nhà Lý đã hiển linh giúp dân. Đình có hệ thống hoành phi câu đối sơn son thếp vàng đặc sắc.",
    description_en:
      "Khuong Thuong communal house is dedicated to Linh Lang Dai Vuong, a Ly Dynasty prince revered for miraculous deeds. Notable for its gilded lacquer plaques and parallel couplets.",
    festivals: ["Hội làng tháng Hai âm lịch"],
    images: [
      {
        url: "https://picsum.photos/seed/dinh-khuong-thuong/800/600",
        caption: "Đình Khương Thượng",
        credit: "Ảnh tư liệu",
        year: 2023,
      },
    ],
    sources: [{ citation: "Hà Nội danh tích, NXB Hà Nội, 2008", url: null, reliability: "cao" }],
    confidence: 4,
    lat: 20.9965,
    lng: 105.809,
  },
  {
    id: 9,
    village_slug: "khuong-thuong",
    slug: "ao-lang-khuong-thuong",
    name: "Ao làng Khương Thượng",
    name_han_nom: "村塘姜上",
    category: "ao",
    geom: { type: "Point", coordinates: [105.8080, 20.9970] },
    built_year: null,
    deity: null,
    rank: null,
    description:
      "Ao làng Khương Thượng là một trong số ít ao làng còn sót lại trong vùng nội thành Hà Nội. Ao được người dân gìn giữ như một phần ký ức không gian của làng quê xưa.",
    description_en:
      "One of the few remaining village ponds within Hanoi's inner city. Preserved by residents as a living memory of the traditional rural landscape within the modern urban fabric.",
    festivals: [],
    images: [
      {
        url: "https://picsum.photos/seed/ao-lang/800/600",
        caption: "Ao làng Khương Thượng",
        credit: "Ảnh tư liệu",
        year: 2024,
      },
    ],
    sources: [{ citation: "Khảo sát thực địa, 2024", url: null, reliability: "cao" }],
    confidence: 5,
    lat: 20.997,
    lng: 105.808,
  },
  {
    id: 10,
    village_slug: "khuong-ha",
    slug: "nha-tho-ho-nguyen-khuong-ha",
    name: "Nhà thờ họ Nguyễn Khương Hạ",
    name_han_nom: "阮氏祠堂姜下",
    category: "nha_tho_ho",
    geom: { type: "Point", coordinates: [105.8102, 20.9905] },
    built_year: 1850,
    deity: "Tổ tiên họ Nguyễn",
    rank: null,
    description:
      "Nhà thờ họ Nguyễn tại Khương Hạ, xây dựng giữa thế kỷ XIX. Hiện vẫn là nơi tụ họp của con cháu dòng họ vào các dịp tết, giỗ tổ. Lưu giữ nhiều tư liệu gia phả quý.",
    description_en:
      "The Nguyen clan ancestral house in Khuong Ha, built in the mid-19th century. Still serves as a gathering place for clan members during Tet and ancestor commemoration ceremonies. Houses valuable genealogical records.",
    festivals: ["Giỗ tổ tháng Ba âm lịch"],
    images: [
      {
        url: "https://picsum.photos/seed/nha-tho-ho/800/600",
        caption: "Nhà thờ họ Nguyễn",
        credit: "Ảnh tư liệu",
        year: 2023,
      },
    ],
    sources: [{ citation: "Gia phả họ Nguyễn Khương Hạ, 2020", url: null, reliability: "cao" }],
    confidence: 4,
    lat: 20.9905,
    lng: 105.8102,
  },
];

export type Place = (typeof SAMPLE_PLACES)[0];

export const CATEGORY_LABELS: Record<string, { vi: string; en: string; icon: string }> = {
  dinh: { vi: "Đình làng", en: "Communal House", icon: "🏛️" },
  chua: { vi: "Chùa", en: "Buddhist Pagoda", icon: "🛕" },
  mieu: { vi: "Miếu", en: "Shrine", icon: "⛩️" },
  gieng: { vi: "Giếng cổ", en: "Ancient Well", icon: "🪣" },
  cong_lang: { vi: "Cổng làng", en: "Village Gate", icon: "🚪" },
  ao: { vi: "Ao làng", en: "Village Pond", icon: "💧" },
  nha_tho_ho: { vi: "Nhà thờ họ", en: "Clan House", icon: "🏠" },
};
