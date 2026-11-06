import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sterling Bank of Asia | Consumer Loans & International Financing",
  description: "Simulate and apply for your loan online in minutes: Persona Personal Loan, Auto Loan, and Home Improvement Financing with competitive fixed rates. Fast decision.",
  keywords: "consumer loans, personal loans, auto loans, home renovation loans, private financing, sterling bank of asia",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-slate-50 antialiased selection:bg-sterling-gold selection:text-white">
        {children}
      </body>
    </html>
  );
}
