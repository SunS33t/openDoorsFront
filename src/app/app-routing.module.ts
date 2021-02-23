import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RoomViewComponent } from './room-view/room-view.component'
import { RegistrationViewComponent } from './registration-view/registration-view.component'
import { WrapperComponent } from './wrapper/wrapper.component'
import { ErrorComponent } from './error/error.component'

const routes: Routes = [
  { path: 'room', component: RoomViewComponent },
  { path: 'registration', component: RegistrationViewComponent },
  { path: '', component: WrapperComponent },
  { path: '**', component: ErrorComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
