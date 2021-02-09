import { Component, Input, OnInit } from '@angular/core';
import { Form, FormControlName, FormGroup } from '@angular/forms';


@Component({
  selector: 'sing-up-popup',
  templateUrl: './sing-up-popup.component.html',
  styleUrls: ['./sing-up-popup.component.less']
})
export class SingUpPopupComponent implements OnInit {

  public emailVisible:boolean = true;

  constructor() { }

  ngOnInit(): void { 
  }

  changeEmailVisible(value:boolean){
    this.emailVisible = value;
  }
  
  async getToken(email:string,login:string,pass:string){  
      let user = {
        Email: email,
        Login: login,
        Password: pass
      };
      //alert(`email: ${user.Email} \nlogin: ${user.Login} \npassword: ${user.Password}`)
      let response = await fetch('https://localhost:44329/gettoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });
      let result = await response.json();
        alert(result.message);
        document.cookie = `access_token = [${result.message}]`;
      }
 
}




