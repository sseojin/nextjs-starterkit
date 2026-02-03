import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { Navigation } from './navigation';
import { ThemeToggle } from '@/components/shared/theme-toggle';

// 헤더 컴포넌트
// 로고, 네비게이션 메뉴, 다크모드 토글을 포함하는 상단 헤더
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* 로고 및 사이트명 */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="hidden sm:inline font-bold text-lg">
            {SITE_CONFIG.name}
          </span>
        </Link>

        {/* 중앙 네비게이션 */}
        <Navigation />

        {/* 오른쪽 영역: 다크모드 토글 */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
