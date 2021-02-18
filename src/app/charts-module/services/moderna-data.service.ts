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

  get datesRange() {
    return this._datesRange;
  }

  get pricesRange() {
    return this._pricesRange;
  }

  private _data: StockPriceData;
  private _datesRange: [number, number];
  private _pricesRange: [number, number];

  constructor() {
    // Data Transfer Object
    const dtObject = modernaStockPriceData;

    // Formats data
    this._data = {
      date: dtObject.date.map((strDate) => new Date(strDate)),
      opening: dtObject.opening,
      low: dtObject.low,
      high: dtObject.high,
      closing: dtObject.closing,
      volume: dtObject.volume,
    };

    // Dates in msec.
    const msDates = this._data.date.map((date: Date) => date.getTime());

    // Dates range
    const msMinDate = Math.min(...msDates);
    const msMaxDate = Math.max(...msDates);

    this._datesRange = [msMinDate, msMaxDate];

    // Stock prices' range
    const maxStockPrice = Math.max(
      ...this._data.opening,
      ...this._data.closing,
      ...this._data.low,
      ...this._data.high
    );
    this._pricesRange = [0, maxStockPrice];
  }
}
