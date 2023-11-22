import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  chart: any = [];
  @Input() data_1: bookingStatistic = { label: '', value: 0 };
  @Input() data_2: bookingStatistic = { label: '', value: 0 };

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('canvas', {
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
