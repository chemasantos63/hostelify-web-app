import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductInvoiceComponent } from './create-product-invoice.component';

describe('CreateProductInvoiceComponent', () => {
  let component: CreateProductInvoiceComponent;
  let fixture: ComponentFixture<CreateProductInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
