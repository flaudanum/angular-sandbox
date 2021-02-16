import { Component, OnInit } from '@angular/core';
import { ModernaDataService } from '../../services/moderna-data.service';
import { StockPriceData } from '../../services/stock-price-data';
import { Chart } from 'chart.js';
// declare const Chart: any;

@Component({
  selector: 'app-moderna-stock-price',
  templateUrl: './moderna-stock-price.component.html',
  styleUrls: ['./moderna-stock-price.component.css'],
})
export class ModernaStockPriceComponent implements OnInit {
  private _data: StockPriceData;
  private _chart: any;

  constructor(private _dataService: ModernaDataService) {
    this._data = this._dataService.data;
  }

  ngOnInit(): void {
    this._chart = new Chart('moderna-stock-chart', {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Moderna Stock Price',
            backgroundColor: '##009900FF',
            borderColor: '#FF0000FF',
            borderWidth: 1,
            showLine: true,
            fill: false,
            // No Bezier interpolation
            lineTension: 0,
            data: [
              {
                x: 0,
                y: 0,
              },
              {
                x: 0.5,
                y: 10,
              },
              {
                x: 1.5,
                y: 20,
              },
              {
                x: 3,
                y: 30,
              },
            ],
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              ticks: {
                suggestedMin: 0,
                suggestedMax: 3,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                max: 30,
                min: 0,
                stepSize: 5,
              },
            },
          ],
        },
      },
    });
  }
}
