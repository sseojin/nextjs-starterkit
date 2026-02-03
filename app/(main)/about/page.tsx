import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TECH_STACK } from '@/lib/constants';

// 소개 페이지
// 프로젝트 소개, 기술 스택, 폴더 구조 설명
export default function AboutPage() {
  return (
    <div className="w-full py-12 md:py-24">
      <div className="container mx-auto px-4">
        {/* 페이지 헤더 */}
        <div className="max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Next.js Starter Kit
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            프로덕션 레벨의 Next.js 프로젝트를 빠르게 시작할 수 있는 모던 스타터킷입니다.
            타입 안전성, 최신 라이브러리, 모던 개발 패턴을 포함하고 있습니다.
          </p>
        </div>

        {/* 기술 스택 섹션 */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8">기술 스택</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {TECH_STACK.map((stack) => (
              <Card key={stack.category} className="p-6">
                <h3 className="font-bold text-lg mb-4">{stack.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {stack.items.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 폴더 구조 섹션 */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">폴더 구조</h2>
          <Card className="p-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`claude-nextjs-starters/
├── app/                          # Next.js App Router
│   ├── (main)/                   # 메인 레이아웃 그룹
│   │   ├── page.tsx              # 홈 페이지
│   │   ├── about/
│   │   │   └── page.tsx          # 소개 페이지
│   │   ├── examples/
│   │   │   ├── forms/
│   │   │   │   └── page.tsx      # 폼 처리 예시
│   │   │   └── data/
│   │   │       └── page.tsx      # 데이터 페칭 예시
│   │   └── layout.tsx            # 공통 레이아웃
│   ├── api/                      # API 라우트
│   │   └── example/
│   │       └── route.ts          # 예시 API
│   ├── globals.css               # Tailwind CSS 설정
│   ├── layout.tsx                # 루트 레이아웃
│   └── favicon.ico               # 파비콘
│
├── components/                   # React 컴포넌트
│   ├── ui/                       # shadcn/ui 컴포넌트
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── layout/                   # 레이아웃 컴포넌트
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── navigation.tsx
│   ├── shared/                   # 공유 컴포넌트
│   │   ├── theme-toggle.tsx
│   │   ├── error-boundary.tsx
│   │   └── loading-spinner.tsx
│   └── providers/                # Context Providers
│       ├── theme-provider.tsx
│       └── query-provider.tsx
│
├── hooks/                        # 커스텀 훅
│   └── use-toast.ts              # shadcn/ui Toast 훅
│
├── lib/                          # 유틸리티
│   ├── utils.ts                  # cn() 함수
│   ├── constants.ts              # 상수 정의
│   ├── api/
│   │   ├── client.ts             # axios 클라이언트
│   │   └── endpoints.ts          # API 엔드포인트
│   ├── validations/
│   │   ├── common.ts             # 공통 Zod 스키마
│   │   └── forms.ts              # 폼 Zod 스키마
│   └── utils/
│       └── date.ts               # date-fns 유틸리티
│
├── types/                        # TypeScript 타입
│   ├── api.ts                    # API 응답 타입
│   └── common.ts                 # 공통 타입
│
├── public/                       # 정적 파일
├── .env.local                    # 환경 변수
├── package.json                  # 패키지 설정
├── tsconfig.json                 # TypeScript 설정
└── README.md                     # 프로젝트 문서`}</code>
            </pre>
          </Card>
        </div>

        {/* 핵심 기능 섹션 */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-3xl font-bold mb-8">핵심 기능</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-2">🎨 다크모드 시스템</h3>
              <p className="text-muted-foreground">
                next-themes를 사용한 Light, Dark, System 모드 지원. 사용자 설정이 localStorage에 자동 저장됩니다.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">📝 폼 처리</h3>
              <p className="text-muted-foreground">
                react-hook-form과 Zod를 조합하여 타입 안전한 폼 처리. 실시간 유효성 검사와 명확한 에러 메시지를 제공합니다.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">🔄 데이터 페칭</h3>
              <p className="text-muted-foreground">
                TanStack Query(React Query)로 강력한 서버 상태 관리. axios를 사용한 타입 안전 HTTP 클라이언트.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">🛠️ 개발 도구</h3>
              <p className="text-muted-foreground">
                React Query Devtools, TypeScript 엄격 모드, ESLint 설정으로 안정적인 개발 환경을 제공합니다.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">⚠️ 에러 처리</h3>
              <p className="text-muted-foreground">
                react-error-boundary로 에러를 선언적으로 처리. axios interceptor로 API 에러를 일관되게 관리합니다.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">📅 날짜 처리</h3>
              <p className="text-muted-foreground">
                date-fns를 사용한 경량 날짜 처리. 한국어 로케일 지원과 다양한 포맷팅 함수를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
