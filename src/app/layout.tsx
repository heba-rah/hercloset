import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "hercloset — AI Modesty Fashion Engine",
  description: "AI-powered modesty fashion search engine across live Urban Planet & Ardene Canada catalogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} h-full antialiased font-serif`}
    >
      <body className="min-h-full flex flex-col font-serif bg-[#F2EDE6] text-[#4B3F38]">
        {children}
      </body>
    </html>
  );
}
