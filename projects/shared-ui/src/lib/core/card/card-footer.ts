import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { type CardAlignment } from './card';
import { tailwindUtils } from 'projects/shared-utils/src/utils/tailwind';

@Component({
  selector: 'org-card-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-footer.html',
})
export class CardFooter {
  public alignment = input<CardAlignment>('start');
  public class = input<string>('');

  public mergeClasses = tailwindUtils.merge;
}
