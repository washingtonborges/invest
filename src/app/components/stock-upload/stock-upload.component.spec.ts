import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockUploadComponent } from './stock-upload.component';

describe('StockUploadComponent', () => {
  let component: StockUploadComponent;
  let fixture: ComponentFixture<StockUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
