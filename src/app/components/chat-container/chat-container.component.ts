import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { IChatRoom } from '../../models';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.css'
})
export class ChatContainerComponent {

  public rooms$: Observable <Array<IChatRoom>>;

  constructor(private chatService: ChatService){
    this.rooms$ = this.chatService.getRooms();
  }
}
