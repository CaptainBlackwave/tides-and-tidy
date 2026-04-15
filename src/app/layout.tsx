import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tides & Tidy - Professional Cleaning Services",
  description: "Expert cleaning services for homes and businesses. Our trained specialists deliver thorough, reliable service that transforms your space into a pristine environment.",
  keywords: ["cleaning services", "professional cleaning", "home cleaning", "office cleaning", "deep cleaning", "move in move out cleaning"],
  authors: [{ name: "Tides & Tidy" }],
  openGraph: {
    title: "Tides & Tidy - Professional Cleaning Services",
    description: "Expert cleaning. Spotless results every time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${archivo.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
