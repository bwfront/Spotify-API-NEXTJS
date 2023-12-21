import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Provider from "@/lib/provider";
import NavBar from "@/components/NavBar";
import { TokenProvider } from "@/contexts/TokenContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify API AUTH",
  description: "Spotify API AUTH Template",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <TokenProvider>
            <NavBar />
            {children}
          </TokenProvider>
        </body>
      </Provider>
    </html>
  );
}
