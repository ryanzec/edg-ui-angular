import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
  ViewChild,
  forwardRef,
  AfterViewInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Input as BaseInput, type InputVariant } from '../input/input';

type TimeSegment = 'hours' | 'minutes' | 'ampm';

export type TimeInputState = {
  hours: string;
  minutes: string;
  ampm: 'am' | 'pm';
  activeSegment: TimeSegment;
  firstDigitEntered: boolean;
};

@Component({
  selector: 'org-time-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseInput],
  templateUrl: './time-input.html',
  host: {
    dataid: 'time-input',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeInput),
      multi: true,
    },
  ],
})
export class TimeInput implements AfterViewInit, ControlValueAccessor {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChange: (value: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onTouched: () => void = () => {};

  @ViewChild(BaseInput, { static: true })
  public readonly inputComponent!: BaseInput;

  /**
   * @internal Only exposed for testing purposes
   */
  public readonly _state = signal<TimeInputState>({
    hours: '12',
    minutes: '00',
    ampm: 'am',
    activeSegment: 'hours',
    firstDigitEntered: false,
  });

  // input properties
  public variant = input<InputVariant>('bordered');
  public placeholder = input<string>('Enter time');
  public disabled = input<boolean>(false);
  public readonly = input<boolean>(false);
  public containerClass = input<string>('');
  public name = input.required<string>();
  public defaultValue = input<string>('');
  public selectAllOnFocus = input<boolean>(false);
  public autoFocus = input<boolean>(false);

  // output events
  public valueChange = output<string>();
  public focused = output<void>();
  public blurred = output<void>();

  // computed properties
  public readonly formattedValue = computed<string>(() => {
    const state = this._state();

    return `${state.hours}:${state.minutes} ${state.ampm}`;
  });

  public ngAfterViewInit(): void {
    // initialize with default value if provided
    if (this.defaultValue()) {
      this._parseAndSetValue(this.defaultValue());
    }
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled() || this.readonly()) {
      return;
    }

    const key = event.key;

    // prevent default for most keys we handle
    if (
      key === 'ArrowLeft' ||
      key === 'ArrowRight' ||
      key === 'ArrowUp' ||
      key === 'ArrowDown' ||
      key === 'Backspace' ||
      key === 'Delete' ||
      /^[0-9]$/.test(key) ||
      key === 'a' ||
      key === 'A' ||
      key === 'p' ||
      key === 'P'
    ) {
      event.preventDefault();
      event.stopPropagation();
    }

    // handle arrow navigation
    if (key === 'ArrowLeft') {
      this._moveToPreviousSegment();

      return;
    }

    if (key === 'ArrowRight') {
      this._moveToNextSegment();

      return;
    }

    // handle up/down
    if (key === 'ArrowUp') {
      this._incrementSegment();

      return;
    }

    if (key === 'ArrowDown') {
      this._decrementSegment();

      return;
    }

    // ignore delete/backspace
    if (key === 'Backspace' || key === 'Delete') {
      return;
    }

    const state = this._state();

    // handle am/pm keys
    if (state.activeSegment === 'ampm') {
      if (key === 'a' || key === 'A') {
        this._updateAmPm('am');

        return;
      }

      if (key === 'p' || key === 'P') {
        this._updateAmPm('pm');

        return;
      }
    }

    // handle number input
    if (/^[0-9]$/.test(key)) {
      this._handleNumberInput(key);
    }
  }

  public handleFocus(): void {
    // select hours segment on focus
    this._state.update((state) => ({
      ...state,
      activeSegment: 'hours',
      firstDigitEntered: false,
    }));

    this._selectCurrentSegment();
    this.focused.emit();
  }

  public handleBlur(): void {
    this._onTouched();
    this.blurred.emit();
  }

  public handleClick(): void {
    // detect which segment was clicked and select it
    if (this.disabled() || this.readonly()) {
      return;
    }

    const input = this.inputComponent.inputRef.nativeElement;
    const selectionStart = input.selectionStart ?? 0;

    // hours: 0-1, colon: 2, minutes: 3-4, space: 5, ampm: 6-7
    let segment: TimeSegment = 'hours';

    if (selectionStart >= 6) {
      segment = 'ampm';
    } else if (selectionStart >= 3) {
      segment = 'minutes';
    }

    this._state.update((state) => ({
      ...state,
      activeSegment: segment,
      firstDigitEntered: false,
    }));

    this._selectCurrentSegment();
  }

  private _handleNumberInput(digit: string): void {
    const state = this._state();

    if (state.activeSegment === 'hours') {
      this._handleHoursInput(digit);
    } else if (state.activeSegment === 'minutes') {
      this._handleMinutesInput(digit);
    }
  }

  private _handleHoursInput(digit: string): void {
    const state = this._state();
    const num = parseInt(digit, 10);

    if (!state.firstDigitEntered) {
      // first digit
      if (num === 0 || num === 1) {
        // wait for second digit
        this._state.update((s) => ({
          ...s,
          hours: `0${digit}`,
          firstDigitEntered: true,
        }));
        this._selectCurrentSegment();
      } else {
        // 2-9: auto-add leading 0 and move to minutes
        this._state.update((s) => ({
          ...s,
          hours: `0${digit}`,
          activeSegment: 'minutes',
          firstDigitEntered: false,
        }));
        this._emitValue();
        this._selectCurrentSegment();
      }
    } else {
      // second digit after 0 or 1
      const firstDigit = state.hours[1];
      let newHours = `${firstDigit}${digit}`;
      const hoursNum = parseInt(newHours, 10);

      // clamp to 12 if needed
      if (hoursNum > 12 || hoursNum === 0) {
        newHours = '12';
      }

      this._state.update((s) => ({
        ...s,
        hours: newHours.padStart(2, '0'),
        activeSegment: 'minutes',
        firstDigitEntered: false,
      }));
      this._emitValue();
      this._selectCurrentSegment();
    }
  }

  private _handleMinutesInput(digit: string): void {
    const state = this._state();
    const num = parseInt(digit, 10);

    if (!state.firstDigitEntered) {
      // first digit
      if (num <= 5) {
        // wait for second digit
        this._state.update((s) => ({
          ...s,
          minutes: `0${digit}`,
          firstDigitEntered: true,
        }));
        this._selectCurrentSegment();
      } else {
        // 6-9: auto-add leading 0 and move to ampm
        this._state.update((s) => ({
          ...s,
          minutes: `0${digit}`,
          activeSegment: 'ampm',
          firstDigitEntered: false,
        }));
        this._emitValue();
        this._selectCurrentSegment();
      }
    } else {
      // second digit
      const firstDigit = state.minutes[1];
      const newMinutes = `${firstDigit}${digit}`;

      this._state.update((s) => ({
        ...s,
        minutes: newMinutes,
        activeSegment: 'ampm',
        firstDigitEntered: false,
      }));
      this._emitValue();
      this._selectCurrentSegment();
    }
  }

  private _updateAmPm(value: 'am' | 'pm'): void {
    this._state.update((state) => ({
      ...state,
      ampm: value,
    }));
    this._emitValue();
    this._selectCurrentSegment();
  }

  private _moveToPreviousSegment(): void {
    const state = this._state();
    let newSegment: TimeSegment;

    if (state.activeSegment === 'hours') {
      newSegment = 'ampm';
    } else if (state.activeSegment === 'minutes') {
      newSegment = 'hours';
    } else {
      newSegment = 'minutes';
    }

    this._state.update((s) => ({
      ...s,
      activeSegment: newSegment,
      firstDigitEntered: false,
    }));

    this._selectCurrentSegment();
  }

  private _moveToNextSegment(): void {
    const state = this._state();
    let newSegment: TimeSegment;

    if (state.activeSegment === 'hours') {
      newSegment = 'minutes';
    } else if (state.activeSegment === 'minutes') {
      newSegment = 'ampm';
    } else {
      newSegment = 'hours';
    }

    this._state.update((s) => ({
      ...s,
      activeSegment: newSegment,
      firstDigitEntered: false,
    }));

    this._selectCurrentSegment();
  }

  private _incrementSegment(): void {
    const state = this._state();

    if (state.activeSegment === 'hours') {
      const hours = parseInt(state.hours, 10);
      const newHours = hours === 12 ? 1 : hours + 1;
      this._state.update((s) => ({
        ...s,
        hours: newHours.toString().padStart(2, '0'),
      }));
    } else if (state.activeSegment === 'minutes') {
      const minutes = parseInt(state.minutes, 10);
      const newMinutes = minutes === 59 ? 0 : minutes + 1;
      this._state.update((s) => ({
        ...s,
        minutes: newMinutes.toString().padStart(2, '0'),
      }));
    } else {
      this._state.update((s) => ({
        ...s,
        ampm: s.ampm === 'am' ? 'pm' : 'am',
      }));
    }

    this._emitValue();
    this._restoreSelection();
  }

  private _decrementSegment(): void {
    const state = this._state();

    if (state.activeSegment === 'hours') {
      const hours = parseInt(state.hours, 10);
      const newHours = hours === 1 ? 12 : hours - 1;
      this._state.update((s) => ({
        ...s,
        hours: newHours.toString().padStart(2, '0'),
      }));
    } else if (state.activeSegment === 'minutes') {
      const minutes = parseInt(state.minutes, 10);
      const newMinutes = minutes === 0 ? 59 : minutes - 1;
      this._state.update((s) => ({
        ...s,
        minutes: newMinutes.toString().padStart(2, '0'),
      }));
    } else {
      this._state.update((s) => ({
        ...s,
        ampm: s.ampm === 'am' ? 'pm' : 'am',
      }));
    }

    this._emitValue();
    this._restoreSelection();
  }

  private _selectCurrentSegment(): void {
    const input = this.inputComponent.inputRef.nativeElement;

    // use setTimeout to ensure selection happens after render
    setTimeout(() => {
      const currentState = this._state();

      if (currentState.activeSegment === 'hours') {
        input.setSelectionRange(0, 2);
      } else if (currentState.activeSegment === 'minutes') {
        input.setSelectionRange(3, 5);
      } else {
        input.setSelectionRange(6, 8);
      }
    }, 0);
  }

  private _restoreSelection(): void {
    const input = this.inputComponent.inputRef.nativeElement;
    const currentState = this._state();

    // use requestAnimationFrame to restore selection after DOM update
    requestAnimationFrame(() => {
      if (currentState.activeSegment === 'hours') {
        input.setSelectionRange(0, 2);
      } else if (currentState.activeSegment === 'minutes') {
        input.setSelectionRange(3, 5);
      } else {
        input.setSelectionRange(6, 8);
      }
    });
  }

  private _emitValue(): void {
    const value = this.formattedValue();
    this._onChange(value);
    this.valueChange.emit(value);
  }

  private _parseAndSetValue(value: string): void {
    // parse format "hh:mm aa" or "hh:mm a"
    const match = value.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);

    if (!match) {
      // invalid format, use defaults
      return;
    }

    let hours = parseInt(match[1], 10);
    let minutes = parseInt(match[2], 10);
    const ampm = match[3].toLowerCase() as 'am' | 'pm';

    // clamp values
    if (hours < 1 || hours > 12) {
      hours = 12;
    }

    if (minutes < 0 || minutes > 59) {
      minutes = 0;
    }

    this._state.update((state) => ({
      ...state,
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      ampm,
    }));
  }

  // control value accessor implementation
  public writeValue(value: string): void {
    if (value) {
      this._parseAndSetValue(value);
    }
  }

  public registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public setDisabledState(_isDisabled: boolean): void {
    // handled via disabled input
  }
}
