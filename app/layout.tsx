import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import Navbar from "@/components/layout/navbar/navbar";
import './globals.css';
import '@/lib/fontawesome';
import {ThemeProvider} from "@/context/ThemeContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Valerio Tolli | Full Stack Developer",
    description: "Portfolio e Blog di Valerio Tolli, sviluppatore specializzato in React e Next.js",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <script dangerouslySetInnerHTML={{
                __html: `
            (function() {
              const theme = localStorage.getItem('theme') || 
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              if (theme === 'dark') document.documentElement.classList.add('dark');
            })()
          `
            }}/>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ThemeProvider>
            <Navbar/>
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
