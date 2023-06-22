import { Component, Input, OnInit } from '@angular/core';
import { Stock } from '@models/stock/stock.model';
import { StockService } from '@services/stock.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css']
})
export class StockCardComponent {
  @Input()
  stock!: Stock;
}
