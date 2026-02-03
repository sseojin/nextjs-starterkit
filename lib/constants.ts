// 네비게이션 메뉴 아이템 정의
// 헤더의 네비게이션 메뉴에 표시될 링크 목록
export const NAVIGATION_ITEMS = [
  { href: '/', label: '홈' },
  { href: '/about', label: '소개' },
  { href: '/examples/forms', label: '폼 예시' },
  { href: '/examples/data', label: '데이터 예시' },
] as const;

// 사이트 전체 설정
export const SITE_CONFIG = {
  name: 'Next.js Starter Kit',
  description: '빠른 웹 개발을 위한 모던 스타터킷',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  links: {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
} as const;

// 기술 스택 정보 (About 페이지에서 사용)
export const TECH_STACK = [
  {
    category: '프론트엔드 프레임워크',
    items: ['Next.js 16', 'React 19', 'TypeScript 5'],
  },
  {
    category: '스타일링',
    items: ['Tailwind CSS v4', 'CSS Variables'],
  },
  {
    category: 'UI 컴포넌트',
    items: ['shadcn/ui', 'Radix UI', 'lucide-react'],
  },
  {
    category: '상태 관리 & 데이터',
    items: ['TanStack Query', 'react-hook-form', 'Zod'],
  },
  {
    category: '유틸리티',
    items: ['axios', 'date-fns', 'next-themes'],
  },
  {
    category: '개발 도구',
    items: ['ESLint', 'TypeScript', 'TailwindCSS'],
  },
] as const;
