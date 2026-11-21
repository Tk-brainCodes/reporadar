import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal/ScrollReveal";
import { MotionProvider } from "@/components/MotionProvider/MotionProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "RepoRadar — Find new GitHub repositories",
  description: "Filter recently created GitHub repositories by language and date, then sort by stars, forks, or recent updates.",
  keywords: ["GitHub", "open source", "repository discovery", "developer tools"],
  openGraph: {
    title: "RepoRadar — Find new GitHub repositories",
    description: "A live feed of recently created public repositories, with filters you control.",
    url: "https://reporadar.dev",
    siteName: "RepoRadar",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "RepoRadar — Find new GitHub repositories",
    description: "Filter recent repositories by language and creation date.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-[#000000] text-[#ffffff] antialiased">
        <MotionProvider>
          <Navbar />
          <main>{children}</main>
          <ScrollReveal><Footer /></ScrollReveal>
        </MotionProvider>
      </body>
    </html>
  );
}
