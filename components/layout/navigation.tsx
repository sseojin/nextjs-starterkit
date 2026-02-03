'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

// 네비게이션 메뉴 컴포넌트
// 현재 경로를 하이라이트하여 사용자가 어느 페이지에 있는지 명확하게 표시
export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-6">
      {NAVIGATION_ITEMS.map((item) => {
        // 현재 경로와 링크 경로를 비교하여 활성 상태 결정
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + '/');

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              isActive
                ? 'text-primary border-b-2 border-primary pb-1'
                : 'text-muted-foreground'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
