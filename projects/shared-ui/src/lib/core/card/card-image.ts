import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { tailwindUtils } from 'projects/shared-utils/src/utils/tailwind';

@Component({
  selector: 'org-card-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  templateUrl: './card-image.html',
})
export class CardImage {
  public class = input<string>('');
  public src = input.required<string>();
  public alt = input.required<string>();
  public fullWidth = input<boolean>(true);
  public width = input<number | null>(null);
  public height = input<number | null>(null);
  public priority = input<boolean>(false);

  public readonly shouldUseOptimizedImage = computed(() => {
    return this.width() && this.height();
  });

  public mergeClasses = tailwindUtils.merge;
}
