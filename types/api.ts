// API 응답 기본 형식
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp?: string;
}

// 페이지네이션이 포함된 API 응답 형식
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}

// API 에러 응답 형식
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

// 예시: 사용자 타입
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// 예시: 게시물 타입
export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

// 예시: 댓글 타입
export interface Comment {
  id: string;
  content: string;
  author: User;
  postId: string;
  createdAt: string;
  updatedAt: string;
}
