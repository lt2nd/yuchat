import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
//import "@radix-ui/themes/styles.css";
//import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "exyuchat",
  description: "Chat app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-[#0B2238]`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme="dark"
          enableSystem={false}
          storageKey="exyuchat-theme"
        >
          
          <ModalProvider />

          {children}

        </ThemeProvider>
      </body>
    </html>
  );
}
