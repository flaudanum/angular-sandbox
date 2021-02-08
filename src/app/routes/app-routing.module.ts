import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartDemoComponent } from '../components/chart-demo/chart-demo.component';
import { MainComponent } from '../components/main/main.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { UnderConstructionComponent } from '../components/under-construction/under-construction.component';
import { AuthenticationGuard } from './authentication.guard';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'chart-demo', component: ChartDemoComponent },
      { path: 'menu2', component: UnderConstructionComponent },
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
