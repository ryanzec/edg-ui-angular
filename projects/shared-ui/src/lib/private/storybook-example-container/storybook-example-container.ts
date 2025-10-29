import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { tailwindUtils } from '@organization/shared-utils';

@Component({
  selector: 'org-storybook-example-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './storybook-example-container.html',
  host: {
    ['attr.data-testid']: 'storybook-example-container',
  },
})
export class StorybookExampleContainer {
  public title = input<string>('');
  public currentState = input<string>('');
  public containerClass = input<string>('');

  public mergeClasses = tailwindUtils.merge;
}
