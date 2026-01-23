import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "@/components/WalletProvider";
import { AppKitInit } from "@/components/AppKitInit";

export const metadata: Metadata = {
  title: "APEX Airways | Fly Better",
  description: "Merchant Demo of APEX Airways",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <AppKitInit />
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
