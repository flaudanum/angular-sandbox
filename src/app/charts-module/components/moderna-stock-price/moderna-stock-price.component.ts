import { Component, OnInit } from '@angular/core';
import { ModernaDataService } from '../../services/moderna-data.service';
import { StockPriceData } from '../../services/stock-price-data';
import { Chart, ChartPoint, ChartDataSets, ChartOptions } from 'chart.js';
import 'chartjs-plugin-zoom';
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
  plugins: {
    zoom: {
      // Container for pan options
      pan: {
        // Boolean to enable panning
        enabled: true,

        // Panning directions. Remove the appropriate direction to disable
        // Eg. 'y' would only allow panning in the y direction
        // A function that is called as the user is panning and returns the
        // available directions can also be used:
        //   mode: function({ chart }) {
        //     return 'xy';
        //   },
        mode: 'xy',

        rangeMin: {
          // Format of min pan range depends on scale type
          x: null,
          y: null,
        },
        rangeMax: {
          // Format of max pan range depends on scale type
          x: null,
          y: null,
        },

        // On category scale, factor of pan velocity
        speed: 20,

        // Minimal pan distance required before actually applying pan
        threshold: 10,

        // // Function called while the user is panning
        // onPan: function({chart}) { console.log(`I'm panning!!!`); },
        // // Function called once panning is completed
        // onPanComplete: function({chart}) { console.log(`I was panned!!!`); }
      },

      // Container for zoom options
      zoom: {
        // Boolean to enable zooming
        enabled: true,

        // Enable drag-to-zoom behavior
        drag: false,

        // Drag-to-zoom effect can be customized
        // drag: {
        // 	 borderColor: 'rgba(225,225,225,0.3)'
        // 	 borderWidth: 5,
        // 	 backgroundColor: 'rgb(225,225,225)',
        // 	 animationDuration: 0
        // },

        // Zooming directions. Remove the appropriate direction to disable
        // Eg. 'y' would only allow zooming in the y direction
        // A function that is called as the user is zooming and returns the
        // available directions can also be used:
        //   mode: function({ chart }) {
        //     return 'xy';
        //   },
        mode: 'xy',

        rangeMin: {
          // Format of min zoom range depends on scale type
          x: null,
          y: null,
        },
        rangeMax: {
          // Format of max zoom range depends on scale type
          x: null,
          y: null,
        },

        // Speed of zoom via mouse wheel
        // (percentage of zoom on a wheel event)
        speed: 0.1,

        // Minimal zoom distance required before actually applying zoom
        threshold: 2,

        // On category scale, minimal zoom level before actually applying zoom
        sensitivity: 3,

        // // Function called while the user is zooming
        // onZoom: function({chart}) { console.log(`I'm zooming!!!`); },
        // // Function called once zooming is completed
        // onZoomComplete: function({chart}) { console.log(`I was zoomed!!!`); }
      },
    },
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
        t: pair[0],
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
