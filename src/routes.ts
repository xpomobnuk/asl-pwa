export const ROUTES = {
  HOME: '/',

  AUTH: '/auth',

  LEARN: '/learn',

  PROFILE: '/profile',

  ALPHABET: '/module/alphabet',

  MODULE: (id: string) => `/module/${id}`,

  LESSON: (slug: string) => `/lesson/${slug}`,
} as const