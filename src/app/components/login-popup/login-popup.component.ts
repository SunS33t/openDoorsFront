import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import axios, { AxiosError, AxiosResponse } from 'axios'

@Component({
  selector: 'login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.less']
})
export class LoginPopupComponent implements OnInit {
  @Output() resetPopupStateEvent: EventEmitter<any> = new EventEmitter<any>()
  public emailVisible = true

  ngOnInit (): void {
  }

  changeEmailVisibility (value: boolean): void {
    this.emailVisible = value
  }

  async getToken (login: string, pass: string, email: string = ''): Promise<void> {

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
