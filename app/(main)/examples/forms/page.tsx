'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/forms';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSpinner } from '@/components/shared/loading-spinner';

// 폼 처리 예시 페이지
// react-hook-form + Zod를 사용한 폼 처리 데모
export default function FormsExamplePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // react-hook-form 초기화
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  // 폼 제출 핸들러
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // API 호출 시뮬레이션 (2초 딜레이)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('폼 제출:', data);

      // 성공 상태 설정
      setSubmitSuccess(true);

      // 폼 리셋
      form.reset();

      // 2초 후 성공 메시지 숨기기
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('폼 제출 오류:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">폼 처리 예시</h1>
            <p className="text-lg text-muted-foreground">
              react-hook-form과 Zod를 사용한 타입 안전한 폼 처리 예시입니다.
              실시간 유효성 검사를 지원합니다.
            </p>
          </div>

          {/* 성공 메시지 */}
          {submitSuccess && (
            <Card className="mb-6 p-4 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
              <p className="text-green-800 dark:text-green-200 font-medium">
                ✓ 폼이 성공적으로 제출되었습니다!
              </p>
            </Card>
          )}

          {/* 폼 */}
          <Card className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* 이름 필드 */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="홍길동"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        최소 2자 이상, 최대 50자까지 입력 가능합니다.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        올바른 이메일 형식을 입력해주세요.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 제목 필드 */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>제목</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="문의 제목을 입력해주세요"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        최소 5자 이상, 최대 100자까지 입력 가능합니다.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 메시지 필드 */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>메시지</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="자세한 내용을 입력해주세요..."
                          className="min-h-[120px]"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        최소 10자 이상, 최대 1000자까지 입력 가능합니다.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 제출 버튼 */}
                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[120px]"
                  >
                    {isSubmitting ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      '제출하기'
                    )}
                  </Button>

                  {/* 리셋 버튼 */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                    disabled={isSubmitting}
                  >
                    초기화
                  </Button>
                </div>
              </form>
            </Form>
          </Card>

          {/* 설명 */}
          <div className="mt-8 space-y-4">
            <div>
              <h3 className="font-bold mb-2">✨ 이 예시의 특징</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Zod 스키마로 타입 안전한 유효성 검사</li>
                <li>✓ 실시간 필드 유효성 검사 (입력 중 에러 표시)</li>
                <li>✓ 폼 제출 시 종합 유효성 검사</li>
                <li>✓ 로딩 상태 중 폼 비활성화</li>
                <li>✓ 제출 성공 후 폼 자동 리셋</li>
                <li>✓ 명확한 필드 설명 및 에러 메시지</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-2">📝 유효성 검사 규칙</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 이름: 2-50자</li>
                <li>• 이메일: 올바른 이메일 형식</li>
                <li>• 제목: 5-100자</li>
                <li>• 메시지: 10-1000자</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
