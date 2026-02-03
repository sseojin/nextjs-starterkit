# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 개발 환경 명령어

### 기본 명령어
```bash
npm run dev      # 개발 서버 시작 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 실행
npx tsc --noEmit # TypeScript 타입 체크
```

### 개발 중 유용한 명령어
```bash
# 특정 에러 확인
npm run lint -- --fix  # ESLint 자동 수정

# Next.js 강제 클린 빌드
rm -rf .next && npm run dev

# TypeScript 감시 모드 (타입 에러 실시간 확인)
npx tsc --watch --noEmit
```

## 🏗️ 프로젝트 아키텍처

### 프로바이더 구조 (app/layout.tsx)
```
ErrorBoundary (전역 에러 처리)
└── ThemeProvider (다크모드 상태)
    └── QueryProvider (React Query 상태)
        └── children
```

**중요**: 모든 프로바이더는 root layout에만 설정합니다. 하위 레이아웃에서는 필요한 것만 추가.

### 레이아웃 라우팅 구조
```
app/
├── (main)/              # 동적 레이아웃 그룹
│   ├── page.tsx         # 홈 (/), Header, Navigation, Footer 포함
│   ├── layout.tsx       # (main) 그룹용 레이아웃
│   ├── about/page.tsx   # /about
│   └── examples/        # 예제 페이지들
├── api/                 # API 라우트
└── layout.tsx           # Root 레이아웃 (Providers)
```

**주의**: `app/(main)/layout.tsx`는 Header, Navigation, Footer를 렌더링합니다. 이 레이아웃이 필요 없는 페이지는 다른 레이아웃 그룹(`(auth)`, `(admin)` 등)에 배치하세요.

## 📚 핵심 라이브러리 사용 패턴

### API 클라이언트 (lib/api/client.ts)
```typescript
import { api } from '@/lib/api/client';
import { ENDPOINTS } from '@/lib/api/endpoints';

// 타입 안전한 GET 요청
const data = await api.get<UserType>(ENDPOINTS.USERS.GET_BY_ID(userId));

// POST 요청
const result = await api.post<ResponseType>(ENDPOINTS.USERS.CREATE, {
  name: 'John',
  email: 'john@example.com'
});
```

**특징**:
- axios 기반 + 환경변수 설정 (NEXT_PUBLIC_API_URL)
- 요청/응답 인터셉터로 로깅 및 토큰 처리
- 401 에러 시 자동으로 토큰 제거 (추후 로그인 리다이렉트 추가)
- ApiResponse 래퍼 자동 제거 (응답의 data 필드만 반환)
- 제네릭으로 타입 안전성 제공

### React Query (lib/api/client.ts의 QueryProvider)
```typescript
'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { ENDPOINTS } from '@/lib/api/endpoints';

// 데이터 조회
const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => api.get(ENDPOINTS.USERS.GET_BY_ID(userId)),
});

// 데이터 생성/수정
const mutation = useMutation({
  mutationFn: (data) => api.post(ENDPOINTS.USERS.CREATE, data),
  onSuccess: () => {
    // 캐시 무효화
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
```

**설정위치**: `components/providers/query-provider.tsx`에서 QueryClient 기본 설정 (타임아웃, 캐시 시간 등)

### 폼 처리 (react-hook-form + zod)
```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '@/lib/validations/forms';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';

export function ContactForm() {
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { email: '', message: '' },
  });

  const onSubmit = async (data) => {
    try {
      const result = await api.post(ENDPOINTS.CONTACT, data);
      // 성공 처리
    } catch (error) {
      // 에러 처리 (폼의 에러 상태는 자동 관리)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <input {...field} className={error && 'border-red-500'} />
              {error && <span className="text-red-500">{error.message}</span>}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
```

**주의사항**:
- Zod 스키마는 `lib/validations/`에 정의
- 공통 스키마 (이메일, URL 등)는 `lib/validations/common.ts`에 정의하고 재사용
- 폼 에러는 자동으로 관리되므로 수동 에러 처리 불필요

### 다크모드 (next-themes)
```typescript
'use client';

import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
```

**특징**:
- 자동 시스템 감지 (System, Light, Dark)
- localStorage에 저장
- Hydration 안정성 (suppressHydrationWarning 사용)
- CSS 변수로 스타일링

### 타입 정의
**위치**: `types/api.ts`, `types/common.ts`
- API 요청/응답 타입은 `types/api.ts`
- 페이지네이션, 공통 타입은 `types/common.ts`
- 컴포넌트 props 타입은 각 파일에서 정의

## 🧩 컴포넌트 조직화

### 디렉토리 구조
```
components/
├── ui/              # shadcn/ui 컴포넌트 (수정 금지)
├── layout/          # Header, Footer, Navigation
├── providers/       # Context/Provider 컴포넌트
└── shared/          # 공유 컴포넌트 (ErrorBoundary, LoadingSpinner, ThemeToggle)
```

### 새 컴포넌트 추가 가이드
- **UI 컴포넌트** (버튼, 입력, 카드 등): `components/ui/` - shadcn/ui 사용
- **페이지 레이아웃**: `components/layout/`
- **기능성 공유 컴포넌트**: `components/shared/`
- **페이지별 컴포넌트**: `app/(main)/page-name/components/` (선택사항)

## 🔧 환경 설정

### 주요 설정 파일
- **tsconfig.json**: 경로 alias `@/*` 설정 (절대 경로 import)
- **next.config.ts**: Next.js 커스텀 설정
- **.env.local**: 환경 변수 (클라이언트용은 NEXT_PUBLIC_ prefix)

### 환경 변수
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api     # API 기본 URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000        # 사이트 URL
# 서버만 사용할 변수는 NEXT_PUBLIC_ 없이 정의
DATABASE_URL=...
```

## 📋 유효성 검사 (Zod)

### 폼 검증 (lib/validations/forms.ts)
```typescript
import { z } from 'zod';
import { emailSchema, nameSchema } from './common';

export const loginFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, '최소 8자 이상'),
});
```

### 공통 스키마 (lib/validations/common.ts)
```typescript
export const emailSchema = z.string().email('유효한 이메일 주소를 입력하세요');
export const urlSchema = z.string().url('유효한 URL을 입력하세요');
```

## ⚙️ API 엔드포인트 관리

**위치**: `lib/api/endpoints.ts`

```typescript
export const ENDPOINTS = {
  USERS: {
    LIST: '/users',
    GET_BY_ID: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },
};
```

**규칙**: 백엔드 API 변경 시 이 파일만 수정하면 전체 코드 반영 가능

## 🎨 스타일링

### Tailwind CSS v4
- CSS 변수 기반 설정
- `app/globals.css`에 전역 스타일 정의
- 다크모드는 `dark:` prefix 사용

### 클래스명 병합
```typescript
import { cn } from '@/lib/utils';

// 동적 클래스명 병합 (shadcn/ui 패턴)
export function Button({ className, ...props }) {
  return <button className={cn('px-4 py-2 bg-blue-500', className)} {...props} />;
}
```

## 🛠️ 디버깅

### React Query Devtools
개발 환경에서 자동 활성화 (QueryProvider 설정)
- 캐시 상태 확인
- 요청/응답 디버깅
- 캐시 시간 설정 확인

### 에러 처리
- **전역 에러**: ErrorBoundary (app/layout.tsx)
- **API 에러**: api.ts의 응답 인터셉터 자동 처리
- **폼 에러**: react-hook-form 자동 관리

### 로깅
```typescript
// 개발 환경에서만 로깅 (lib/api/client.ts에 설정)
console.log(`[API] ${method} ${url}`);
console.error('[API Error]', { status, message, url });
```

## ⚡ 성능 최적화 팁

1. **이미지**: Next.js Image 컴포넌트 사용
2. **번들 분석**: `npm run build` 후 `.next/static` 확인
3. **렌더링**: 불필요한 'use client' 제거 (서버 컴포넌트 기본)
4. **캐싱**: React Query의 staleTime, gcTime 조정 (QueryProvider)
5. **타입**: any 사용 금지, 항상 명시적 타입 정의

## 🚨 주의사항

### 라우팅
- `app/(main)/` 레이아웃 그룹 사용 (Header, Footer 포함)
- 새 레이아웃 그룹이 필요하면 다른 이름 사용 (`(auth)`, `(admin)` 등)

### 상태 관리
- 서버 상태: React Query 사용
- 클라이언트 상태: Context API 또는 Zustand 추가
- 절대 localStorage에 민감 정보 저장하지 말 것 (토큰 제외)

### API 통신
- 환경변수 NEXT_PUBLIC_API_URL 수정
- 인증 토큰은 localStorage에 저장 (API 클라이언트에서 자동 처리)
- 401 에러 시 자동으로 토큰 제거됨

### TypeScript
- strict 모드 활성화 (tsconfig.json)
- any 사용 금지
- 제네릭으로 타입 안전성 확보
