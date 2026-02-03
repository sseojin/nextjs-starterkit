import {
  format,
  formatDistanceToNow,
  parseISO,
  isValid,
  formatRelative,
} from 'date-fns';
import { ko } from 'date-fns/locale';

// 날짜를 YYYY-MM-DD 형식으로 포맷
// 예: "2026-02-03"
export const formatDate = (date: string | Date): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsedDate)) return '';
  return format(parsedDate, 'yyyy-MM-dd');
};

// 날짜를 한국어 형식으로 포맷
// 예: "2026년 2월 3일"
export const formatDateKo = (date: string | Date): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsedDate)) return '';
  return format(parsedDate, 'yyyy년 M월 d일', { locale: ko });
};

// 날짜와 시간을 함께 포맷
// 예: "2026-02-03 14:30"
export const formatDateTime = (date: string | Date): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsedDate)) return '';
  return format(parsedDate, 'yyyy-MM-dd HH:mm');
};

// 날짜를 한국어로 상대적 시간으로 표현
// 예: "2시간 전", "3일 전"
export const formatRelativeTime = (date: string | Date): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsedDate)) return '';
  return formatDistanceToNow(parsedDate, { addSuffix: true, locale: ko });
};

// 날짜가 유효한지 검사
export const isValidDate = (date: string | Date): boolean => {
  if (typeof date === 'string') {
    const parsedDate = parseISO(date);
    return isValid(parsedDate);
  }
  return isValid(date);
};

// 현재 시각 기준으로 상대적 날짜 포맷
// 예: "어제", "지난주", "1개월 전"
export const formatRelativeDate = (date: string | Date): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsedDate)) return '';
  return formatRelative(parsedDate, new Date(), { locale: ko });
};
