import { Directive, input } from '@angular/core';

export const TextColor = {
  BRAND: 'brand',
  SECONDARY: 'secondary',
  SAFE: 'safe',
  INFO: 'info',
  CAUTION: 'caution',
  WARNING: 'warning',
  DANGER: 'danger',
} as const;

export type TextColor = (typeof TextColor)[keyof typeof TextColor];

export const textColors = Object.values(TextColor);

export const TextSize = {
  XS: 'xs',
  SM: 'sm',
  BASE: 'base',
  LG: 'lg',
  XL: 'xl',
  TWO_XL: '2xl',
} as const;

export type TextSize = (typeof TextSize)[keyof typeof TextSize];

export const textSizes = Object.values(TextSize);

export const TEXT_COLOR_DEFAULT: TextColor | null = null;
export const TEXT_SIZE_DEFAULT: TextSize | null = null;

@Directive({
  selector: '[orgText]',
  host: {
    '[class.text-brand-text]': 'textColor() === "brand"',
    '[class.text-secondary-text]': 'textColor() === "secondary"',
    '[class.text-safe-text]': 'textColor() === "safe"',
    '[class.text-info-text]': 'textColor() === "info"',
    '[class.text-caution-text]': 'textColor() === "caution"',
    '[class.text-warning-text]': 'textColor() === "warning"',
    '[class.text-danger-text]': 'textColor() === "danger"',
    '[class.text-xs]': 'textSize() === "xs"',
    '[class.text-sm]': 'textSize() === "sm"',
    '[class.text-base]': 'textSize() === "base"',
    '[class.text-lg]': 'textSize() === "lg"',
    '[class.text-xl]': 'textSize() === "xl"',
    '[class.text-2xl]': 'textSize() === "2xl"',
  },
})
export class TextDirective {
  public textColor = input<TextColor | null>(TEXT_COLOR_DEFAULT);
  public textSize = input<TextSize | null>(TEXT_SIZE_DEFAULT);
}
