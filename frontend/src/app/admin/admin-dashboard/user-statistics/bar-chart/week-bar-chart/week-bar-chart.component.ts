import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-week-bar-chart',
  templateUrl: './week-bar-chart.component.html',
  styleUrls: ['./week-bar-chart.component.scss'],
})
export class WeekBarChartComponent {
  chart: any = [];
  @ViewChild('weekCanvas', { static: true }) chartCanvas: ElementRef;
  @Input() data_1: bookingStatistic = { label: '', value: 0 };
  @Input() data_2: bookingStatistic = { label: '', value: 0 };
  @Input() data_3: bookingStatistic = { label: '', value: 0 };
  @Input() data_4: bookingStatistic = { label: '', value: 0 };
  @Input() data_5: bookingStatistic = { label: '', value: 0 };
  @Input() data_6: bookingStatistic = { label: '', value: 0 };
  @Input() data_7: bookingStatistic = { label: '', value: 0 };
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
      type: 'bar',
      data: {
        labels: [
          this.data_1.label,
          this.data_2.label,
          this.data_3.label,
          this.data_4.label,
          this.data_5.label,
          this.data_6.label,
          this.data_7.label,
        ],
        datasets: [
          {
            label: 'No. of Bookings',
            data: [
              this.data_1.value,
              this.data_2.value,
              this.data_3.value,
              this.data_4.value,
              this.data_5.value,
              this.data_6.value,
              this.data_7.value,
            ],
            backgroundColor: [
              '#A445F5',
              '#A445F5',
              '#A445F5',
              '#A445F5',
              '#A445F5',
              '#A445F5',
              '#A445F5',
            ],
            borderWidth: 1,
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
interface bookingStatistic {
  label: string;
  value: number;
}
