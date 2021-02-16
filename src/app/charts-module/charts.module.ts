import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartDemoComponent } from './components/chart-demo/chart-demo.component';
import { ChartjsDemoComponent } from './components/chartjs-demo/chartjs-demo.component';

@NgModule({
  declarations: [ChartDemoComponent, ChartjsDemoComponent],
  imports: [CommonModule],
})
export class ChartsModule {}
