import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
}
