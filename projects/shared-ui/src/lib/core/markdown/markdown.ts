import { Component, ChangeDetectionStrategy, input, computed, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Remarkable } from 'remarkable';
import { linkify } from 'remarkable/linkify';
import { tailwindUtils } from '@organization/shared-utils';

@Component({
  selector: 'org-markdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './markdown.html',
  styleUrl: './markdown.css',
  host: {
    ['attr.data-testid']: 'markdown',
  },
})
export class Markdown {
  private readonly _domSanitizer = inject(DomSanitizer);
  private readonly _remarkable = new Remarkable({
    html: true,
    breaks: true,
    typographer: true,
  }).use(linkify);

  public markdown = input.required<string>();
  public containerClass = input<string>('');

  public renderedHtml = computed<SafeHtml>(() => {
    const rawHtml = this._remarkable.render(this.markdown());

    return this._domSanitizer.bypassSecurityTrustHtml(rawHtml);
  });

  public mergeClasses = tailwindUtils.merge;
}
