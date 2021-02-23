import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-registration-view',
  templateUrl: './registration-view.component.html',
  styleUrls: ['./registration-view.component.less']
})
export class RegistrationViewComponent implements OnInit {
  isRegistering = false

  changePopupState = (): void => {
    this.isRegistering = !this.isRegistering
  }

  ngOnInit (): void {
  }
}
