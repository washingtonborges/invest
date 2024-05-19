import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Position } from '@models/stock/position.model';
import { Search } from '@models/stock/search.model';
import { StockService } from '@services/stock.service';
import { MessageService } from 'primeng/api';

interface EditLatestQuote{
  symbol: string;
  unit: number;
  date: Date | null;
}

@Component({
  selector: 'app-income-tax',
  templateUrl: './income-tax.component.html',
  styleUrl: './income-tax.component.css',
  providers: [MessageService]
})
export class IncomeTaxComponent implements OnInit {

  loading: boolean = true;

  year: string | null | undefined;

  search: Search = { date: new Date(), isLatestQuote: true, isCurrentPosition: false}

  position!: Position[];

  dialogVisible: boolean = false;

  dialogVisibleEditLatestQuote: boolean = false;

  editLatestQuote: EditLatestQuote = {
    symbol: '',
    date: new Date(),
    unit: 0
  };

  formGroup!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService, 
    private fb: FormBuilder, 
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.year = params.get('year');
      this.loadIncomeTaxData();
    });
    this.formGroup = this.fb.group({
      symbol: [this.editLatestQuote.symbol, Validators.required],
      date: [this.editLatestQuote.date, Validators.required],
      unit: [this.editLatestQuote.unit, Validators.required]
    });
  }


  loadIncomeTaxData(): void {
    this.search.date = new Date(`${this.year}-12-31`);
    this.stockService.postPosition(this.search).subscribe((data) => {
      this.position = data;
      this.loading = false;
    });
  }

  showDialog() {
      this.dialogVisible = true;
  }

  getTotal(position: any): number {
    if (position.latest.total === 0) {
      return position.history[position.history.length - 1].average.buy.total;
    } else {
      return position.latest.total;
    }
  }

  showEditLatestQuote(position: Position): void{
    this.editLatestQuote.symbol = position.symbol;
    this.editLatestQuote.date = position.latest.date;
    this.editLatestQuote.unit = position.latest.unit;
    this.formGroup = this.fb.group({
      date: [this.editLatestQuote.date],
      unit: [this.editLatestQuote.unit]
    });
    this.dialogVisibleEditLatestQuote = true;
  }
  
  onSubmit() {
    const formValues = this.formGroup.value;
    const payload = {
      ...formValues,
      unit: parseFloat(formValues.unit),
      date: formValues.date,
      symbol: this.editLatestQuote.symbol
    };
    this.stockService.updateLatestQuote(payload).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: `${ this.editLatestQuote.symbol }`, detail: "Latest quote updated!" });  
        this.position.map(item => {
          if (item.symbol === payload.symbol) {
            item.latest.date = payload.date;
            item.latest.unit = payload.unit;
            const total = payload.unit * item.quantity;
            item.latest.total = Number(total.toFixed(2));
          }
          return item;
        });
        this.dialogVisibleEditLatestQuote = false;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: `${ this.editLatestQuote.symbol }`, detail: "Fail update." });
        this.dialogVisibleEditLatestQuote = false;
      }
    );
  }
}
