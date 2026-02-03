import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ErrorBoundary } from "@/components/shared/error-boundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Starter Kit",
  description: "빠른 웹 개발을 위한 모던 Next.js 스타터킷",
  keywords: ["nextjs", "typescript", "tailwindcss", "shadcn/ui"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ErrorBoundary: 전체 앱의 에러를 캐치 */}
        <ErrorBoundary>
          {/* ThemeProvider: 다크모드 시스템 관리 */}
          <ThemeProvider>
            {/* QueryProvider: TanStack Query 상태 관리 */}
            <QueryProvider>
              {children}
            </QueryProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
