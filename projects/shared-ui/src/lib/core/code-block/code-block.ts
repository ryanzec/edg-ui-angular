import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { Icon } from '../icon/icon';
import { tailwindUtils } from '@organization/shared-utils';
import { ScrollAreaDirective } from '../scroll-area-directive/scroll-area-directive';

export type CodeBlockVariant = 'block' | 'inline';

export const codeBlockVariants: CodeBlockVariant[] = ['block', 'inline'];

@Component({
  selector: 'org-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, CdkCopyToClipboard, ScrollAreaDirective],
  templateUrl: './code-block.html',
  host: {
    ['attr.data-testid']: 'code-block',
  },
})
export class CodeBlock {
  public text = input.required<string>();
  public variant = input<CodeBlockVariant>('block');
  public allowCopy = input<boolean>(false);
  public ellipsisAt = input<number>(0);
  public containerClass = input<string>('');
  public sizingClass = input<string>('');

  public isBlock = computed<boolean>(() => this.variant() === 'block');
  public isInline = computed<boolean>(() => this.variant() === 'inline');
  public hasEllipsis = computed<boolean>(() => this.ellipsisAt() > 0);

  public mergeClasses = tailwindUtils.merge;
}
