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

  constructor() {
    this._data = modernaStockPriceData;
  }
}
