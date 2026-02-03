import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { Github, Twitter, Linkedin } from 'lucide-react';

// 푸터 컴포넌트
// 빠른 링크, 소셜 링크, 저작권 정보를 포함하는 하단 푸터
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        {/* 상단 섹션: 링크와 소셜 아이콘 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {/* 빠른 링크 */}
          <div>
            <h3 className="font-semibold mb-4">빠른 링크</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  소개
                </Link>
              </li>
              <li>
                <Link href="/examples/forms" className="hover:text-primary transition-colors">
                  폼 예시
                </Link>
              </li>
              <li>
                <Link href="/examples/data" className="hover:text-primary transition-colors">
                  데이터 예시
                </Link>
              </li>
            </ul>
          </div>

          {/* 리소스 */}
          <div>
            <h3 className="font-semibold mb-4">리소스</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Next.js
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Tailwind CSS
                </a>
              </li>
              <li>
                <a
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  shadcn/ui
                </a>
              </li>
            </ul>
          </div>

          {/* 소셜 링크 */}
          <div>
            <h3 className="font-semibold mb-4">팔로우</h3>
            <div className="flex gap-4">
              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={SITE_CONFIG.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={SITE_CONFIG.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* 하단 섹션: 저작권 정보 */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">
              개인정보보호정책
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
