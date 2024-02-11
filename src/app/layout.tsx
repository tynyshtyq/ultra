import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ultra",
  description: "Track your academic performance",
  authors: [
    {
      name: 'Dastan Tynyshtyk',
      url: 'https://tynyshtyq.blog',
    },
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`bg-main ${inter.className}`}>{children}</body>
      </Providers>
    </html>
  );
}
