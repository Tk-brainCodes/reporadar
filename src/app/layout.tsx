import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#07090e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "RepoRadar - Discover Rising Open Source Projects",
  description:
    "Discover emerging GitHub repositories, explore developer tools, and find interesting open-source projects by programming language.",
  keywords: [
    "GitHub",
    "open source",
    "developer tools",
    "repository discovery",
    "rising repositories",
    "trending software",
  ],
  authors: [{ name: "RepoRadar Team" }],
  openGraph: {
    title: "RepoRadar - Discover Rising Open Source Projects",
    description:
      "Discover emerging GitHub repositories, explore developer tools, and find interesting open-source projects by programming language.",
    url: "https://reporadar.dev",
    siteName: "RepoRadar",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "RepoRadar - Discover Rising Open Source Projects",
    description:
      "Discover emerging GitHub repositories, explore developer tools, and find interesting open-source projects by programming language.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="flex flex-col min-h-screen bg-[#07090e] text-[#f8fafc] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
