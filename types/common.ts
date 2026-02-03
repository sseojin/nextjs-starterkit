// 로딩/제출 상태
export type Status = 'idle' | 'loading' | 'success' | 'error';

// 선택 옵션 (select, radio 등에 사용)
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

// 페이지네이션 파라미터
export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// API 요청 파라미터 (필터링, 검색 등)
export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}
