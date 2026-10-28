import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LÀNG TRONG PHỐ",
  description:
    "Bản đồ di sản văn hóa 7 Vùng làng cổ Thăng Long - Hà Nội. Khám phá 58 làng di sản truyền thống và các di tích lịch sử đình, chùa cổ kính.",
  keywords: ["Làng trong phố", "LÀNG TRONG PHỐ", "bản đồ di sản Hà Nội", "làng cổ Hà Nội", "Thập tam trại"],
  openGraph: {
    title: "LÀNG TRONG PHỐ",
    description: "Bản đồ di sản 7 Vùng làng cổ Thăng Long - Hà Nội.",
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
