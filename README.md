# 🏮 Làng Trong Phố (Village in the City · Hà Nội)

> Bản đồ số tương tác bảo tồn và tôn vinh di sản văn hóa 4 làng cổ ven sông Tô Lịch: **Khương Hạ (姜下)**, **Khương Trung (姜中)**, **Khương Đình (姜亭)** và **Khương Thượng (姜上)**.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MapLibre GL](https://img.shields.io/badge/MapLibre-GL--JS-blue?logo=maplibre)](https://maplibre.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%20v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

---

## 📖 Giới thiệu dự án

Nằm ven dòng sông Tô Lịch cổ kính ở phía nam kinh thành Thăng Long xưa, cụm 4 làng cổ **Khương Hạ, Khương Trung, Khương Đình, Khương Thượng** là chứng nhân của hàng trăm năm văn hoá làng quê đồng bằng Bắc Bộ. Đặc biệt, Khương Thượng gắn liền với chiến địa oanh liệt của chiến thắng Ngọc Hồi - Đống Đa mùa xuân Kỷ Dậu (1789) do Hoàng đế Quang Trung chỉ huy.

Trong tiến trình đô thị hoá nhanh chóng, các làng cổ dần hòa vào các quận nội thành sầm uất (Thanh Xuân, Đống Đa). Dự án web map **"Làng Trong Phố"** hướng tới mục tiêu:
- Số hóa ranh giới không gian lịch sử 4 làng cổ theo bản đồ địa chính cổ và khảo sát thực địa GPS 2024.
- Hiển thị hệ thống thiết chế làng quê truyền thống: **Đình làng, Chùa, Miếu, Giếng cổ, Cổng làng, Ao làng, Nhà thờ họ**.
- Cung cấp thang đo độ tin cậy tư liệu (*Primary source, Verified, Oral tradition...*) và nguồn dẫn chứng lịch sử (*Đồng Khánh địa dư chí, Bản đồ Hà Nội thời Pháp 1902–1925, văn bia, tộc phả*).
- Hỗ trợ trải nghiệm song ngữ toàn diện (**Tiếng Việt / English**).

---

## ✨ Tính năng nổi bật

- **🗺️ Bản đồ đêm Midnight Slate & 3D Perspective**:
  - Tích hợp MapLibre GL JS trên nền gạch ngói chi tiết của OpenStreetMap France.
  - Chuyển đổi linh hoạt góc nhìn **2D phẳng** và **3D chiều sâu** (góc nghiêng $55^\circ$, bearing $-25^\circ$).
  - Đánh dấu ranh giới 4 làng bằng các đa giác GeoJSON màu sắc truyền thống (Hoàng thổ, Đất nung, Ngọc bích, Tím lam cổ).
- **📍 Điểm ghim di tích tương tác (Teardrop Markers)**:
  - Custom pin xoay nghiêng $-45^\circ$ với biểu tượng văn hóa đặc trưng.
  - Micro-interaction: phóng to $1.25\times$ và phát sáng khi di chuột qua.
- **🔍 Tìm kiếm thông minh (Vietnamese Diacritic Normalization)**:
  - Tìm kiếm thời gian thực loại bỏ dấu tiếng Việt (gõ *"khuong", "dinh", "gieng", "cong"* đều ra kết quả tức thì).
  - Phân nhóm trực quan theo Làng và Di tích.
- **🏛️ Bảng chi tiết Làng (Village Drawer)**:
  - Thống kê diện tích (ha), niên đại thành lập, tóm tắt lịch sử.
  - Phân tích số lượng di tích theo loại hình (Đình, Chùa, Miếu, Giếng...).
- **📜 Bảng thông tin Di tích (Place Drawer)**:
  - Hình ảnh tư liệu, thẻ xếp hạng di tích văn hóa.
  - Mô tả lịch sử song ngữ Việt - Anh có thể chuyển đổi tức thì.
  - Danh mục lễ hội truyền thống theo lịch âm/dương.
  - Thang chấm độ tin cậy nguồn khảo sát (1–5 chấm).
- **🌐 Song ngữ Toàn diện (VI / EN)**:
  - Chuyển đổi ngôn ngữ trên thanh điều hướng, nhãn phân loại, chú giải và toàn bộ mô tả di tích.
- **📐 Bố cục tự thích ứng thông minh (Auto-centering Map View)**:
  - Khi mở bảng chi tiết bên phải, thanh tìm kiếm và nút điều khiển 2D/3D tự động trượt mượt mà về tâm vùng bản đồ còn lại.

---

## 🛠️ Công nghệ sử dụng

- **Frontend Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **Ngôn ngữ**: [TypeScript 5](https://www.typescriptlang.org/)
- **Bản đồ số**: [MapLibre GL JS](https://maplibre.org/)
- **Hiệu ứng & Chuyển động**: [Motion (Framer Motion)](https://motion.dev/)
- **Styling**: Vanilla CSS tokens & [Tailwind CSS v4](https://tailwindcss.com/)
- **Biểu tượng**: [@phosphor-icons/react](https://phosphoricons.com/)
- **Typography**: Google Fonts (*Noto Serif Display*, *Be Vietnam Pro*)

---

## 🚀 Cài đặt và Chạy thử

### Yêu cầu môi trường
- [Node.js](https://nodejs.org/) version 18 trở lên
- npm, pnpm hoặc yarn

### Các bước thực hiện

```bash
# 1. Clone repository
git clone https://github.com/Stazee-58/LTP.git
cd LTP

# 2. Cài đặt các thư viện phụ thuộc
npm install

# 3. Chạy môi trường phát triển
npm run dev
```

Mở trình duyệt và truy cập: **`http://localhost:3000`**

### Build cho môi trường Production

```bash
npm run build
npm run start
```

---

## 📂 Cấu trúc thư mục

```
lang-trong-pho/
├── public/                # Static assets, hero images, MapLibre worker
├── src/
│   ├── app/
│   │   ├── globals.css    # Design system, CSS tokens, dark mode & layout
│   │   ├── layout.tsx     # Root layout & SEO meta tags
│   │   └── page.tsx       # Main MapLibre interactive map page
│   ├── components/
│   │   ├── AboutModal.tsx # Project narrative & methodology modal
│   │   ├── FilterBar.tsx  # Category filter pills
│   │   ├── LoadingScreen.tsx # Heritage loading animation
│   │   ├── Navbar.tsx     # Brand, language toggle & About trigger
│   │   ├── PlacePanel.tsx # Heritage site drawer
│   │   ├── SearchBar.tsx  # Real-time search with diacritic normalization
│   │   ├── VillageLegend.tsx # 4-village legend & quick fly-to
│   │   └── VillagePanel.tsx # Village overview & statistics drawer
│   └── data/
│       ├── places.ts      # Heritage sites database with citations
│       └── villages.ts    # GeoJSON boundaries & historical statistics
├── package.json
└── tsconfig.json
```

---

## 📜 Bản quyền & Giấy phép

Dự án số hóa di sản văn hóa phi lợi nhuận phục vụ cộng đồng và bảo tồn ký ức Thăng Long - Hà Nội.
MIT License © 2026 Làng Trong Phố.
