import { Component, effect, signal } from '@angular/core';
import { isEqual } from 'es-toolkit';
import { Card } from '../../core/card/card';
import { CardHeader } from '../../core/card/card-header';
import { CardContent } from '../../core/card/card-content';
import { Button } from '../../core/button/button';

@Component({
  selector: 'org-example-signals-custom-equality',
  templateUrl: './signals-custom-equality.html',
  imports: [Card, CardHeader, CardContent, Button],
})
export class EXAMPLESignalsCustomEquality {
  private _messages = signal<string[]>(['test', 'test2']);
  private _messagesCustomEquality = signal<string[]>(['test', 'test2'], {
    equal: isEqual,
  });
  private _signalTriggeredCount = signal<number>(0);
  private _signalTriggeredCustomEqualityCount = signal<number>(0);

  protected readonly signalTriggeredCount = this._signalTriggeredCount.asReadonly();
  protected readonly signalTriggeredCustomEqualityCount = this._signalTriggeredCustomEqualityCount.asReadonly();

  constructor() {
    effect(() => {
      this._messages();
      this._signalTriggeredCount.update((currentValue) => currentValue + 1);
    });
    effect(() => {
      this._messagesCustomEquality();
      this._signalTriggeredCustomEqualityCount.update((currentValue) => currentValue + 1);
    });
  }

  public updateSignalWithValue1() {
    this._messages.update(() => ['test', 'test2']);
  }

  public updateSignalWithValue2() {
    this._messages.update(() => ['test2', 'test3']);
  }

  public updateSignalWithValue1CustomEquality() {
    this._messagesCustomEquality.update(() => ['test', 'test2']);
  }

  public updateSignalWithValue2CustomEquality() {
    this._messagesCustomEquality.update(() => ['test2', 'test3']);
  }
}
