import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Làng Trong Phố — Bản đồ di sản Khương Hạ, Khương Trung, Khương Đình, Khương Thượng",
  description:
    "Khám phá bốn làng cổ trong lòng Hà Nội hiện đại: Khương Hạ, Khương Trung, Khương Đình, Khương Thượng. Bản đồ tương tác lưu giữ di sản kiến trúc và văn hóa làng quê Bắc Bộ.",
  keywords: ["Làng trong phố", "Khương Hạ", "Khương Trung", "Khương Đình", "Khương Thượng", "bản đồ di sản Hà Nội", "làng cổ Hà Nội"],
  openGraph: {
    title: "Làng Trong Phố — Bản đồ di sản Hà Nội",
    description: "Bốn làng cổ trong lòng đô thị: Khương Hạ, Khương Trung, Khương Đình, Khương Thượng.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
