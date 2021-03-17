import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-registration-view',
  templateUrl: './registration-view.component.html',
  styleUrls: ['./registration-view.component.less']
})
export class RegistrationViewComponent implements OnInit {
  public loginPopupVisible = false

  /**
   * Изменения состояния видимости модального окна.
   */
  changePopupState = (): void => {
    this.loginPopupVisible = !this.loginPopupVisible
  }

  ngOnInit (): void {
  }
}
