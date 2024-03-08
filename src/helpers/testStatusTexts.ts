import { TestResultStatus } from '@/types';

export const STATUS_ACTIONS: Record<TestResultStatus, string> = {
  NEW: 'Новый',
  PASSED: 'Пройден',
  FAILED: 'Провален',
  BLOCKED: 'Залокирован',
  INVALID: 'Некорректный',
  SKIPPED: 'Пропущен',
};

export const STATUS_TITLE: Record<TestResultStatus, string> = {
  NEW: 'Новый тест',
  PASSED: 'Тест пройден успешно',
  FAILED: 'Тест провален',
  BLOCKED: 'Тест блокирован',
  INVALID: 'Некоректный тест',
  SKIPPED: 'Тест пропущен',
};

export const STATUS_DESCRIPTION: Record<TestResultStatus, string> = {
  NEW: 'Тест создан, но ещё не выполнен',
  PASSED: 'Тест выполнен, система соответствует требованиям',
  FAILED: 'Тест выполнен, система не соответствует требованиям',
  BLOCKED: 'Тест невозможно выполнить',
  INVALID: 'Тест неприменим, некорректен или устарел',
  SKIPPED: 'Тест не выполнен из-за невыполнения предварительных условий или других причин',
};
