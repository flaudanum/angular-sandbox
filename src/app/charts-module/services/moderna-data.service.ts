import { Injectable } from '@angular/core';
import { modernaStockPriceData } from './data';
import { StockPriceData } from './stock-price-data';

@Injectable({
  providedIn: 'root',
})
export class ModernaDataService {
  get data(): StockPriceData {
    return this._data;
  }

  private _data: StockPriceData;
  private _dateRange: [number, number];

  constructor() {
    const dtObject = modernaStockPriceData;
    this._data = {
      date: dtObject.date.map((strDate) => new Date(strDate)),
      opening: dtObject.opening,
      low: dtObject.low,
      high: dtObject.high,
      closing: dtObject.closing,
      volume: dtObject.volume,
    };
    this._dateRange = [0, 0];
  }
}
