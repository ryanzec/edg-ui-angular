import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { tailwindUtils } from 'projects/shared-utils/src/utils/tailwind';

@Component({
  selector: 'org-card-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-header.html',
})
export class CardHeader {
  public class = input<string>('');
  public title = input<string | null>(null);
  public subtitle = input<string | null>(null);

  public readonly hasTitle = computed(() => !!this.title());
  public readonly hasSubtitle = computed(() => !!this.subtitle());

  public mergeClasses = tailwindUtils.merge;
}
