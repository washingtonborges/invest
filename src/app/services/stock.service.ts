import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Stock } from '@models/stock/stock.model';
import { Search } from '@models/stock/search.model';
import { Position } from '@models/stock/position.model';
import { Latest } from '@models/stock/latest.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private endpoint: string = 'stock';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Stock[]>{
    return this.apiService.get(this.endpoint);
  }

  post(stock: Stock): Observable<Stock>{
    return this.apiService.post(this.endpoint, stock);
  }

  postImportFiles(files: any[]): Observable<Stock[]>{
    const data = this.apiService.post(`${this.endpoint}/import/`, files, true);
    return data;
  }

  postPosition(data: Search): Observable<Position[]>{
    return this.apiService.post(`${this.endpoint}/grouped/`, data);
  }

  updateLatestQuote(data: Search): Observable<Latest[]>{
    return this.apiService.post(`${this.endpoint}/updatelatestquote/`, data);
  }

  getYears(): Observable<number[]>{
    return this.apiService.get(`${this.endpoint}/getYears/`);
  }
}
