"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalProvider } from "@/context/GlobalContext";
//import ClientSessionProvider from "../../components/ClientSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <GlobalProvider>
            {children}
          </GlobalProvider>
      </body>
    </html>
  );
}
