import { Component, Input, OnInit } from '@angular/core';
import { Form, FormControlName, FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'sing-up-popup',
  templateUrl: './sing-up-popup.component.html',
  styleUrls: ['./sing-up-popup.component.less']
})
export class SingUpPopupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { 

  }
  
   getToken(email:string,login:string,pass:string){  
      let user = {
        Email: email,
        Login: login,
        Password: pass
      };
      fetch('https://localhost:44320/gettoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }).then(response => response.json().then(text => {
         alert(text);
         document.cookie = `access_token = [${text}]`;
        })
      )
      .catch(error => console.error('Unable to add item.', error));
      }
 
}




