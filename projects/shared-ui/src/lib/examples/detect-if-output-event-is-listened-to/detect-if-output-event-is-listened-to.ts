import { Component, computed, signal } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';

/**
 * Simple example demonstrating how to detect if an output event is being listened to
 * using the Subject + outputFromObservable pattern.
 */
@Component({
  selector: 'org-detect-if-output-event-is-listened-to',
  imports: [],
  templateUrl: './detect-if-output-event-is-listened-to.html',
  styleUrl: './detect-if-output-event-is-listened-to.scss',
})
export class DetectIfOutputEventIsListenedTo {
  private readonly _clickCount = signal(0);

  // Step 1: Create a private Subject for the output event
  private readonly _buttonClicked$ = new Subject<string>();

  // Step 2: Create the output using outputFromObservable()
  public readonly buttonClicked = outputFromObservable(this._buttonClicked$);

  // Step 3: Check if the event is being listened to
  public readonly isListenedTo = computed(() => this._buttonClicked$.observed);

  public readonly clickCount = computed(() => this._clickCount());

  public handleClick(): void {
    this._clickCount.update((count) => count + 1);

    // Only emit if someone is listening (optional performance optimization)
    if (this._buttonClicked$.observed) {
      this._buttonClicked$.next(`Button clicked ${this._clickCount()} times`);
    }
  }

  public resetCounter(): void {
    this._clickCount.set(0);
  }

  // Dynamic styling based on whether the event is being listened to
  public readonly buttonClasses = computed(() => {
    const baseClasses = ['px-6', 'py-3', 'rounded-lg', 'font-medium', 'transition-all', 'text-lg'];

    if (this.isListenedTo()) {
      return [...baseClasses, 'bg-blue-500', 'text-white', 'hover:bg-blue-600', 'cursor-pointer'].join(' ');
    }

    return [...baseClasses, 'bg-gray-300', 'text-gray-600', 'cursor-default'].join(' ');
  });
}
