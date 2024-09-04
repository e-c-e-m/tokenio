import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { SearchWrapper } from "../context/SearchContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Token.io",
  description: "A website which allows you to seamlessly view and interact with tokens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchWrapper>
          {children}
        </SearchWrapper>
      </body>
    </html>
  );
}
