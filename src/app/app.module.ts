import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { SignupSwitchButtonComponent } from './components/signup-switch-button/signup-switch-button.component'
import { LoginPopupComponent } from './components/login-popup/login-popup.component'
import { RoomViewComponent } from './room-view/room-view.component'
import { RegistrationViewComponent } from './registration-view/registration-view.component'
import { ErrorComponent } from './error/error.component'
import { ChatComponent } from './components/chat/chat.component';
import { WrapperComponent } from './wrapper/wrapper.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    AppComponent,
    SignupSwitchButtonComponent,
    LoginPopupComponent,
    RoomViewComponent,
    RegistrationViewComponent,
    ErrorComponent,
    ChatComponent,
    WrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
