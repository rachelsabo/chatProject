import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { IMessage } from '../../models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent  implements OnInit{

  @Output()
  onSendMessage:EventEmitter<string> = new EventEmitter();

  @Input() set messages(messages:Array<IMessage>)
  {
    this._messages = messages.sort((x,y)=>
    {return x.timestamp - y.timestamp;   
    })
  }

  private _messages: Array<IMessage> = [];

  get messages()
  {
    return this._messages;
  }

  ngOnInit(): void {
    console.log(this.messages)
  }

  public sendMessage(message:string, input:HTMLInputElement) :void
  {
    this.onSendMessage.emit(message);
    input.value = '';
  }
}
