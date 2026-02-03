import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

// 메인 레이아웃 그룹
// (main) 경로 그룹은 URL에 포함되지 않음
// 모든 페이지에 Header와 Footer를 포함하는 공통 레이아웃 제공
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 헤더 (상단 고정) */}
      <Header />

      {/* 메인 컨텐츠 (남은 공간을 채움) */}
      <main className="flex-1">
        {children}
      </main>

      {/* 푸터 (하단) */}
      <Footer />
    </div>
  );
}
