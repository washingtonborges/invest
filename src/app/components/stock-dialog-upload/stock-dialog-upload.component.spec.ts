import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDialogUploadComponent } from './stock-dialog-upload.component';

describe('StockDialogUploadComponent', () => {
  let component: StockDialogUploadComponent;
  let fixture: ComponentFixture<StockDialogUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDialogUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockDialogUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
