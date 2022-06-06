import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import Echo from 'laravel-echo';

import {IMessage, IUser} from "../insterfaces/chat";
import {ChatService} from "../services/chat.service";
import {DatePipe} from "@angular/common";
import { scrollTo } from "scroll-js";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  echo: Echo;
  userList: IUser[] = [];
  inputMessage: string;
  messages: IMessage[] = [];


  constructor(
    private chatService: ChatService,
  ) {
   this.inputMessage = '';
   this.echo = chatService.getSockets();
  }

  ngOnInit(): void {
    this.echo.private('channel-chat')
      .listen('ChatEvent', (resp: any)=> {
        const message: IMessage = {
          message: resp.message,
          me: false,
          from: resp.from,
          sent_at: resp.sent_at
        }
        this.messages.push(message);
      });

    const user = JSON.parse(localStorage.getItem('user')??'');
    this.echo.join(`channel-chat`)
        .here((users:  IUser[]) => {
          this.userList = users.filter((item:IUser)=> item.id !== user.id) ;
        })
        .joining((user:  any) => {
          this.userList.push(user)
        })
        .leaving((user:  any) => {
         this.userList = this.userList.filter((item: any) => item.id !== user.id);
        })
        .error((error:  any) => {
          console.error(error);
        });
  }

  verifyMessage(){
    return this.inputMessage.length > 0;
  }
//add commet
  sendMessage() {
    if (this.verifyMessage()) {
        const valueMessage = this.inputMessage;
        this.inputMessage = '';
        this.chatService.sendMessage(valueMessage,this.echo.socketId())
          .subscribe((resp: any) => {
            const now = new DatePipe('en-US').transform(new Date(), 'HH:mm');
            const message: IMessage = {
              message: valueMessage,
              me: true,
              from: 'me',
              sent_at: now ? now.toString() : ''
            }
            this.messages.push(message);
            this.scrollToBottom();
          });
    }
  }

  scrollToBottom() {
    const containerScroll: HTMLElement = window.document.getElementById('messages containerScroll')  as HTMLElement;
    const newTop = containerScroll.scrollHeight;
    scrollTo(containerScroll, {top: newTop, duration: 1000}).then((e) => console.log(e));
  }

  EnterPress(event: KeyboardEvent) {
    if (!event.shiftKey && (event.key === "Enter")){
      this.sendMessage();
    }
  }

}
