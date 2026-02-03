'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// TanStack Query Provider 컴포넌트
// 앱 전체에서 useQuery, useMutation 등을 사용할 수 있도록 제공
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // QueryClient 인스턴스 생성 (상태 업데이트를 피하기 위해 useState 사용)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          // 쿼리 기본 설정
          queries: {
            // 데이터가 신선하다고 간주되는 시간 (1분)
            staleTime: 60 * 1000,
            // 데이터를 다시 가져올 때 최대 재시도 횟수 (1회)
            retry: 1,
            // 데이터를 캐시에 유지할 시간 (5분)
            gcTime: 5 * 60 * 1000,
          },
          // 변이(POST, PUT, DELETE) 기본 설정
          mutations: {
            // 변이 실패 시 재시도 횟수
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* React Query Devtools: 개발 중 쿼리 상태 디버깅 도구 */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
