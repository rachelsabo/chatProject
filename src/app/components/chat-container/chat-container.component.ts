import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { filter, Observable, Subscription } from 'rxjs';
import { IChatRoom, IMessage } from '../../models';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.css'
})
export class ChatContainerComponent implements OnInit,OnDestroy{

  private subscription: Subscription = new Subscription();

  public rooms$: Observable <Array<IChatRoom>>;
  public messages$: Observable <Array<IMessage>> ;

  constructor(private chatService: ChatService, private router: Router, private activatedRoute: ActivatedRoute){
    this.rooms$ = this.chatService.getRooms();

    const roomId : string = activatedRoute.snapshot.url[1].path;

    this.messages$ = this.chatService.getRoomMessages(roomId);

    this.subscription.add(
      router.events
      .pipe(filter((data)=>data instanceof NavigationEnd))
      .subscribe((data)=>{
        const routeEvent: RouterEvent = data as RouterEvent;
        const urlArr = routeEvent.url.split('/');
        if(urlArr.length > 2)
        {
          this.messages$ = this.chatService.getRoomMessages(urlArr[2]);
        }
      })
    )
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
