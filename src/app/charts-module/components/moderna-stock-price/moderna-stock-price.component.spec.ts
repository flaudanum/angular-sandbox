import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernaStockPriceComponent } from './moderna-stock-price.component';

describe('ModernaStockPriceComponent', () => {
  let component: ModernaStockPriceComponent;
  let fixture: ComponentFixture<ModernaStockPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModernaStockPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModernaStockPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
