import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hogwarts Cafe Maharagama | A Little Magic, A Lot of Flavour",
  description:
    "Discover Hogwarts Cafe in Maharagama, Sri Lanka. Explore favourites, browse the digital menu, and find directions to the café.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Hogwarts Cafe Maharagama",
    description: "A little magic. A lot of flavour.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#17130f",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
