import { Component, OnInit } from '@angular/core'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { backendHost } from 'src/app/app.component'

/**
 * Получить куки.
 * @param name Навзание.
 * @returns 
 */
export function getCookie(name: string) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * Установить куки.
 * @param name Название.
 * @param value Значение.
 */
export function setCookie(name: string, value: string) {
  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  document.cookie = updatedCookie;
}

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

  ngOnInit(): void {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton?.addEventListener('click', () => {
      container?.classList.add("right-panel-active");
    });

    signInButton?.addEventListener('click', () => {
      container?.classList.remove("right-panel-active");
    });
  }

  /**
   * Получение токена авторизации.
   * @param login Логин
   * @param pass Пароль
   */
  getToken(login: string, pass: string): void {
    const user = {
      Login: login,
      Password: pass
    }
    var scope = this;
    axios.post('https://' + backendHost + '/token', user)
      .then(function (response: AxiosResponse) {
        scope.writeToCookie(login, response.data)
        alert("Успешный вход");
      })
      .catch(function (error: AxiosError) {
        alert("Ошибка авторизации: " + error.response?.data);
        console.log(error)
      })
  }

  /**
   * Регистрация.
   * @param email Email
   * @param login Логин
   * @param pass Пароль
   */
  registration(email: string, login: string, pass: string): void {
    var scope = this;
    const user = {
      Email: email,
      Login: login,
      Password: pass
    }
    axios.post(backendHost + '/registration', user)
      .then(function (response: AxiosResponse) {
        scope.writeToCookie(login, response.data)
        alert("Успешная регистрация и вход");
      })
      .catch(function (error: AxiosError) {
        alert("Ошибка при регистрации: " + error.response?.data)
        console.log(error);
      })
  }

  /**
   * Запись в куки.
   * @param user Пользователь
   * @param accessToken Токен доступа
   */
  writeToCookie(user: string, accessToken: string): void {
    document.cookie = `access_token=${accessToken}`;
    document.cookie = `user=${user}`;
  }

  /**
   * Нажатие кнопки SignIn
   * @param email Email
   * @param login Логин
   * @param pass Пароль
   */
  onSignInClick(login: string, pass: string): void {
    this.getToken(login, pass);
  }

  /**
  * Нажатие кнопки SignUp
  * @param email Email
  * @param login Логин
  * @param pass Пароль
  */
  onSignUpClick(email: string, login: string, pass: string): void {
    this.registration(email, login, pass)
  }
}
