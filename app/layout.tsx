import { config } from "@/utils/config";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Indie_Flower } from "next/font/google";
import "./globals.css";

const indieFlower = Indie_Flower({
  variable: "--font-indie-flower",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: 'jonas messias dev',
  description: config.siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${indieFlower.variable} ${indieFlower.className} antialiased overflow-hidden bg-background`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}