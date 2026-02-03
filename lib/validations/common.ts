import { z } from 'zod';

// 이메일 유효성 검사 스키마
export const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요')
  .email('올바른 이메일 형식이 아닙니다')
  .toLowerCase();

// 비밀번호 유효성 검사 스키마
// 최소 8자, 대문자 1개, 소문자 1개, 숫자 1개 포함
export const passwordSchema = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
  .regex(/[A-Z]/, '대문자를 포함해야 합니다')
  .regex(/[a-z]/, '소문자를 포함해야 합니다')
  .regex(/[0-9]/, '숫자를 포함해야 합니다');

// 이름 유효성 검사 스키마
export const nameSchema = z
  .string()
  .min(2, '이름은 최소 2자 이상이어야 합니다')
  .max(50, '이름은 최대 50자까지 가능합니다')
  .trim();

// 제목 유효성 검사 스키마
export const titleSchema = z
  .string()
  .min(1, '제목을 입력해주세요')
  .min(5, '제목은 최소 5자 이상이어야 합니다')
  .max(100, '제목은 최대 100자까지 가능합니다')
  .trim();

// 메시지/내용 유효성 검사 스키마
export const messageSchema = z
  .string()
  .min(1, '메시지를 입력해주세요')
  .min(10, '메시지는 최소 10자 이상이어야 합니다')
  .max(1000, '메시지는 최대 1000자까지 가능합니다')
  .trim();

// URL 유효성 검사 스키마
export const urlSchema = z
  .string()
  .url('올바른 URL 형식이 아닙니다')
  .optional()
  .or(z.literal(''));

// 전화번호 유효성 검사 스키마 (한국 형식)
export const phoneSchema = z
  .string()
  .regex(
    /^(01[0-9]-?\d{3,4}-?\d{4})|(0\d{1,2}-?\d{3,4}-?\d{4})$/,
    '올바른 전화번호 형식이 아닙니다'
  );
