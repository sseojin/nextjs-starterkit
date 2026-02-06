'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';

// UI 컴포넌트
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

// 공유 컴포넌트
import { LoadingSpinner } from '@/components/shared/loading-spinner';

// 검증
import { loginFormSchema, type LoginFormData } from '@/lib/validations/forms';

export default function LoginPage() {
  // 로딩 상태 (API 호출 중)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 서버 에러 메시지
  const [serverError, setServerError] = useState<string | null>(null);

  // 비밀번호 표시/숨김 상태
  const [showPassword, setShowPassword] = useState(false);

  // Next.js 라우터 (리다이렉션용)
  const router = useRouter();

  // react-hook-form 초기화
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 폼 제출 핸들러
  const onSubmit = async (data: LoginFormData) => {
    // 1단계: 로딩 상태 시작
    setIsSubmitting(true);
    setServerError(null);

    try {
      // 2단계: Mock API 시뮬레이션 (2초 딜레이)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 3단계: 토큰 저장 및 홈으로 리다이렉트
      localStorage.setItem('auth_token', `mock_token_${Date.now()}`);
      router.push('/');
    } catch (error) {
      // 4단계: 에러 처리
      setServerError('로그인에 실패했습니다. 다시 시도해주세요.');
      console.error('로그인 에러:', error);
    } finally {
      // 5단계: 로딩 상태 종료
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg border-border/50">
      {/* 카드 헤더 */}
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold">로그인</CardTitle>
        <CardDescription>
          이메일과 비밀번호를 입력해주세요
        </CardDescription>
      </CardHeader>

      {/* 카드 콘텐츠 (폼) */}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* 이메일 필드 */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      autoComplete="email"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 비밀번호 필드 */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="비밀번호를 입력하세요"
                        autoComplete="current-password"
                        {...field}
                        disabled={isSubmitting}
                      />
                      {/* 비밀번호 표시/숨김 토글 버튼 */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isSubmitting}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">
                          {showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 서버 에러 메시지 */}
            {serverError && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {serverError}
              </div>
            )}

            {/* 로그인 버튼 */}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">로그인 중...</span>
                </>
              ) : (
                '로그인하기'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      {/* 카드 푸터 (링크) */}
      <CardFooter className="flex flex-col gap-4">
        {/* 구분선 */}
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              또는
            </span>
          </div>
        </div>

        {/* 회원가입 링크 */}
        <div className="text-center text-sm">
          <span className="text-muted-foreground">계정이 없으신가요?</span>{' '}
          <Link
            href="/signup"
            className="font-medium text-primary hover:underline"
          >
            회원가입
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
