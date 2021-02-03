import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../components/main/main.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { AuthenticationGuard } from './authentication.guard';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: '', component: MainComponent, canActivate: [AuthenticationGuard] },
  { path: '**', redirectTo: 'sign-in', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
