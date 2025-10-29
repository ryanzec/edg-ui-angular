import type { Meta, StoryObj } from '@storybook/angular';
import { Chart } from './chart';
import { Button } from '../button/button';
import { StorybookExampleContainer } from '../../private/storybook-example-container/storybook-example-container';
import { StorybookExampleContainerSection } from '../../private/storybook-example-container-section/storybook-example-container-section';
import { signal } from '@angular/core';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartConfiguration,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomData = (count: number, min: number, max: number): number[] => {
  return Array.from({ length: count }, () => getRandomInt(min, max));
};

const generateLabels = (count: number, prefix: string): string[] => {
  return Array.from({ length: count }, (_, i) => `${prefix} ${i + 1}`);
};

const getCssVariable = (variableName: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
};

const meta: Meta<Chart> = {
  title: 'Core/Components/Chart',
  component: Chart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
<div class="docs-top-level-overview">
  ## Chart Component

  A flexible chart component built on Chart.js that supports multiple chart types, loading states, empty states, and error handling.

  ### Features
  - Support for all Chart.js chart types (bar, line, pie, radar, etc.)
  - Loading state with spinner
  - Empty state indicator
  - Error handling with clear error messages
  - Fixed 16:9 aspect ratio for consistent display
  - Automatic chart updates when configuration changes
  - Proper cleanup on component destroy
  - Custom color tokens for consistent theming

  ### Chart Types
  - **Bar**: Vertical and horizontal bar charts
  - **Stacked Bar**: Stacked bar charts for comparing multiple datasets
  - **Line**: Line charts with optional fill
  - **Bubble**: Bubble charts for three-dimensional data
  - **Pie**: Pie charts for showing proportions
  - **Polar**: Polar area charts
  - **Radar**: Radar/spider charts for multivariate data

  ### Usage Examples
  \`\`\`html
  <!-- Basic bar chart -->
  <org-chart [configuration]="barChartConfig" />

  <!-- Chart with loading state -->
  <org-chart [configuration]="chartConfig" [isLoading]="true" />

  <!-- Chart with custom container class -->
  <org-chart [configuration]="chartConfig" containerClass="max-w-4xl mx-auto" />
  \`\`\`

  ### Programmatic Updates
  \`\`\`typescript
  // Update chart data programmatically
  @ViewChild('chartComponent')
  chartComponent!: Chart;

  updateChartData() {
    this.chartComponent.updateData(newConfiguration);
  }
  \`\`\`
</div>
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<Chart>;

export const Default: Story = {
  args: {
    configuration: null,
    isLoading: false,
    containerClass: '',
  },
};

export const VerticalBarChart: Story = {
  render: () => {
    const dataPointCount = getRandomInt(10, 30);
    const chartConfig = signal<ChartConfiguration>({
      type: 'bar',
      data: {
        labels: generateLabels(dataPointCount, 'Item'),
        datasets: [
          {
            label: 'Dataset 1',
            data: generateRandomData(dataPointCount, 10, 100),
            backgroundColor: getCssVariable('--chart-blue-500'),
            borderColor: getCssVariable('--chart-blue-600'),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Vertical Bar Chart',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const onRefresh = () => {
      const newDataPointCount = getRandomInt(10, 30);
      chartConfig.set({
        type: 'bar',
        data: {
          labels: generateLabels(newDataPointCount, 'Item'),
          datasets: [
            {
              label: 'Dataset 1',
              data: generateRandomData(newDataPointCount, 10, 100),
              backgroundColor: getCssVariable('--chart-blue-500'),
              borderColor: getCssVariable('--chart-blue-600'),
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'Vertical Bar Chart',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    return {
      props: {
        chartConfig,
        onRefresh,
      },
      template: `
        <org-storybook-example-container title="Vertical Bar Chart">
          <org-storybook-example-container-section label="Example">
            <org-chart containerClass="self-stretch h-[500px]" [configuration]="chartConfig()" />
            <div>
              <org-button (clicked)="onRefresh()">Refresh Data</org-button>
            </div>
          </org-storybook-example-container-section>
        </org-storybook-example-container>
      `,
      moduleMetadata: {
        imports: [Chart, Button, StorybookExampleContainer, StorybookExampleContainerSection],
      },
    };
  },
};

export const HorizontalBarChart: Story = {
  render: () => {
    const dataPointCount = getRandomInt(10, 30);
    const chartConfig = signal<ChartConfiguration>({
      type: 'bar',
      data: {
        labels: generateLabels(dataPointCount, 'Category'),
        datasets: [
          {
            label: 'Dataset 1',
            data: generateRandomData(dataPointCount, 20, 150),
            backgroundColor: getCssVariable('--chart-green-500'),
            borderColor: getCssVariable('--chart-green-600'),
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Horizontal Bar Chart',
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    });

    const onRefresh = () => {
      const newDataPointCount = getRandomInt(10, 30);
      chartConfig.set({
        type: 'bar',
        data: {
          labels: generateLabels(newDataPointCount, 'Category'),
          datasets: [
            {
              label: 'Dataset 1',
              data: generateRandomData(newDataPointCount, 20, 150),
              backgroundColor: getCssVariable('--chart-green-500'),
              borderColor: getCssVariable('--chart-green-600'),
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'Horizontal Bar Chart',
            },
          },
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    return {
      props: {
        chartConfig,
        onRefresh,
      },
      template: `
        <org-storybook-example-container title="Horizontal Bar Chart">
          <org-storybook-example-container-section label="Example">
            <org-chart [configuration]="chartConfig()" />
            <div>
              <org-button (clicked)="onRefresh()">Refresh Data</org-button>
            </div>
          </org-storybook-example-container-section>
        </org-storybook-example-container>
      `,
      moduleMetadata: {
        imports: [Chart, Button, StorybookExampleContainer, StorybookExampleContainerSection],
      },
    };
  },
};

export const StackedBarChart: Story = {
  render: () => {
    const dataPointCount = getRandomInt(10, 30);
    const chartConfig = signal<ChartConfiguration>({
      type: 'bar',
      data: {
        labels: generateLabels(dataPointCount, 'Month'),
        datasets: [
          {
            label: 'Dataset 1',
            data: generateRandomData(dataPointCount, 10, 50),
            backgroundColor: getCssVariable('--chart-red-500'),
            borderColor: getCssVariable('--chart-red-600'),
            borderWidth: 1,
          },
          {
            label: 'Dataset 2',
            data: generateRandomData(dataPointCount, 10, 50),
            backgroundColor: getCssVariable('--chart-orange-500'),
            borderColor: getCssVariable('--chart-orange-600'),
            borderWidth: 1,
          },
          {
            label: 'Dataset 3',
            data: generateRandomData(dataPointCount, 10, 50),
            backgroundColor: getCssVariable('--chart-amber-500'),
            borderColor: getCssVariable('--chart-amber-600'),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Stacked Bar Chart',
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
          },
        },
      },
    });

    const onRefresh = () => {
      const newDataPointCount = getRandomInt(10, 30);
      chartConfig.set({
        type: 'bar',
        data: {
          labels: generateLabels(newDataPointCount, 'Month'),
          datasets: [
            {
              label: 'Dataset 1',
              data: generateRandomData(newDataPointCount, 10, 50),
              backgroundColor: getCssVariable('--chart-red-500'),
              borderColor: getCssVariable('--chart-red-600'),
              borderWidth: 1,
            },
            {
              label: 'Dataset 2',
              data: generateRandomData(newDataPointCount, 10, 50),
              backgroundColor: getCssVariable('--chart-orange-500'),
              borderColor: getCssVariable('--chart-orange-600'),
              borderWidth: 1,
            },
            {
              label: 'Dataset 3',
              data: generateRandomData(newDataPointCount, 10, 50),
              backgroundColor: getCssVariable('--chart-amber-500'),
              borderColor: getCssVariable('--chart-amber-600'),
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'Stacked Bar Chart',
            },
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              beginAtZero: true,
            },
          },
        },
      });
    };

    return {
      props: {
        chartConfig,
        onRefresh,
      },
      template: `
        <org-storybook-example-container title="Stacked Bar Chart">
          <org-storybook-example-container-section label="Example">
            <org-chart [configuration]="chartConfig()" />
            <div>
              <org-button (clicked)="onRefresh()">Refresh Data</org-button>
            </div>
          </org-storybook-example-container-section>
        </org-storybook-example-container>
      `,
      moduleMetadata: {
        imports: [Chart, Button, StorybookExampleContainer, StorybookExampleContainerSection],
      },
    };
  },
};

export const LineChart: Story = {
  render: () => {
    const dataPointCount = getRandomInt(10, 30);
    const lineColor = getCssVariable('--chart-purple-500');
    const chartConfig = signal<ChartConfiguration>({
      type: 'line',
      data: {
        labels: generateLabels(dataPointCount, 'Point'),
        datasets: [
          {
            label: 'Trend Line',
            data: generateRandomData(dataPointCount, 20, 100),
            borderColor: lineColor,
            backgroundColor: lineColor.replace(')', ', 0.2)').replace('rgb', 'rgba'),
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: lineColor,
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Line Chart with Fill',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const onRefresh = () => {
      const newDataPointCount = getRandomInt(10, 30);
      const newLineColor = getCssVariable('--chart-purple-500');
      chartConfig.set({
        type: 'line',
        data: {
          labels: generateLabels(newDataPointCount, 'Point'),
          datasets: [
            {
              label: 'Trend Line',
              data: generateRandomData(newDataPointCount, 20, 100),
              borderColor: newLineColor,
              backgroundColor: newLineColor.replace(')', ', 0.2)').replace('rgb', 'rgba'),
              fill: true,
              tension: 0.4,
              borderWidth: 2,
              pointBackgroundColor: newLineColor,
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'Line Chart with Fill',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    return {
      props: {
        chartConfig,
        onRefresh,
      },
      template: `
        <org-storybook-example-container title="Line Chart with Fill">
          <org-storybook-example-container-section label="Example">
            <org-chart [configuration]="chartConfig()" />
            <div>
              <org-button (clicked)="onRefresh()">Refresh Data</org-button>
            </div>
          </org-storybook-example-container-section>
        </org-storybook-example-container>
      `,
      moduleMetadata: {
        imports: [Chart, Button, StorybookExampleContainer, StorybookExampleContainerSection],
      },
    };
  },
};

export const BubbleChart: Story = {
  render: () => {
    const dataPointCount = getRandomInt(10, 30);

    const generateBubbleData = (count: number) => {
      return Array.from({ length: count }, () => ({
        x: getRandomInt(0, 100),
        y: getRandomInt(0, 100),
        r: getRandomInt(5, 25),
      }));
    };

    const chartConfig = signal<ChartConfiguration>({
      type: 'bubble',
      data: {
        datasets: [
          {
            label: 'Bubble Dataset 1',
            data: generateBubbleData(dataPointCount),
            backgroundColor: getCssVariable('--chart-cyan-500'),
            borderColor: getCssVariable('--chart-cyan-600'),
            borderWidth: 1,
          },
          {
            label: 'Bubble Dataset 2',
            data: generateBubbleData(dataPointCount),
            backgroundColor: getCssVariable('--chart-teal-500'),
            borderColor: getCssVariable('--chart-teal-600'),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Bubble Chart',
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
          },
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });

    const onRefresh = () => {
      const newDataPointCount = getRandomInt(10, 30);
      chartConfig.set({
        type: 'bubble',
        data: {
          datasets: [
            {
              label: 'Bubble Dataset 1',
              data: generateBubbleData(newDataPointCount),
              backgroundColor: getCssVariable('--chart-cyan-500'),
              borderColor: getCssVariable('--chart-cyan-600'),
              borderWidth: 1,
            },
            {
              label: 'Bubble Dataset 2',
              data: generateBubbleData(newDataPointCount),
              backgroundColor: getCssVariable('--chart-teal-500'),
              borderColor: getCssVariable('--chart-teal-600'),
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'Bubble Chart',
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              max: 100,
            },
            y: {
              beginAtZero: true,
              max: 100,
            },
          },
        },
      });
    };

    return {
      props: {
        chartConfig,
        onRefresh,
      },
      template: `
        <org-storybook-example-container title="Bubble Chart">
          <org-storybook-example-container-section label="Example">
            <org-chart [configuration]="chartConfig()" />
            <div>
              <org-button (clicked)="onRefresh()">Refresh Data</org-button>
            </div>
          </org-storybook-example-container-section>
        </org-storybook-example-container>
      `,
      moduleMetadata: {
        imports: [Chart, Button, StorybookExampleContainer, StorybookExampleContainerSection],
      },
    };
  },
};

export const PieChart: Story = {
  render: () => {
    const dataPointCount = getRandomInt(10, 30);
    const pieColors = [
      getCssVariable('--chart-red-500'),
      getCssVariable('--chart-orange-500'),
      getCssVariable('--chart-yellow-500'),
      getCssVariable('--chart-green-500'),
      getCssVariable('--chart-blue-500'),
      getCssVariable('--chart-indigo-500'),
      getCssVariable('--chart-purple-500'),
      getCssVariable('--chart-pink-500'),
      getCssVariable('--chart-rose-500'),
      getCssVariable('--chart-teal-500'),
      getCssVariable('--chart-cyan-500'),
      getCssVariable('--chart-sky-500'),
      getCssVariable('--chart-violet-500'),
      getCssVariable('--chart-fuchsia-500'),
      getCssVariable('--chart-lime-500'),
      getCssVariable('--chart-emerald-500'),
      getCssVariable('--chart-amber-500'),
    ];

    const chartConfig = signal<ChartConfiguration>({
      type: 'pie',
      data: {
        labels: generateLabels(dataPointCount, 'Segment'),
        datasets: [
          {
            label: 'Distribution',
            data: generateRandomData(dataPointCount, 10, 100),
            backgroundColor: Array.from({ length: dataPointCount }, (_, i) => pieColors[i % pieColors.length]),
            borderWidth: 1,
            borderColor: '#fff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'right',
          },
          title: {
            display: true,
            text: 'Pie Chart',
          },
        },
      },
    });

    const onRefresh = () => {
      const newDataPointCount = getRandomInt(10, 30);
      chartConfig.set({
        type: 'pie',
        data: {
          labels: generateLabels(newDataPointCount, 'Segment'),
          datasets: [
            {
              label: 'Distribution',
              data: generateRandomData(newDataPointCount, 10, 100),
              backgroundColor: Array.from({ length: newDataPointCount }, (_, i) => pieColors[i % pieColors.length]),
              borderWidth: 1,
              borderColor: '#fff',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              position: 'right',
            },
            title: {
              display: true,
              text: 'Pie Chart',
            },
          },
        },
      });
    };

    return {
      props: {
        chartConfig,
        onRefresh,
      },
      template: `
        <org-storybook-example-container title="Pie Chart">
          <org-storybook-example-container-section label="Example">
            <org-chart [configuration]="chartConfig()" />
            <div>
              <org-button (clicked)="onRefresh()">Refresh Data</org-button>
            </div>
          </org-storybook-example-container-section>
        </org-storybook-example-container>
      `,
      moduleMetadata: {
        imports: [Chart, Button, StorybookExampleContainer, StorybookExampleContainerSection],
      },
    };
  },
};

export const PolarChart: Story = {
  render: () => {
    const dataPointCount = getRandomInt(10, 30);
    const polarColors = [
      getCssVariable('--chart-rose-500'),
      getCssVariable('--chart-pink-500'),
      getCssVariable('--chart-fuchsia-500'),
      getCssVariable('--chart-purple-500'),
      getCssVariable('--chart-violet-500'),
      getCssVariable('--chart-indigo-500'),
      getCssVariable('--chart-blue-500'),
      getCssVariable('--chart-sky-500'),
      getCssVariable('--chart-cyan-500'),
      getCssVariable('--chart-teal-500'),
      getCssVariable('--chart-emerald-500'),
      getCssVariable('--chart-green-500'),
      getCssVariable('--chart-lime-500'),
      getCssVariable('--chart-yellow-500'),
      getCssVariable('--chart-amber-500'),
      getCssVariable('--chart-orange-500'),
      getCssVariable('--chart-red-500'),
    ];

    const chartConfig = signal<ChartConfiguration>({
      type: 'polarArea',
      data: {
        labels: generateLabels(dataPointCount, 'Label'),
        datasets: [
          {
            label: 'Polar Area Dataset',
            data: generateRandomData(dataPointCount, 10, 100),
            backgroundColor: Array.from({ length: dataPointCount }, (_, i) => polarColors[i % polarColors.length]),
            borderWidth: 1,
            borderColor: '#fff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'right',
          },
          title: {
            display: true,
            text: 'Polar Area Chart',
          },
        },
      },
    });

    const onRefresh = () => {
      const newDataPointCount = getRandomInt(10, 30);
      chartConfig.set({
        type: 'polarArea',
        data: {
          labels: generateLabels(newDataPointCount, 'Label'),
          datasets: [
            {
              label: 'Polar Area Dataset',
              data: generateRandomData(newDataPointCount, 10, 100),
              backgroundColor: Array.from({ length: newDataPointCount }, (_, i) => polarColors[i % polarColors.length]),
              borderWidth: 1,
              borderColor: '#fff',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              position: 'right',
            },
            title: {
              display: true,
              text: 'Polar Area Chart',
            },
          },
        },
      });
    };

    return {
      props: {
        chartConfig,
        onRefresh,
      },
      template: `
        <org-storybook-example-container title="Polar Area Chart">
          <org-storybook-example-container-section label="Example">
            <org-chart [configuration]="chartConfig()" />
            <div>
              <org-button (clicked)="onRefresh()">Refresh Data</org-button>
            </div>
          </org-storybook-example-container-section>
        </org-storybook-example-container>
      `,
      moduleMetadata: {
        imports: [Chart, Button, StorybookExampleContainer, StorybookExampleContainerSection],
      },
    };
  },
};

export const RadarChart: Story = {
  render: () => {
    const dataPointCount = getRandomInt(10, 30);
    const chartConfig = signal<ChartConfiguration>({
      type: 'radar',
      data: {
        labels: generateLabels(dataPointCount, 'Metric'),
        datasets: [
          {
            label: 'Performance',
            data: generateRandomData(dataPointCount, 20, 100),
            backgroundColor: getCssVariable('--chart-indigo-500').replace(')', ', 0.2)').replace('rgb', 'rgba'),
            borderColor: getCssVariable('--chart-indigo-600'),
            borderWidth: 2,
            pointBackgroundColor: getCssVariable('--chart-indigo-600'),
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Radar Chart',
          },
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });

    const onRefresh = () => {
      const newDataPointCount = getRandomInt(10, 30);
      chartConfig.set({
        type: 'radar',
        data: {
          labels: generateLabels(newDataPointCount, 'Metric'),
          datasets: [
            {
              label: 'Performance',
              data: generateRandomData(newDataPointCount, 20, 100),
              backgroundColor: getCssVariable('--chart-indigo-500').replace(')', ', 0.2)').replace('rgb', 'rgba'),
              borderColor: getCssVariable('--chart-indigo-600'),
              borderWidth: 2,
              pointBackgroundColor: getCssVariable('--chart-indigo-600'),
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'Radar Chart',
            },
          },
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
            },
          },
        },
      });
    };

    return {
      props: {
        chartConfig,
        onRefresh,
      },
      template: `
        <org-storybook-example-container title="Radar Chart">
          <org-storybook-example-container-section label="Example">
            <org-chart [configuration]="chartConfig()" />
            <div>
              <org-button (clicked)="onRefresh()">Refresh Data</org-button>
            </div>
          </org-storybook-example-container-section>
        </org-storybook-example-container>
      `,
      moduleMetadata: {
        imports: [Chart, Button, StorybookExampleContainer, StorybookExampleContainerSection],
      },
    };
  },
};

export const LoadingState: Story = {
  render: () => {
    return {
      template: `
        <org-storybook-example-container title="Loading State">
          <org-storybook-example-container-section label="Example">
            <org-chart [configuration]="null" [isLoading]="true" />
          </org-storybook-example-container-section>
        </org-storybook-example-container>
      `,
      moduleMetadata: {
        imports: [Chart, StorybookExampleContainer, StorybookExampleContainerSection],
      },
    };
  },
};

export const EmptyState: Story = {
  render: () => {
    return {
      template: `
        <org-storybook-example-container title="Empty State">
          <org-storybook-example-container-section label="Example">
            <org-chart [configuration]="null" />
          </org-storybook-example-container-section>
        </org-storybook-example-container>
      `,
      moduleMetadata: {
        imports: [Chart, StorybookExampleContainer, StorybookExampleContainerSection],
      },
    };
  },
};
