import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCreateProductsComponent } from './update-create-products.component';

describe('UpdateCreateProductsComponent', () => {
  let component: UpdateCreateProductsComponent;
  let fixture: ComponentFixture<UpdateCreateProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCreateProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCreateProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
