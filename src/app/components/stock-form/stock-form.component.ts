import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stock } from '@models/stock/stock.model';
import { StockService } from '@services/stock.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})

export class StockFormComponent implements OnInit {
  stockForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private stockService: StockService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.stockForm = this.formBuilder.group({
      symbol: ['TEST', Validators.required],
      quantity: ['1', Validators.required],
      date: ['1900-01-01', Validators.required],
      price: ['1', Validators.required],
      fee: ['1', Validators.required],
      operation: ['true', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.stockForm.invalid) {
      return;
    }
    const newStock: Stock = this.stockForm.value;
    const result = await this.stockService.post(newStock).toPromise();
    this.stockForm.reset();
  }
}
