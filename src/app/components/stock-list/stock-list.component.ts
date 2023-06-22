import { Component, OnInit } from '@angular/core';
import { Stock } from '@models/stock/stock.model';
import { StockService } from '@services/stock.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  data$: Observable<Stock[]> = of([]);

  constructor(private stockService: StockService) {}

  async ngOnInit(): Promise<void> {
    this.data$ = await this.stockService.getAll();
  }
}
