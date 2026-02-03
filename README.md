# Next.js 범용 스타터킷

빠른 웹 개발을 위한 모던 Next.js 스타터킷입니다. 최신 기술 스택과 프로덕션 레벨의 설정을 포함하고 있으며, 즉시 개발을 시작할 수 있도록 구성되어 있습니다.

## 🎯 주요 특징

### 🎨 다크모드 시스템
- Light, Dark, System 모드 자동 전환
- localStorage에 사용자 설정 저장
- 시스템 설정 자동 감지

### 📝 폼 처리
- react-hook-form과 Zod를 사용한 타입 안전 폼 처리
- 실시간 필드 유효성 검사
- 명확한 에러 메시지 표시

### 🔄 데이터 페칭
- TanStack Query로 강력한 서버 상태 관리
- axios를 사용한 타입 안전 HTTP 클라이언트
- 자동 캐싱, 동기화, 재시도 기능

### 🛠️ 개발자 경험
- TypeScript 엄격 모드
- React Query Devtools 포함
- 에러 경계 (Error Boundary)
- ESLint 설정

### 🎁 추가 기능
- date-fns를 사용한 경량 날짜 처리
- shadcn/ui 컴포넌트 라이브러리
- Tailwind CSS v4 (CSS 변수 기반)
- 반응형 레이아웃 (Header, Footer, Navigation)

## 📦 기술 스택

### 프로덕션 의존성
- **Next.js 16**: React 프레임워크
- **React 19**: UI 라이브러리
- **TypeScript 5**: 타입 안전성
- **Tailwind CSS v4**: 유틸리티 기반 CSS
- **shadcn/ui**: 재사용 가능한 컴포넌트
- **react-hook-form**: 폼 상태 관리
- **zod**: 타입 안전 유효성 검사
- **@tanstack/react-query**: 서버 상태 관리
- **axios**: HTTP 클라이언트
- **date-fns**: 날짜 처리
- **next-themes**: 다크모드 관리
- **react-error-boundary**: 에러 처리
- **lucide-react**: 아이콘 라이브러리

### 개발 의존성
- **@tanstack/react-query-devtools**: Query 디버깅 도구
- **ESLint**: 코드 품질 검사

## 🚀 빠른 시작

### 1. 프로젝트 클론
```bash
git clone <repository-url>
cd claude-nextjs-starters
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
```bash
# .env.local 파일이 이미 준비되어 있습니다
# 필요시 아래 변수들을 수정하세요
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📁 프로젝트 구조

```
claude-nextjs-starters/
├── app/                          # Next.js App Router
│   ├── (main)/                   # 메인 레이아웃 그룹
│   │   ├── page.tsx              # 홈 페이지
│   │   ├── about/                # 소개 페이지
│   │   └── examples/
│   │       ├── forms/            # 폼 처리 데모
│   │       └── data/             # 데이터 페칭 데모
│   ├── api/                      # API 라우트
│   ├── globals.css               # Tailwind 설정
│   └── layout.tsx                # 루트 레이아웃 (Providers)
│
├── components/                   # React 컴포넌트
│   ├── ui/                       # shadcn/ui 컴포넌트
│   ├── layout/                   # 레이아웃 컴포넌트
│   ├── shared/                   # 공유 컴포넌트
│   └── providers/                # Context Providers
│
├── hooks/                        # 커스텀 훅
├── lib/                          # 유틸리티
│   ├── api/                      # API 클라이언트
│   ├── validations/              # Zod 스키마
│   └── utils/                    # 헬퍼 함수
├── types/                        # TypeScript 타입
├── public/                       # 정적 파일
└── .env.local                    # 환경 변수
```

## 📚 사용 예시

### 폼 처리
```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '@/lib/validations/forms';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';

export function MyForm() {
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>이메일</FormLabel>
            <input {...field} />
          </FormItem>
        )}
      />
    </Form>
  );
}
```

### 데이터 페칭
```typescript
'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { ENDPOINTS } from '@/lib/api/endpoints';

export function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get(ENDPOINTS.USERS.LIST),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생</div>;

  return <div>{/* 데이터 표시 */}</div>;
}
```

### 다크모드 토글
```typescript
'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}
```

### 날짜 포맷팅
```typescript
import { formatDateKo, formatRelativeTime } from '@/lib/utils/date';

const date = new Date();
console.log(formatDateKo(date));      // "2026년 2월 3일"
console.log(formatRelativeTime(date)); // "방금 전"
```

## 🧪 테스트 및 빌드

### 개발 환경 테스트
```bash
# 타입 검사
npx tsc --noEmit

# ESLint 실행
npm run lint

# 개발 서버 실행
npm run dev
```

### 프로덕션 빌드
```bash
# 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

## 🎯 다음 단계

스타터킷 구성 후 다음 기능들을 추가로 구현할 수 있습니다:

1. **인증 시스템**
   - NextAuth.js 또는 Clerk 통합
   - JWT 토큰 관리

2. **데이터베이스**
   - Prisma ORM 설정
   - 데이터베이스 마이그레이션

3. **상태 관리**
   - Zustand로 전역 상태 관리
   - 클라이언트 상태 관리

4. **향상된 폼**
   - 파일 업로드
   - 다단계 폼 (Wizard)
   - 실시간 필드 검증

5. **성능 최적화**
   - 이미지 최적화
   - 번들 분석
   - 메모리 누수 방지

6. **배포 설정**
   - GitHub Actions로 CI/CD
   - Vercel 배포 설정
   - 환경 변수 관리

7. **모니터링**
   - Sentry 에러 추적
   - Analytics 통합
   - Performance 모니터링

## 💡 팁 & 트릭

### API 타입 안전성
```typescript
// 타입 안전한 API 호출
const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => api.get<User>(`/users/${userId}`),
});
// data는 User 타입으로 자동 추론됨
```

### Zod 스키마 재사용
```typescript
import { emailSchema, nameSchema } from '@/lib/validations/common';

// 기존 스키마를 조합하여 새 스키마 생성
const userFormSchema = z.object({
  email: emailSchema,
  name: nameSchema,
});
```

### React Query 설정 커스터마이징
```typescript
// lib/api/client.ts에서 기본 설정 변경 가능
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1분
      gcTime: 5 * 60 * 1000, // 5분
      retry: 1,
    },
  },
});
```

### 컴포넌트 경로 단축
```typescript
// tsconfig.json의 path alias 사용
import { Button } from '@/components/ui/button';    // O
import { Button } from '../../../components/ui/button'; // X
```

## 📖 문서

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 공식 문서](https://react.dev)
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [shadcn/ui 문서](https://ui.shadcn.com/docs)
- [react-hook-form 문서](https://react-hook-form.com)
- [TanStack Query 문서](https://tanstack.com/query/latest)

## 🔒 보안 고려사항

1. **환경 변수**
   - `.env.local`은 Git에 커밋하지 마세요
   - 프로덕션 환경에서는 보안 서버에서 변수 관리

2. **인증 토큰**
   - localStorage에 민감한 정보 저장 주의
   - HttpOnly 쿠키 사용 검토

3. **API 통신**
   - HTTPS 사용
   - CORS 설정 확인
   - API 레이트 리미팅 구현

4. **입력 검증**
   - 모든 사용자 입력 검증
   - XSS 방지 (React가 자동 처리하지만 주의 필요)
   - SQL Injection 방지

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 🤝 기여

버그 리포트, 기능 제안, 풀 리퀘스트는 언제든 환영합니다!

## 📧 지원

문제가 있거나 질문이 있으시면 이슈를 작성해주세요.

---

Happy coding! 🎉
