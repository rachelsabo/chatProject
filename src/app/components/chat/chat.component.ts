import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from '../../models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent  implements OnInit{
  @Input()
  messages: Array<IMessage> = [];

  ngOnInit(): void {
    console.log(this.messages)
  }
}
