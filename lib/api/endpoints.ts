// API 엔드포인트 정의
// 모든 API 호출이 이 상수를 사용하도록 함으로써 URL 오타 방지 및 유지보수 용이

export const ENDPOINTS = {
  // 사용자 관련 API
  USERS: {
    // 사용자 목록 조회
    LIST: '/users',
    // 사용자 상세 조회
    DETAIL: (id: string) => `/users/${id}`,
    // 사용자 생성
    CREATE: '/users',
    // 사용자 업데이트
    UPDATE: (id: string) => `/users/${id}`,
    // 사용자 삭제
    DELETE: (id: string) => `/users/${id}`,
  },

  // 게시물 관련 API
  POSTS: {
    // 게시물 목록 조회
    LIST: '/posts',
    // 게시물 상세 조회
    DETAIL: (id: string) => `/posts/${id}`,
    // 게시물 생성
    CREATE: '/posts',
    // 게시물 업데이트
    UPDATE: (id: string) => `/posts/${id}`,
    // 게시물 삭제
    DELETE: (id: string) => `/posts/${id}`,
  },

  // 댓글 관련 API
  COMMENTS: {
    // 댓글 목록 조회
    LIST: '/comments',
    // 게시물별 댓글 목록 조회
    BY_POST: (postId: string) => `/posts/${postId}/comments`,
    // 댓글 생성
    CREATE: '/comments',
    // 댓글 업데이트
    UPDATE: (id: string) => `/comments/${id}`,
    // 댓글 삭제
    DELETE: (id: string) => `/comments/${id}`,
  },

  // 예시 API 엔드포인트
  EXAMPLE: {
    // 예시 데이터 조회
    DATA: '/example',
    // 예시 쿼리 결과
    QUERY: '/example/query',
  },

  // 인증 관련 API (추후 구현)
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
} as const;
