import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ApiResponse } from '@/types/api';

// 예시 데이터
const exampleData = {
  id: '1',
  title: 'Next.js Starter Kit 예시 API',
  description: '이것은 예시 API 엔드포인트입니다.',
  features: [
    '다크모드 토글',
    '공통 레이아웃 (Header, Footer)',
    'react-hook-form 폼 처리',
    'TanStack Query 데이터 페칭',
    'axios HTTP 클라이언트',
    'date-fns 날짜 처리',
    'React Error Boundary',
  ],
  timestamp: new Date().toISOString(),
};

/**
 * GET /api/example
 * 예시 데이터 조회 API
 */
export async function GET(request: NextRequest) {
  // 개발 환경에서는 실제 딜레이를 추가하여 로딩 상태를 확인할 수 있도록 함
  if (process.env.NODE_ENV === 'development') {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  const response: ApiResponse<typeof exampleData> = {
    success: true,
    data: exampleData,
    message: '데이터 조회 성공',
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response);
}

/**
 * POST /api/example
 * 예시 데이터 생성 API
 */
export async function POST(request: NextRequest) {
  try {
    // 요청 본문 파싱
    const body = await request.json();

    // 딜레이 추가 (실제 데이터베이스 저장 시뮬레이션)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response: ApiResponse<any> = {
      success: true,
      data: {
        ...body,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      },
      message: '데이터 생성 성공',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('[API Error]', error);

    return NextResponse.json(
      {
        success: false,
        message: '데이터 생성 실패',
        statusCode: 400,
      },
      { status: 400 }
    );
  }
}
