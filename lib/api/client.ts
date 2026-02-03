import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { ApiResponse, ApiErrorResponse } from '@/types/api';

// 커스텀 에러 클래스
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public data?: ApiErrorResponse
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// API 클라이언트 인스턴스 생성
const createApiClient = (): AxiosInstance => {
  const apiClient = axios.create({
    // 환경 변수에서 API URL 가져오기 (기본값: http://localhost:3000/api)
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    // 요청 타임아웃 (10초)
    timeout: 10000,
    // 기본 헤더
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 요청 인터셉터: 모든 요청에 토큰 추가 및 로깅
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // localStorage에서 인증 토큰 가져오기
      const token = typeof window !== 'undefined'
        ? localStorage.getItem('auth_token')
        : null;

      // 토큰이 있으면 Authorization 헤더 추가
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // 개발 환경에서 요청 로깅
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, {
          data: config.data,
          params: config.params,
        });
      }

      return config;
    },
    (error) => {
      console.error('[API Request Error]', error);
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터: 에러 처리 및 응답 변환
  apiClient.interceptors.response.use(
    (response: AxiosResponse<ApiResponse<any>>) => {
      // 개발 환경에서 응답 로깅
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API] Response Status: ${response.status}`, {
          data: response.data,
        });
      }

      // 응답 데이터의 data 필드만 반환 (ApiResponse 래퍼 제거)
      return response.data.data;
    },
    (error: AxiosError<ApiErrorResponse>) => {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || error.message || '알 수 없는 오류 발생';

      // 에러 로깅
      console.error('[API Error]', {
        status,
        message,
        data: error.response?.data,
        url: error.config?.url,
      });

      // 인증 만료 (401) 처리
      if (status === 401) {
        // localStorage에서 토큰 제거
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          // 로그인 페이지로 리다이렉트 (추후 인증 시스템 추가 시)
          // window.location.href = '/login';
        }
      }

      // 커스텀 에러 객체 생성
      const apiError = new ApiError(status, message, error.response?.data);
      return Promise.reject(apiError);
    }
  );

  return apiClient;
};

// API 클라이언트 인스턴스 생성
const apiClient = createApiClient();

// 제네릭 메서드로 타입 안전한 API 호출 제공
export const api = {
  /**
   * GET 요청
   * @template T - 응답 데이터 타입
   * @param url - 요청 URL
   * @param config - axios 설정 객체
   * @returns 응답 데이터
   */
  get<T>(url: string, config = {}) {
    return apiClient.get<ApiResponse<T>>(url, config).then(res => res as unknown as T);
  },

  /**
   * POST 요청
   * @template T - 응답 데이터 타입
   * @param url - 요청 URL
   * @param data - 요청 본문 데이터
   * @param config - axios 설정 객체
   * @returns 응답 데이터
   */
  post<T>(url: string, data: unknown, config = {}) {
    return apiClient.post<ApiResponse<T>>(url, data, config).then(res => res as unknown as T);
  },

  /**
   * PUT 요청
   * @template T - 응답 데이터 타입
   * @param url - 요청 URL
   * @param data - 요청 본문 데이터
   * @param config - axios 설정 객체
   * @returns 응답 데이터
   */
  put<T>(url: string, data: unknown, config = {}) {
    return apiClient.put<ApiResponse<T>>(url, data, config).then(res => res as unknown as T);
  },

  /**
   * PATCH 요청
   * @template T - 응답 데이터 타입
   * @param url - 요청 URL
   * @param data - 요청 본문 데이터
   * @param config - axios 설정 객체
   * @returns 응답 데이터
   */
  patch<T>(url: string, data: unknown, config = {}) {
    return apiClient.patch<ApiResponse<T>>(url, data, config).then(res => res as unknown as T);
  },

  /**
   * DELETE 요청
   * @template T - 응답 데이터 타입
   * @param url - 요청 URL
   * @param config - axios 설정 객체
   * @returns 응답 데이터
   */
  delete<T>(url: string, config = {}) {
    return apiClient.delete<ApiResponse<T>>(url, config).then(res => res as unknown as T);
  },
};

export default apiClient;
