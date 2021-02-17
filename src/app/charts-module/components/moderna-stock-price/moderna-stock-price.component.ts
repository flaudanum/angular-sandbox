import { Component, OnInit } from '@angular/core';
import { ModernaDataService } from '../../services/moderna-data.service';
import { StockPriceData } from '../../services/stock-price-data';
import { Chart, ChartPoint } from 'chart.js';
import { zip } from 'src/app/shared/utils';
// declare const Chart: any;

@Component({
  selector: 'app-moderna-stock-price',
  templateUrl: './moderna-stock-price.component.html',
  styleUrls: ['./moderna-stock-price.component.css'],
})
export class ModernaStockPriceComponent implements OnInit {
  private _data: (number | number[])[] | ChartPoint[];
  private _chart: any;

  constructor(private _dataService: ModernaDataService) {
    this.updateData();
  }

  private updateData() {
    const rawData: StockPriceData = this._dataService.data;
    this._data = zip([rawData.date, rawData.open]).map((pair) => {
      return {
        t: new Date(pair[0]),
        y: pair[1],
      } as ChartPoint;
    });
  }

  ngOnInit(): void {
    this._chart = new Chart('moderna-stock-chart', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Moderna Stock Price',
            backgroundColor: '##009900FF',
            borderColor: '#505050FF',
            pointRadius: 0,
            borderWidth: 1,
            showLine: true,
            fill: false,
            // No Bezier interpolation
            lineTension: 0.1,
            data: this._data,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            text: 'Time Scale',
            display: true,
          },
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'month',
              },
            },
          ],
        },
      },
    });
  }
}
