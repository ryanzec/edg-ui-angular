import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'org-storybook-example-container-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './storybook-example-container-section.html',
  host: {
    ['attr.data-testid']: 'storybook-example-container-section',
  },
})
export class StorybookExampleContainerSection {
  public label = input.required<string>();
}
