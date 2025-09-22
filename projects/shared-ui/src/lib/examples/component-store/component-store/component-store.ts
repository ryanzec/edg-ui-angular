import { Injectable, signal, computed } from '@angular/core';

@Injectable()
export class ComponentStore {
  private _inputValue = signal('');
  private _isTyping = signal(false);
  private _placeholder = signal('Type your message...');

  readonly inputValue = this._inputValue.asReadonly();
  readonly isTyping = this._isTyping.asReadonly();
  readonly placeholder = this._placeholder.asReadonly();

  readonly hasContent = computed(() => this._inputValue().trim().length > 0);
  readonly characterCount = computed(() => this._inputValue().length);

  setValue(value: string) {
    this._inputValue.set(value);
  }

  updateValue(value: string) {
    this._inputValue.update(() => value);
  }

  clearInput() {
    this._inputValue.set('');
  }

  setTypingStatus(typing: boolean) {
    this._isTyping.set(typing);
  }

  setPlaceholder(text: string) {
    this._placeholder.set(text);
  }
}
