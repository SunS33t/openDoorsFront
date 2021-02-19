import { Component, OnInit,EventEmitter, Input,Output } from '@angular/core'
import axios, { AxiosError, AxiosResponse } from 'axios'

@Component({
  selector: 'app-signup-popup',
  templateUrl: './signup-popup.component.html',
  styleUrls: ['./signup-popup.component.less']
})
export class SignupPopupComponent implements OnInit {
  @Output() resetPopupStateEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() popupVisible = false
  public emailVisible = true

  ngOnInit (): void {
  }
 
  changePopupVisibility():void{
    this.popupVisible=!this.popupVisible;
  }

  changeEmailVisibility (value: boolean): void {
    this.emailVisible = value
  }

  async getToken (login: string, pass: string,email:string="" ): Promise<void> {

    const user = {
      Login: login,
      Password: pass
    }
    const backendApi = 'https://localhost:44320/'

    axios.post(backendApi + '/gettoken', user)
      .then(function (response: AxiosResponse) {
        document.cookie = `access_token = Bearer ${response.data}`
      })
      .catch(function (error: AxiosError) {
        console.log(error)
      })
  }

  async registration (email: string, login: string, pass: string): Promise<void> {

    const user = {
      Name: login,
      Password: pass
    }
    const backendApi = 'https://localhost:44320/'

    axios.post(backendApi + '/registration', user)
      .then(function (response: AxiosResponse) {
        if (response.status == 200)
          document.cookie = `access_token = Bearer ${response.data}`
      })
      .catch(function (error: AxiosError) {
        console.log(error)
      })
  }

  onSubmitClick (email: string, login: string, pass: string): void {
    if (this.emailVisible)
      this.getToken(login, pass)
    else
      this.registration(email, login, pass)
  }
}
