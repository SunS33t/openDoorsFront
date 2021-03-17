import { ChangeDetectionStrategy, Component } from '@angular/core'

export const backendHost:string = 'localhost:44315'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
