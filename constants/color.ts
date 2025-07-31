export const Color = {
  White: '#ffffff',

  //
  ButtonText: '#25292e',
  ButtonBackground: '#ffffff',
  ButtonDisabledBorder: '#9CA3AF',

  //
  InputBorder: '#9CA3AF',
  InputBackground: '#1F2937',
} as const;

export const Palette = {
  // Core background
  background: '#25292e', // App background – dark gray

  // Surfaces for cards, inputs, containers
  surface: '#2f343a', // Slightly lighter than background for elevation

  // Borders, dividers, outlines
  border: '#3a3f46', // Neutral border color with minimal contrast

  // Text colors
  textPrimary: '#f0f0f0', // Main readable text on dark backgrounds
  textMuted: '#a0a0a0', // Subdued/secondary text, placeholders, etc.

  // Accent/brand color
  accent: '#ffd33d', // Primary brand color (yellow) – used for CTA, icons, emphasis
  accentHover: '#ffea80', // Hover state for accent elements
  accentActive: '#e6bc00', // Active/pressed state for buttons, toggles, etc.

  // Semantic colors (optional use)
  success: '#2ecc71', // Positive actions, success states, badges
  danger: '#e74c3c', // Errors, destructive actions, warnings

  // Disabled states
  disabled: '#4d4d4d', // Background for disabled buttons or inputs

  // Additional (if needed)
  link: '#ffd33d', // Links or interactive text – same as accent
  linkHover: '#ffea80', // Hover state for links
};
