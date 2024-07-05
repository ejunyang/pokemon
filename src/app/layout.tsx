import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./provider";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Pokémon",
  description: "포켓몬 도감 웹페이지 입니다.",
  icons: {
    icon: "/pokeball.png",
  },
};

const myFont = localFont({
  src: "./fonts/DungGeunMo.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={myFont.className}>
        <div className="flex flex-col justify-center items-center w-[1240px] mx-auto">
          <h1 className="text-center w-[300px] mx-auto my-10">
            <img src="/pokemon.png" alt="포켓몬 로고" className="w-[100%]" />
          </h1>

          <QueryProvider>{children}</QueryProvider>
        </div>
      </body>
    </html>
  );
}
