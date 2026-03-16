import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import Navigation from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FindIT — Lost & Found Management System",
  description: "Reuniting people with their lost items.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}