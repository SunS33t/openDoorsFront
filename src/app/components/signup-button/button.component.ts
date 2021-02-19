import { Component, EventEmitter, OnInit, Output } from '@angular/core'


@Component({
  selector: 'app-signup-btn',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less']
})
export class ButtonComponent implements OnInit {
  @Output() changePopupStateEvent: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit (): void {
    
  }
  

}
