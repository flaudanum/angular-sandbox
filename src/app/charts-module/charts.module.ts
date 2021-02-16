import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartDemoComponent } from './components/chart-demo/chart-demo.component';
import { ChartjsDemoComponent } from './components/chartjs-demo/chartjs-demo.component';
import { ModernaDataService } from './services/moderna-data.service';
import { ModernaStockPriceComponent } from './components/moderna-stock-price/moderna-stock-price.component';

@NgModule({
  declarations: [ChartDemoComponent, ChartjsDemoComponent, ModernaStockPriceComponent],
  imports: [CommonModule],
  providers: [ModernaDataService],
})
export class ChartsModule {}
