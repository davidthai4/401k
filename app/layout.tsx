import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "401k App",
  description: "401k Contribution Calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}