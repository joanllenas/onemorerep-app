export const Padding = {
  Screen: 24, // Tailwind's default px-6 (1.5rem = 24px)
  Small: 8, // Tailwind's px-2 (0.5rem = 8px)
  Medium: 16, // Tailwind's px-4 (1rem = 16px)
  Large: 32, // Tailwind's px-8 (2rem =
} as const;

export const Gap = {
  Small: 4, // Tailwind's gap-1 (0.25rem = 4px)
  Medium: 8, // Tailwind's gap-2 (0.5rem = 8px)
  Large: 16, // Tailwind's gap-4 (1rem = 16px)
  XLarge: 24, // Tailwind's gap-6 (1.5rem = 24px)
  XXLarge: 32, // Tailwind's gap-8 (2rem = 32px)
} as const;

export const Text = {
  Small: 12, // Tailwind's text-xs (0.75rem = 12px)
  Medium: 14, // Tailwind's text-sm (0.875rem = 14px)
  Large: 16, // Tailwind's text-base (1rem = 16px)
  XLarge: 18, // Tailwind's text-lg (1.125rem = 18px)
  XXLarge: 20, // Tailwind's text-xl (1.25rem = 20px)
} as const;
