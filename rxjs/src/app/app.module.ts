import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RxjsComponent } from './rxjs/rxjs.component';
import { DomComponent } from './dom/dom.component';
import { LeelaWebDevRxjsComponent } from './leela-web-dev-rxjs/leela-web-dev-rxjs.component';

@NgModule({
  declarations: [
    AppComponent,
    RxjsComponent,
    DomComponent,
    LeelaWebDevRxjsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
