import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/signUpBtn/button.component';
import { SingUpPopupComponent } from './components/sing-up-popup/sing-up-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    SingUpPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
