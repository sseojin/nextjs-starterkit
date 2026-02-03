import { z } from 'zod';
import {
  emailSchema,
  passwordSchema,
  nameSchema,
  titleSchema,
  messageSchema,
} from './common';

/**
 * 연락처 폼 스키마
 * 홈페이지의 연락처 양식에서 사용
 */
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: titleSchema,
  message: messageSchema,
});

// TypeScript 타입 추출
export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * 로그인 폼 스키마
 * 추후 인증 시스템 구현 시 사용
 */
export const loginFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

/**
 * 회원가입 폼 스키마
 * 추후 인증 시스템 구현 시 사용
 */
export const signupFormSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export type SignupFormData = z.infer<typeof signupFormSchema>;

/**
 * 프로필 수정 폼 스키마
 * 추후 사용자 프로필 수정 시 사용
 */
export const profileFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  bio: z
    .string()
    .max(500, '소개는 최대 500자까지 가능합니다')
    .optional()
    .or(z.literal('')),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;
