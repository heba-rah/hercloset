import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
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
      className={`${inter.variable} ${playfair.variable} h-full antialiased font-sans overflow-x-hidden max-w-full`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#F2EDE6] text-[#4B3F38] overflow-x-hidden w-full max-w-full">
        {children}
      </body>
    </html>
  );
}
