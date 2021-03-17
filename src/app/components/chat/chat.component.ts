import { Component, OnInit } from '@angular/core'
import { backendHost } from 'src/app/app.component';
import { getCookie, setCookie } from '../login-popup/login-popup.component';
@Component({
  selector: 'chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.less']
})
export class ChatComponent implements OnInit {
  /**
   * Текущее соединение
   */
  private ws:WebSocket | undefined;
  private activeRoom:string = "room1";
  
  ngOnInit(): void {
    setCookie("room","1")
    this.connectToWs();
  }
  /**
   * Изменить комнату
   * @param id id комнаты
   */
  changeRoom(id: string){
        var item = document.getElementById(id);
        if(item){
          item.className = "list-group-item list-group-item-action active text-white rounded-0";
          var room = item.getAttribute("numberRoom")
          setCookie("room",room?room:"1")
          var activeRoom = document.getElementById(this.activeRoom);
          if(activeRoom)
            activeRoom.className = "list-group-item list-group-item-action list-group-item-light rounded-0";
            this.activeRoom = id;
          var mb = document.getElementById("messageBox");
          if(mb){
            mb.innerHTML = ""
          }
            this.connectToWs();
        }
  }
  /**
   * Присоединение по WS
   * @param room Номер комнаты
   */
  connectToWs(){
    var credentials = getCookie("access_token")
    this.ws = new WebSocket("wss://" + backendHost + "/ws",[credentials?credentials:"noToken",`${getCookie("room")}`]);
    let socket = this.ws;

    socket.onopen = function() {
      alert("Соединение установлено");
    };
    let scope = this;

    socket.onmessage = function(event) {
      var user = getCookie("user");
      var data = JSON.parse(event.data);
      scope.writeMessage(data.message,data.user,data.dateTime, (data.user==user))
    };
    
    socket.onclose = function(event) {
      if (event.wasClean) {
        alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
      } else {
        alert('[close] Соединение прервано');
      }
    };
  }

  /**
   * Отправить сообщение
   * @param text Текст сообщения
   */
  sendMessage(text:string):void{
    if(this.ws)this.ws.send(text);
  }
  
  /**
   * Записать сообщение в чат
   * @param text Текст сообщения
   * @param username Пользователь
   * @param dateTime Время
   * @param received Отправитель/Получатель
   */
  writeMessage(text:string,username:string,dateTime:string,received:boolean){
    var doc = document.getElementsByClassName("chat-box")[0]
    var m1 = document.createElement('div');
    m1.className= `media w-50 ${received?'ml-auto':''} mb-3`
    var m2 = document.createElement('div');
    m2.className= `media-body ${received?'':'ml-3'}`
    var m3 = document.createElement('div');
    m3.className= `${received?'bg-primary':'bg-light'} rounded py-2 px-3 mb-2`
    var m4 = document.createElement('p');
    m4.className= `text-small mb-0 ${received?'text-white':'text-muted'}`;
    m4.textContent = text;
    var m5 = document.createElement('p');
    m5.className= `small text-muted'}`;
    m5.textContent = `Пользователь: ${username} , ${dateTime}`
    m1.append(m2);
    m2.append(m3);
    m2.append(m5)
    m3.append(m4);
    doc.append(m1)
    doc.scrollTop = doc.scrollHeight
  }
}
