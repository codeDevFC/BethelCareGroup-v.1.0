import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BETHEL • CARE • GROUP",
  description: "Discipleship For Mission",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
