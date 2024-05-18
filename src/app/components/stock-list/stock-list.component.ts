import { Component, OnInit } from '@angular/core';
import { Position } from '@models/stock/position.model';
import { Search } from '@models/stock/search.model';
import { StockService } from '@services/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  search: Search = { date: new Date(), isLatestQuote: false, isCurrentPosition: true}

  position!: Position[];

  constructor(private stockService: StockService) {}

  async ngOnInit(): Promise<void> {
    this.stockService.postPosition(this.search).subscribe((data) => {
      this.position = data;
    });
  }
}
