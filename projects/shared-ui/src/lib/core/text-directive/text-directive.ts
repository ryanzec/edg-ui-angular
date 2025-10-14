import { Directive, input } from '@angular/core';
import { ComponentColor, ComponentSize, componentColors, componentSizes } from '../types/component-types';

export type TextColor = ComponentColor;

export const textColors: TextColor[] = componentColors;

export type TextSize = ComponentSize;

export const textSizes: TextSize[] = componentSizes;

export const TEXT_COLOR_DEFAULT: TextColor | null = null;
export const TEXT_SIZE_DEFAULT: TextSize | null = null;

@Directive({
  selector: '[orgText]',
  host: {
    '[class.text-primary-text]': 'textColor() === "primary"',
    '[class.text-secondary-text]': 'textColor() === "secondary"',
    '[class.text-neutral-text]': 'textColor() === "neutral"',
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
