// 인증 페이지 전용 레이아웃
// Header, Footer 없는 중앙 정렬 레이아웃
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
