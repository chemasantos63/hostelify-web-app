import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateproductinvoiceComponent } from './createproductinvoice.component';

describe('CreateproductinvoiceComponent', () => {
  let component: CreateproductinvoiceComponent;
  let fixture: ComponentFixture<CreateproductinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateproductinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateproductinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
