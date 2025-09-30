import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const neueHaas = localFont({
  src: "./fonts/NeueHaasGrotesk-Medium.ttf",
  variable: "--font-neue-haas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rishi's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={neueHaas.className}>{children}</body>
    </html>
  );
}
