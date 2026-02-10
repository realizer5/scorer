import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: process.env.NEXT_PUBLIC_BASE_URL,
    title: "Crick Track",
    description: "Cricket Local Tournament Scoring and Management",
    verification: { google: "KBYcsTt2KFPvNl2ENwA3VQkE-OrzEjS_J706xELeIL8" },
    openGraph: {
        title: "Crick Track",
        description: "Cricket Local Tournament Scoring and Management",
        images: "/icon.png",
    },
    keywords:
        "cricktrack, cricket, score, tournament, realizer, scorer, cricket score",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased px-4`}>
                <ThemeProvider
                    attribute={"class"}
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
