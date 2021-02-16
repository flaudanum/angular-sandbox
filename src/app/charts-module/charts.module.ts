import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartDemoComponent } from './chart-demo/chart-demo.component';
import { ChartjsDemoComponent } from './chartjs-demo/chartjs-demo.component';

@NgModule({
  declarations: [ChartDemoComponent, ChartjsDemoComponent],
  imports: [CommonModule],
})
export class ChartsModule {}
