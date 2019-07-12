import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GridsterLayoutComponent } from './components/gridster-layout/gridster-layout.component';
import { GridsterLayoutService } from './services/gridster-layout.service';
import { GridsterModule } from 'angular-gridster2';
import { CardDemoComponent } from './components/card-demo/card-demo.component';


@NgModule({
  declarations: [
    AppComponent,
    GridsterLayoutComponent,
    CardDemoComponent
  ],
  imports: [
    BrowserModule,
    GridsterModule
  ],
  providers: [
    GridsterLayoutService
  ],
  bootstrap: [AppComponent],
  entryComponents: [CardDemoComponent]
})
export class AppModule { }
