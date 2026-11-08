import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import Navbar from "@/components/layout/navbar/navbar";
import './globals.css';
import '@/lib/fontawesome';
import { BRAND } from "@/constants/globals";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: BRAND.name,
    description: BRAND.description,
    icons: BRAND.icons,
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="it" suppressHydrationWarning>
        <head>
            <script dangerouslySetInnerHTML={{
                __html: `
            (function() {
              let theme;
              try { theme = localStorage.getItem('theme'); } catch {}
              const dark = theme === 'dark' ||
                (theme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
              document.documentElement.classList.toggle('dark', dark);
            })()
          `
            }}/>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <Navbar/>
            {children}
        </body>
        </html>
    );
}
