import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebStorageService {

  constructor() { }

  /**
   * Clears the web session storage
   */
  clearStorage() {
    sessionStorage.clear();
  }

  setItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }
}
