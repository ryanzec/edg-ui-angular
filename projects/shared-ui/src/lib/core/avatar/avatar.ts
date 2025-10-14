import { Component, ChangeDetectionStrategy, input, output, computed, signal } from '@angular/core';
import SparkMD5 from 'spark-md5';
import { tailwindUtils } from '@organization/shared-utils';
import { ComponentSize } from '../types/component-types';

export type AvatarSize = Extract<ComponentSize, 'sm' | 'base' | 'lg'>;

export const avatarSizes: AvatarSize[] = ['sm', 'base', 'lg'];

type AvatarState = {
  imageLoadError: boolean;
};

@Component({
  selector: 'org-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './avatar.html',
  host: {
    dataid: 'avatar',
    class: 'inline-flex',
  },
})
export class Avatar {
  private readonly _state = signal<AvatarState>({
    imageLoadError: false,
  });

  public label = input<string | null>(null);
  public subLabel = input<string | null>(null);
  public size = input<AvatarSize>('base');
  public email = input<string | null>(null);
  public src = input<string | null>(null);
  public circleClass = input<string>('');
  public showLabel = input<boolean>(true);

  public clicked = output<MouseEvent | KeyboardEvent>();

  public mergeClasses = tailwindUtils.merge;

  public readonly hasImageLoadError = computed<boolean>(() => this._state().imageLoadError);
  public readonly shouldShowImage = computed<boolean>(() => {
    return !!this.imageSrc() && !this.hasImageLoadError();
  });
  public readonly imageSrc = computed<string | null>(() => {
    if (this.src()) {
      return this.src();
    }

    if (this.email()) {
      return this.generateGravatarUrl(this.email()!);
    }

    return null;
  });
  public readonly initials = computed<string>(() => {
    if (!this.label()) {
      return '';
    }

    const words = this.label()!.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  });

  protected handleMouseClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }

  protected handleKeyboardClick(event: Event): void {
    this.clicked.emit(event as KeyboardEvent);
  }

  protected handleImageError(): void {
    this._state.update((state) => ({
      ...state,
      imageLoadError: true,
    }));
  }

  private generateGravatarUrl(email: string): string {
    const trimmedEmail = email.trim().toLowerCase();
    const hash = SparkMD5.hash(trimmedEmail);

    return `https://www.gravatar.com/avatar/${hash}?d=404`;
  }
}
