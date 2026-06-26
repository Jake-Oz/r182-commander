import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "R182 Commander",
  description: "Scenario-driven aircraft command training platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
