import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../routes/app-routing.module';

@NgModule({
  declarations: [MainComponent, HeaderComponent],
  imports: [CommonModule, AppRoutingModule],
})
export class LayoutModule {}
