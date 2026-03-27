import type { Metadata } from "next";
import "./globals.css";
import { Roboto, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const interHeading = Inter({subsets:['latin'],variable:'--font-heading'});

const roboto = Roboto({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Framer Form Builder",
  description: "Build and export production-ready Framer forms with live preview and code generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", roboto.variable, interHeading.variable)}>
      <body>{children}</body>
    </html>
  );
}
