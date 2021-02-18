import { Component, OnInit } from '@angular/core';
import { ModernaDataService } from '../../services/moderna-data.service';
import { StockPriceData } from '../../services/stock-price-data';
import { Chart, ChartPoint, ChartDataSets, ChartOptions } from 'chart.js';
import { zip } from 'src/app/shared/utils';

type ChartTag = 'opening' | 'low' | 'high' | 'closing';

interface Setting {
  label: string;
  borderColor: string;
}

interface ChartsSettings {
  opening: Setting;
  low: Setting;
  high: Setting;
  closing: Setting;
}

const chartsSettings: ChartsSettings = {
  opening: {
    label: 'Opening',
    borderColor: '#00662aff',
  },
  low: {
    label: 'Low',
    borderColor: '#0050dbff',
  },
  high: {
    label: 'High',
    borderColor: '#eb0000ff',
  },
  closing: {
    label: 'Closing',
    borderColor: '#660099ff',
  },
};

const chartOptions: ChartOptions = {
  title: {
    text: 'Moderna Stock Price History',
    display: true,
    position: 'bottom',
    fontSize: 24,
  },
  legend: {
    display: true,
    position: 'top',
    align: 'center',
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
};

const baseDataset = {
  pointRadius: 0,
  borderWidth: 1.5,
  showLine: true,
  fill: false,
  lineTension: 0.1,
};

@Component({
  selector: 'app-moderna-stock-price',
  templateUrl: './moderna-stock-price.component.html',
  styleUrls: ['./moderna-stock-price.component.css'],
})
export class ModernaStockPriceComponent implements OnInit {
  // private _data: (number | number[])[] | ChartPoint[];
  private _chart: Chart | undefined;

  showCharts = {
    opening: true,
    low: true,
    high: true,
    closing: true,
  };

  rawData: StockPriceData;

  constructor(private _dataService: ModernaDataService) {
    this.rawData = this._dataService.data;
  }

  ngOnInit(): void {
    this._chart = new Chart('moderna-stock-chart', {
      type: 'line',
      data: {
        datasets: this.getDatasets(),
      },
      options: chartOptions,
    });
  }

  private getFormattedData(chartTag: ChartTag): ChartPoint[] {
    return zip([this.rawData.date, this.rawData[chartTag]]).map((pair) => {
      return {
        t: new Date(pair[0]),
        y: pair[1],
      } as ChartPoint;
    });
  }

  private getDatasets(): ChartDataSets[] {
    const datasets: ChartDataSets[] = [];
    let dataset: ChartDataSets;

    Object.entries(chartsSettings).forEach(
      ([chartTag, props]: [string, Setting]) => {
        // The chart is not displayed
        if (!this.showCharts[chartTag as ChartTag]) {
          return;
        }

        // Sets the chart's dataset
        dataset = {
          ...baseDataset,
          ...props,
          data: this.getFormattedData(chartTag as ChartTag),
        };

        // Registers the chart's dataset
        datasets.push(dataset);
      }
    );

    return datasets;
  }

  toggleChart(chartTag: ChartTag): void {
    this.showCharts[chartTag] = !this.showCharts[chartTag];
    if (!this._chart) {
      throw new Error('Chart is undefined');
    }
    this._chart.data.datasets = this.getDatasets();
    this._chart.update();
  }
}
