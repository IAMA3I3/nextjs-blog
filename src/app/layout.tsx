import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { StateProvider } from "@/context/StateContext";

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
    template: "%s | Bloggers Blog",
    default: "Bloggers Blog"
  },
  description: "My next js blog app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StateProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased cursor-default`}
        >
          {children}
          <Toaster position="bottom-right" />
        </body>
      </StateProvider>
    </html>
  );
}
