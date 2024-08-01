import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { IMessage } from '../../models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent  implements OnInit{
  @Input()
  messages: Array<IMessage> = [];

  @Output()
  onSendMessage:EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    console.log(this.messages)
  }

  public sendMessage(message:string) :void
  {
    console.log(message);
    this.onSendMessage.emit(message);
  }
}
