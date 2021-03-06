import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from './authentication.guard';

import { SignInComponent } from '../components/sign-in/sign-in.component';
import { UnderConstructionComponent } from '../components/under-construction/under-construction.component';
import { MainComponent } from '../layout-module/main/main.component';

import { ChartDemoComponent } from '../charts-module/components/chart-demo/chart-demo.component';
import { ChartjsDemoComponent } from '../charts-module/components/chartjs-demo/chartjs-demo.component';
import { ModernaStockPriceComponent } from '../charts-module/components/moderna-stock-price/moderna-stock-price.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'chart-demo', component: ChartDemoComponent },
      { path: 'chartjs-demo', component: ChartjsDemoComponent },
      { path: 'moderna-stock-price', component: ModernaStockPriceComponent },
      { path: 'menu3', component: UnderConstructionComponent },
      { path: '**', redirectTo: 'chart-demo', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'sign-in', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
