'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { ENDPOINTS } from '@/lib/api/endpoints';
import { formatDateKo, formatRelativeTime } from '@/lib/utils/date';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

// API 응답 타입
interface ExampleData {
  id: string;
  title: string;
  description: string;
  features: string[];
  timestamp: string;
}

// 데이터 페칭 예시 페이지
// TanStack Query와 axios를 사용한 데이터 페칭 데모
export default function DataExamplePage() {
  // useQuery로 데이터 페칭
  // 자동 캐싱, 백그라운드 동기화, 재시도 기능 포함
  const {
    data: responseData,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['example-data'],
    queryFn: async () => {
      const response = await api.get<ExampleData>(ENDPOINTS.EXAMPLE.DATA);
      return response;
    },
    // 데이터 신선도 (1분)
    staleTime: 60 * 1000,
  });

  return (
    <div className="w-full py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">데이터 페칭 예시</h1>
            <p className="text-lg text-muted-foreground">
              TanStack Query(React Query)와 axios를 사용한 데이터 페칭 예시입니다.
              자동 캐싱, 동기화, 로딩 및 에러 상태 처리를 지원합니다.
            </p>
          </div>

          {/* 컨트롤 버튼 */}
          <div className="mb-6 flex gap-2">
            <Button
              onClick={() => refetch()}
              disabled={isLoading || isFetching}
              variant="outline"
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {isFetching ? '새로고침 중...' : '새로고침'}
            </Button>
          </div>

          {/* 로딩 상태 */}
          {isLoading && (
            <Card className="p-8 flex justify-center">
              <LoadingSpinner text="데이터를 불러오는 중입니다..." />
            </Card>
          )}

          {/* 에러 상태 */}
          {isError && (
            <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-900 dark:text-red-100 mb-2">
                    오류가 발생했습니다
                  </p>
                  <p className="text-sm text-red-800 dark:text-red-200 mb-4">
                    {error instanceof Error ? error.message : '데이터를 불러올 수 없습니다'}
                  </p>
                  <Button
                    onClick={() => refetch()}
                    variant="outline"
                    size="sm"
                  >
                    다시 시도
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* 데이터 표시 */}
          {responseData && !isLoading && (
            <div className="space-y-4">
              {/* 메인 카드 */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {responseData.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {responseData.description}
                    </p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                </div>

                <Separator className="my-4" />

                {/* 기능 목록 */}
                <div>
                  <h3 className="font-bold text-sm mb-3">포함된 기능</h3>
                  <div className="flex flex-wrap gap-2">
                    {responseData.features.map((feature) => (
                      <Badge key={feature} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>

              {/* 메타데이터 */}
              <Card className="p-4 bg-muted/50">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">ID</p>
                    <p className="font-mono text-xs">{responseData.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      조회 시간
                    </p>
                    <p className="text-xs">
                      {formatDateKo(responseData.timestamp)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      상대 시간
                    </p>
                    <p className="text-xs">
                      {formatRelativeTime(responseData.timestamp)}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* 정보 섹션 */}
          <div className="mt-8 space-y-4">
            <div>
              <h3 className="font-bold mb-2">✨ 이 예시의 특징</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ useQuery로 선언적 데이터 페칭</li>
                <li>✓ 자동 캐싱 및 백그라운드 동기화</li>
                <li>✓ 로딩, 에러, 성공 상태 처리</li>
                <li>✓ 수동 새로고침 기능</li>
                <li>✓ 타입 안전한 API 호출</li>
                <li>✓ date-fns를 사용한 날짜 포맷팅</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-2">🔧 세부 정보</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• API: GET /api/example</li>
                <li>• 캐시 시간: 1분</li>
                <li>• 재시도: 1회</li>
                <li>• 타임아웃: 10초</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-2">💡 유용한 팁</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  • React Query DevTools로 쿼리 상태를 실시간으로 모니터링할 수
                  있습니다 (우측 하단)
                </li>
                <li>
                  • useQuery의 설정을 변경하여 캐시 시간, 재시도 횟수 등을
                  커스텀할 수 있습니다
                </li>
                <li>
                  • useMutation을 사용하면 데이터 수정(POST, PUT, DELETE)을
                  처리할 수 있습니다
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
