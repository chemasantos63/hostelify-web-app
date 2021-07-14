import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsinvoiceComponent } from './productsinvoice.component';

describe('ProductsinvoiceComponent', () => {
  let component: ProductsinvoiceComponent;
  let fixture: ComponentFixture<ProductsinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
