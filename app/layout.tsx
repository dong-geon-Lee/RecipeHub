import "@/styles/globals.css";
import { Noto_Sans_KR } from "next/font/google";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata = {
  title: "RecipeHub",
  description:
    "RecipeHub은 다양한 맛있는 요리 레시피를 한 곳에서 찾고 공유할 수 있는 편리한 플랫폼입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={notoSans.className}>{children}</body>
    </html>
  );
}
