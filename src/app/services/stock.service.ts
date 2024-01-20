import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Stock } from '@models/stock/stock.model';

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
}
