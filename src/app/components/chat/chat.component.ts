import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { IMessage } from '../../models';
import { useAnimation } from '@angular/animations';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  public userId: string = '';
  @ViewChild(CdkVirtualScrollViewport) viewPort?: CdkVirtualScrollViewport;

  @Output() onSendMessage: EventEmitter<string> = new EventEmitter();

  @Input() set messages(messages: Array<IMessage>) {
    this._messages = messages.sort((x, y) => {
      return x.timestamp - y.timestamp;
    });
    if (this.viewPort) {
      this.viewPort.scrollToIndex(
        this.messages.length * this.messages.length,
        'smooth'
      );
    }
  }

  get messages(): Array<IMessage> {
    return this._messages;
  }
  private _messages: Array<IMessage> = [];

  constructor(private authService:AuthService ) {
    this.userId = authService.getUserId();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.viewPort) {
      this.viewPort.scrollToIndex(this.messages.length * 10, 'smooth');
    }
  }

  public sendMessage(value: string, input:HTMLInputElement) {
    this.onSendMessage.emit(value);
    input.value = '';
  }
}