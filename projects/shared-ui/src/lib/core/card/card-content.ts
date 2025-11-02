import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { tailwindUtils } from 'projects/shared-utils/src/utils/tailwind';

@Component({
  selector: 'org-card-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-content.html',
  host: {
    class: 'first:pt-card [&:not(:has(~org-card-footer))]:pb-card',
  },
})
export class CardContent {
  public class = input<string>('');

  public mergeClasses = tailwindUtils.merge;
}
