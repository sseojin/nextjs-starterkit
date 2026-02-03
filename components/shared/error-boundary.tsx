'use client';

import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 에러 폴백 UI 컴포넌트
// 에러가 발생했을 때 표시할 UI
function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-2 text-destructive">
          오류가 발생했습니다
        </h2>
        <p className="text-sm text-muted-foreground mb-4 break-words">
          {error.message || '알 수 없는 오류가 발생했습니다.'}
        </p>
        <Button
          onClick={resetErrorBoundary}
          className="w-full"
          variant="default"
        >
          다시 시도
        </Button>
      </Card>
    </div>
  );
}

// ErrorBoundary 래퍼 컴포넌트
// 전체 앱을 감싸서 에러를 캐치하고 처리
export function ErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        // 에러 로깅 (개발 환경에서는 console, 프로덕션에서는 Sentry, LogRocket 등)
        console.error('Error Boundary caught:', error);
        console.error('Error info:', info);
      }}
      onReset={() => {
        // 에러 복구 시 실행 (페이지 새로고침)
        window.location.href = '/';
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
