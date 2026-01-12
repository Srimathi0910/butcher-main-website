import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel, Merriweather, Lato } from "next/font/google";

import "./globals.css";
import { CookieBanner, Footer, Navbar, Preloader } from "./_components";
import Head from "next/head";


const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});


export const metadata: Metadata = {
  title: "Amal Al-Sham Butchers | Fresh Halal Meat in Derby",
  description: "Your trusted halal butcher in Derby. Offering fresh chicken, lamb, beef, goat, fish, wings, drumsticks & whole sheep. Open 7 days with free local delivery.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          <meta name="google-site-verification" content="FroXiKLIGgc1crOY_QwzVPhSGsIP59HQYXjke2wq7_Q" />
      </head>
      <body
        className={`${cinzel.variable} ${merriweather.variable} ${lato.variable} antialiased`}
      >
        <Preloader />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <CookieBanner />
        <Footer />
      </body>
    </html>
  );
}
