import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sawala Rasa — A letter I never knew how to say.",
  description:
    "A deeply personal romantic digital letter for Sifa Nuraliza, written with warmth, tenderness, and cinematic detail.",
  keywords: [
    "Sawala Rasa",
    "Sifa Nuraliza",
    "love letter",
    "romantic website",
    "Sundanese",
    "editorial design",
  ],
  authors: [{ name: "Sawala Rasa" }],
  openGraph: {
    title: "Sawala Rasa — A letter I never knew how to say.",
    description:
      "A quiet, personal love story preserved in letters, photographs, and tender memories.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#481725",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Manrope:wght@300;400;500;600;700;800&family=Caveat:wght@400;500;600;700&family=Noto+Sans+Sundanese:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
