"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/utils/provider";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black/90 w-[90%] mx-auto`} >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
