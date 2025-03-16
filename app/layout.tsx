import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinanceTracker - Personal Finance Management",
  description:
    "Manage your finances, track expenses, set goals, and get investment recommendations",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import { ReactElement } from "react";
