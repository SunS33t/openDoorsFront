import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'signup-switch-button',
  templateUrl: './signup-switch-button.component.html',
  styleUrls: ['./signup-switch-button.component.less']
})
export class SignupSwitchButtonComponent implements OnInit {
  @Output() changePopupStateEvent: EventEmitter<any> = new EventEmitter<any>()

  ngOnInit (): void {

  }

}
