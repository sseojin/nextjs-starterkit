'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

// next-themes의 ThemeProvider를 클라이언트 컴포넌트로 래핑
// attribute: 다크모드 활성화 시 HTML 태그에 적용할 속성
// defaultTheme: 초기 테마 (system은 OS 설정 따름)
// enableSystem: OS 시스템 테마 감지 활성화
// storageKey: localStorage에 저장할 키 이름
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="app-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
