import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements AfterViewInit {
  chart: any = [];
  @ViewChild('canvas') chartCanvas: ElementRef;
  @Input() data_1: bookingStatistic = { label: '', value: 0 };
  @Input() data_2: bookingStatistic = { label: '', value: 0 };

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
        labels: [this.data_1.label, this.data_2.label],
        datasets: [
          {
            label: 'No. of Bookings',
            data: [this.data_1.value, this.data_2.value],
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
      },
    });
  }
}

interface bookingStatistic {
  label: string;
  value: number;
}
