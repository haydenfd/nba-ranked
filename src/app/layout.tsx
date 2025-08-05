'use client'
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode, useState } from "react";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

// export const metadata: Metadata = {
//   title: "NBA Ranked",
//   description: "NBA-themed ranking game",
// };

// function QueryProvider({ children }: { children: ReactNode }) {
//   const [client] = useState(() => new QueryClient());

//   return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
// }



export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >  
          {children}
      </body>
    </html>
  );
}
