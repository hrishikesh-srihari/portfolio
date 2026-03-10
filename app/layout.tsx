import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const neueHaas = localFont({
  src: "./fonts/NeueHaasGrotesk-Medium.ttf",
  variable: "--font-neue-haas",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rishi Srihari",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('theme');
                  if (mode === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${neueHaas.className} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
