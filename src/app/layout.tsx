import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pienelien",
    template: "%s | Pienelien",
  },
  description: "Pienelien — klein geluk, groots geliefd.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--brand-bg)] text-[var(--brand-text)]">
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <AnnouncementBar />
            <Header />

            <div className="flex-1">
              {children}
            </div>

            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
