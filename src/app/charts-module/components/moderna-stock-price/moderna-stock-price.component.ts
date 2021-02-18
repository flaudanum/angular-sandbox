import { Component, OnInit } from '@angular/core';
import { ModernaDataService } from '../../services/moderna-data.service';
import { StockPriceData } from '../../services/stock-price-data';
import {
  Chart,
  ChartPoint,
  ChartDataSets,
  ChartOptions,
  ChartXAxe,
  ChartYAxe,
} from 'chart.js';
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

/**
 * This interface is needed because plugin chart-plugin-zoom modifies class Chart dynamically which
 * cannot be detected by the TypeScript compiler
 */
interface ChartZoom extends Chart {
  resetZoom: () => void;
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
      },
    ],
    yAxes: [
      {
        ticks: {
          stepSize: 20,
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

        // On category scale, factor of pan velocity
        speed: 20,

        // Minimal pan distance required before actually applying pan
        threshold: 10,
      },

      // Container for zoom options
      zoom: {
        // Boolean to enable zooming
        enabled: true,

        // Enable drag-to-zoom behavior (does not work properly)
        drag: false,

        // Zooming directions. Remove the appropriate direction to disable
        // Eg. 'y' would only allow zooming in the y direction
        // A function that is called as the user is zooming and returns the
        // available directions can also be used:
        //   mode: function({ chart }) {
        //     return 'xy';
        //   },
        mode: 'xy',

        // Speed of zoom via mouse wheel
        // (percentage of zoom on a wheel event)
        speed: 0.1,

        // Minimal zoom distance required before actually applying zoom
        threshold: 2,

        // On category scale, minimal zoom level before actually applying zoom
        sensitivity: 3,
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

  zoomDragMode = false;

  constructor(private _dataService: ModernaDataService) {
    this.rawData = this._dataService.data;
  }

  ngOnInit(): void {
    let options: ChartOptions = { ...chartOptions };
    if (!options.plugins) {
      throw new Error('chartOptions.plugins is undefined');
    }

    options = this.setRanges(options);

    this._chart = new Chart('moderna-stock-chart', {
      type: 'line',
      data: {
        datasets: this.getDatasets(),
      },
      options,
    });
  }

  /**
   * Sets ranges chart's ticks and zoom/pan limits
   * @param options chart options object
   */
  private setRanges(options: ChartOptions) {
    // Time data range
    const datesRange: [number, number] = this._dataService.datesRange;

    // Prices range
    const pricesRange: [number, number] = this._dataService.pricesRange;

    // Upper bound computed with an axe ticks' step size of 20
    const priceUpperBound = Math.ceil(pricesRange[1] / 20) * 20;

    if (!options.plugins) {
      throw new Error('options.plugins is undefined');
    }

    /*      Zoom / Pan range      */

    options.plugins.zoom.pan.rangeMin = {
      // Format of min pan range depends on scale type
      x: datesRange[0],
      y: 0,
    };
    options.plugins.zoom.pan.rangeMax = {
      // Format of max pan range depends on scale type
      x: datesRange[1],
      y: priceUpperBound,
    };
    options.plugins.zoom.zoom.rangeMin = {
      // Format of min pan range depends on scale type
      x: datesRange[0],
      y: 0,
    };
    options.plugins.zoom.zoom.rangeMax = {
      // Format of max pan range depends on scale type
      x: datesRange[1],
      y: priceUpperBound,
    };

    /*      Axis ranges      */
    if (!options.scales?.xAxes) {
      throw new Error('');
    }
    (options.scales?.xAxes as ChartXAxe[])[0].ticks = {
      min: datesRange[0],
      max: datesRange[1],
    };
    (options.scales?.yAxes as ChartXAxe[])[0].ticks = {
      min: 0,
      max: priceUpperBound,
    };

    return options;
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

  resetZoom() {
    if (!this._chart) {
      throw new Error('Chart is undefined');
    }
    (this._chart as ChartZoom).resetZoom();
  }

  /**
   * Define zooming area with drag and drop
   */
  toggleZoomMode() {
    if (
      !(
        this._chart?.options.plugins &&
        'drag' in this._chart?.options.plugins?.zoom.zoom &&
        'enabled' in this._chart?.options.plugins?.zoom.pan
      )
    ) {
      throw new Error('Missing plugin option');
    }

    this._chart.options.plugins.zoom.zoom.drag = !this._chart.options.plugins
      .zoom.zoom.drag;

    this._chart.options.plugins.zoom.pan.enabled = !this._chart.options.plugins
      .zoom.pan.enabled;

    this.zoomDragMode = !this.zoomDragMode;
  }
}
