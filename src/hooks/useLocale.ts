import { useCallback } from 'react';
import { ptBR } from '../config/locales/pt-BR';

type PathsToStringProps<T> = T extends string ? [] : {
  [K in keyof T]: [K, ...PathsToStringProps<T[K]>]
}[keyof T];

type Join<T extends string[], D extends string> =
  T extends [] ? never :
  T extends [infer F] ? F :
  T extends [infer F, ...infer R] ?
  F extends string ?
  `${F}${D}${Join<Extract<R, string[]>, D>}` :
  never : never;

type Paths = Join<PathsToStringProps<typeof ptBR>, '.'>;

export function useLocale() {
  const t = useCallback((path: Paths): string => {
    return path.split('.').reduce((obj, key) => obj?.[key], ptBR as any) || path;
  }, []);

  return { t };
}