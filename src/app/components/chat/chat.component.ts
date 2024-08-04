import { Component, EventEmitter, Input, OnInit, Output, output, ViewChild, viewChild } from '@angular/core';
import { IMessage } from '../../models';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent  implements OnInit{

  @ViewChild('virtualScroll') virtualScroll?:CdkVirtualScrollViewport;

  @Output()
  onSendMessage:EventEmitter<string> = new EventEmitter();

  @Input() set messages(messages:Array<IMessage>)
  {
    this._messages = messages.sort((x,y)=>
    {return x.timestamp - y.timestamp;   });
    this.virtualScroll?.scrollToIndex(this._messages.length - 1);
  }

  private _messages: Array<IMessage> = [];

  get messages()
  {
    return this._messages;
  }

  ngOnInit(): void {
  }

  public sendMessage(message:string, input:HTMLInputElement) :void
  {
    this.onSendMessage.emit(message);
    input.value = '';
  }
}
