import {
  Component,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
  ViewChild,
  ElementRef,
  effect,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { Chart as ChartJS, ChartConfiguration } from 'chart.js/auto';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { EmptyIndicator } from '../empty-indicator/empty-indicator';
import { tailwindUtils } from '@organization/shared-utils';

export type ChartState = {
  error: string | null;
};

@Component({
  selector: 'org-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoadingSpinner, EmptyIndicator],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
  host: {
    dataid: 'chart',
    class: 'contents',
  },
})
export class Chart implements AfterViewInit, OnDestroy {
  @ViewChild('canvasRef')
  public readonly canvasRef!: ElementRef<HTMLCanvasElement>;

  private _chartInstance: ChartJS | null = null;
  private _viewInitialized = signal<boolean>(false);

  private _state = signal<ChartState>({
    error: null,
  });

  public configuration = input<ChartConfiguration | null>(null);
  public isLoading = input<boolean>(false);
  public containerClass = input<string>('');

  public readonly error = computed<string | null>(() => this._state().error);
  public readonly isEmpty = computed<boolean>(() => {
    return !this.isLoading() && !this.configuration();
  });
  public readonly hasError = computed<boolean>(() => {
    return !!this.error();
  });
  public readonly shouldShowChart = computed<boolean>(() => {
    return !this.isLoading() && !this.isEmpty() && !this.hasError();
  });

  public mergeClasses = tailwindUtils.merge;

  constructor() {
    effect(() => {
      const config = this.configuration();
      const viewInitialized = this._viewInitialized();

      if (!viewInitialized) {
        return;
      }

      if (!config || this.isLoading()) {
        this._destroyChart();

        return;
      }

      if (!this.canvasRef?.nativeElement) {
        return;
      }

      try {
        this._createOrUpdateChart(config);
        this._state.update((state) => ({
          ...state,
          error: null,
        }));
      } catch (error) {
        this._state.update((state) => ({
          ...state,
          error: error instanceof Error ? error.message : 'failed to render chart',
        }));
      }
    });
  }

  public ngAfterViewInit(): void {
    this._viewInitialized.set(true);
  }

  public ngOnDestroy(): void {
    this._destroyChart();
  }

  public updateData(configuration: ChartConfiguration): void {
    try {
      this._createOrUpdateChart(configuration);
      this._state.update((state) => ({
        ...state,
        error: null,
      }));
    } catch (error) {
      this._state.update((state) => ({
        ...state,
        error: error instanceof Error ? error.message : 'failed to update chart',
      }));
    }
  }

  private _createOrUpdateChart(config: ChartConfiguration): void {
    if (!this.canvasRef?.nativeElement) {
      return;
    }

    if (this._chartInstance) {
      this._chartInstance.data = config.data;
      this._chartInstance.options = config.options ?? {};
      this._chartInstance.update();
    } else {
      const canvas = this.canvasRef.nativeElement;
      this._chartInstance = new ChartJS(canvas, config);
    }
  }

  private _destroyChart(): void {
    if (this._chartInstance) {
      this._chartInstance.destroy();
      this._chartInstance = null;
    }
  }
}
