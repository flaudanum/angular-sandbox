import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ChartDemoComponent } from './components/chart-demo/chart-demo.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { LayoutModule } from './layout-module/layout.module';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ChartDemoComponent,
    UnderConstructionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
