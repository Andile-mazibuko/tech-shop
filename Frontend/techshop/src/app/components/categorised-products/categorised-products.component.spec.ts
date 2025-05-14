import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorisedProductsComponent } from './categorised-products.component';

describe('CategorisedProductsComponent', () => {
  let component: CategorisedProductsComponent;
  let fixture: ComponentFixture<CategorisedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorisedProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategorisedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
