import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className={`bg-main ${inter.className}`}>{children}</body>
    </html>
  );
}
