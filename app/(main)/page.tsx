import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Moon, FileText, Database } from 'lucide-react';

// 홈 페이지
// 스타터킷 소개, 주요 기능 안내, 빠른 시작 가이드
export default function HomePage() {
  return (
    <div className="w-full">
      {/* 히어로 섹션 */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center gap-4 max-w-3xl mx-auto">
            {/* 배지 */}
            <Badge variant="secondary" className="w-fit">
              ✨ 최신 기술 스택
            </Badge>

            {/* 제목 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              빠른 웹 개발을 위한
              <br />
              <span className="text-primary">모던 스타터킷</span>
            </h1>

            {/* 설명 */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Next.js, TypeScript, Tailwind CSS와 최신 라이브러리들로 구성된
              프로덕션 레벨의 스타터킷. 번거로운 초기 설정을 건너뛰고 바로 개발을 시작하세요.
            </p>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/examples/forms">
                <Button size="lg" className="w-full sm:w-auto">
                  예시 보기
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  자세히 보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 기능 섹션 */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 max-w-4xl mx-auto">
            {/* 섹션 제목 */}
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">주요 기능</h2>
              <p className="text-lg text-muted-foreground">
                스타터킷이 제공하는 핵심 기능들을 살펴보세요
              </p>
            </div>

            {/* 기능 카드 그리드 */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* 다크모드 */}
              <Card className="p-6 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Moon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg">다크모드</h3>
                <p className="text-sm text-muted-foreground">
                  Light, Dark, System 모드를 지원하는 다크모드 시스템. localStorage에 자동 저장.
                </p>
                <Link href="/examples/forms" className="text-sm text-primary hover:underline mt-auto">
                  자세히 알아보기 →
                </Link>
              </Card>

              {/* 폼 처리 */}
              <Card className="p-6 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg">폼 처리</h3>
                <p className="text-sm text-muted-foreground">
                  react-hook-form과 Zod로 타입 안전한 폼 처리. 실시간 유효성 검사 지원.
                </p>
                <Link href="/examples/forms" className="text-sm text-primary hover:underline mt-auto">
                  예시 보기 →
                </Link>
              </Card>

              {/* 데이터 페칭 */}
              <Card className="p-6 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg">데이터 페칭</h3>
                <p className="text-sm text-muted-foreground">
                  TanStack Query와 axios로 강력한 데이터 페칭. 자동 캐싱 및 동기화.
                </p>
                <Link href="/examples/data" className="text-sm text-primary hover:underline mt-auto">
                  예시 보기 →
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 빠른 시작 섹션 */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">빠른 시작</h2>
              <p className="text-lg text-muted-foreground">
                3가지 단계로 바로 시작할 수 있습니다
              </p>
            </div>

            <div className="space-y-6">
              {/* 1단계 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">프로젝트 클론</h3>
                  <pre className="bg-background p-4 rounded-lg text-sm overflow-x-auto">
                    <code>git clone &lt;repository-url&gt;</code>
                  </pre>
                </div>
              </div>

              {/* 2단계 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">의존성 설치</h3>
                  <pre className="bg-background p-4 rounded-lg text-sm overflow-x-auto">
                    <code>npm install</code>
                  </pre>
                </div>
              </div>

              {/* 3단계 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">개발 서버 실행</h3>
                  <pre className="bg-background p-4 rounded-lg text-sm overflow-x-auto">
                    <code>npm run dev</code>
                  </pre>
                  <p className="text-sm text-muted-foreground mt-2">
                    http://localhost:3000 에서 확인하세요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
