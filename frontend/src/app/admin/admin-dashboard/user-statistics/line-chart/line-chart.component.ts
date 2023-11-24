import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent {
  chart: any = [];
  @ViewChild('lineChartCanvas', { static: true }) chartCanvas: ElementRef;
  @Input() labels: string[];
  @Input() values: number[];
  @Input() backgroundColor: string;
  @Input() chartTitle: string = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.createChart();
    this.cdr.detectChanges(); // Trigger change detection
  }

  createChart() {
    const canvas: any = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'No. of Bookings',
            data: this.values,
            borderColor: this.backgroundColor,
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: this.chartTitle,
            font: {
              size: 16,
            },
          },
        },
      },
    });
  }
}
