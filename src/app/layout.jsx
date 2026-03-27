import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import Navigation from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReduxProvider from "@/redux/provider"
import { ThemeProvider } from 'next-themes';
import AuthProvider from "./AuthProvider";
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReduxProvider>
            <AuthProvider>
              <Navigation />
              <main>{children}</main>
            </AuthProvider>
          </ReduxProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}