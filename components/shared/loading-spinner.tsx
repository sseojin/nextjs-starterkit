import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  /**
   * 스피너 크기
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * 로딩 텍스트 (선택사항)
   */
  text?: string;
  /**
   * 추가 클래스명
   */
  className?: string;
}

// 로딩 스피너 컴포넌트
// 데이터 페칭, 폼 제출 등의 로딩 상태를 표시
export function LoadingSpinner({
  size = 'md',
  text,
  className,
}: LoadingSpinnerProps) {
  // 크기별 스피너 아이콘 크기
  const iconSizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
      {/* 회전 애니메이션이 적용된 로더 아이콘 */}
      <Loader2
        className={cn('animate-spin text-primary', iconSizeMap[size])}
        aria-hidden="true"
      />

      {/* 로딩 텍스트 (선택사항) */}
      {text && (
        <p className="text-sm text-muted-foreground">{text}</p>
      )}

      {/* 접근성: 스크린 리더기용 로딩 상태 표시 */}
      <span className="sr-only">로딩 중...</span>
    </div>
  );
}
