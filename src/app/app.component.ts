import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'socket-cliente';


  constructor(public webSocket: WebsocketService, public chatService:ChatService){}


  ngOnInit(){

    this.chatService.getMessagesPrivate().subscribe(msg => {
      console.log(msg);
    });
  }
}
