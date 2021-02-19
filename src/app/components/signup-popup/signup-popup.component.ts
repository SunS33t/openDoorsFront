import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-signup-popup',
  templateUrl: './signup-popup.component.html',
  styleUrls: ['./signup-popup.component.less']
})
export class SignupPopupComponent implements OnInit {
  public emailVisible = true

  ngOnInit (): void {
  }

  changeEmailVisibility (value: boolean): void {
    this.emailVisible = value
  }

  async getToken (email: string, login: string, pass: string): Promise<void> {
    const user = {
      Email: email,
      Login: login,
      Password: pass
    }
    const backendApi = 'https://localhost:44329'
    const response = await fetch(backendApi + '/gettoken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    })
    const result = await response.json()
    alert(result.message)
    document.cookie = `access_token = [${result.message}]`
  }
}
