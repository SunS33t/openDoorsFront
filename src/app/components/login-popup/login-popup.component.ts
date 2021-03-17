import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { backendHost } from 'src/app/app.component'

export function getCookie(name:string) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name:string, value:string) {
  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  document.cookie = updatedCookie;
}

@Component({
  selector: 'login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.less']
})
export class LoginPopupComponent implements OnInit {
  /**
   * Событие изменения состояния видимости модального окна входа/регистрации.
   */
  @Output() resetPopupStateEvent: EventEmitter<any> = new EventEmitter<any>();
  public emailVisible = true;

  ngOnInit (): void {
  }

  /**
   * Видимость поля email.
   * @param value Видимость
   */
  changeEmailVisibility (value: boolean): void {
    this.emailVisible = value
  }

  /**
   * Получение токена авторизации.
   * @param login Логин
   * @param pass Пароль
   */
  getToken (login: string, pass: string):void{
    const user = {
      Login: login,
      Password: pass
    }
    var scope = this;
    axios.post('https://'+ backendHost + '/token', user)
      .then(function (response: AxiosResponse) {
        scope.writeToCookie(login,response.data)
        alert("Успешный вход")
      })
      .catch(function (error: AxiosError) {
        alert("Ошибка авторизации: " + error.message)
        console.log(error)
      })
  }

  /**
   * Регистрация.
   * @param email Email
   * @param login Логин
   * @param pass Пароль
   */
  registration (email: string, login: string, pass: string): void {
    const user = {
      Email: email,
      Login: login,
      Password: pass
    }
    axios.post(backendHost + '/registration', user)
      .then(function (response: AxiosResponse) {
        if (response.status == 200)
          document.cookie = `access_token=${response.data}`
      })
      .catch(function (error: AxiosError) {
        console.log(error)
      })
  }

  /**
   * Запись в куки.
   * @param user Пользователь
   * @param accessToken Токен доступа
   */
  writeToCookie(user:string, accessToken:string):void{
    document.cookie = `access_token=${accessToken}`;
    document.cookie = `user=${user}`;
  }

  /**
   * Нажатие кнопки submit
   * @param email Email
   * @param login Логин
   * @param pass Пароль
   */
  onSubmitClick (email: string, login: string, pass: string): void {
    if (this.emailVisible)
      this.getToken(login, pass)
    else
      this.registration(email, login, pass)
  }
}
