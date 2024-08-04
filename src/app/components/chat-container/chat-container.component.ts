import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { filter, Observable, Subscription } from 'rxjs';
import { IChatRoom, IMessage } from '../../models';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddRoomComponent } from '../add-room/add-room.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.css'
})
export class ChatContainerComponent implements OnInit,OnDestroy{

  private subscription: Subscription = new Subscription();
  private userId :string = '';
  private roomId? :string;

  public rooms$: Observable <Array<IChatRoom>>;
  public messages$?: Observable <Array<IMessage>> ;

  constructor(private chatService: ChatService, 
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private authService:AuthService){

    this.rooms$ = this.chatService.getRooms();

    if(activatedRoute.snapshot.url.length>1)
    {
      this.roomId = activatedRoute.snapshot.url[1].path;
      this.messages$ = this.chatService.getRoomMessages(this.roomId);
    }
    
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

  public openAddRoomModal():void
  {
    
      const dialogRef = this.dialog.open(AddRoomComponent, {width:'250px'});
 
      dialogRef.afterClosed().subscribe(result => {
        this.onAddRoom(result,this.userId);}); 
         
  }

  public onAddRoom(roomName: string, userId:string):void
  {
    this.chatService.addRoom(roomName, userId);
  }


  public onSendMessage(message:string) :void
  {
    if(this.roomId && this.userId)
      this.chatService.sendMessage(this.userId,message,this.roomId)
  }

  ngOnInit(): void {
    this.subscription.add(
      this.authService.getUserData().pipe(filter(data=>!!data)).subscribe(user=>
      {
        this.userId = user.uid;
      }))

    this.subscription.add(
      this.router.events.pipe(filter((routerEvent)=> routerEvent instanceof ActivationEnd))
      .subscribe((data)=>{
        const routeEvent = data as ActivationEnd;
        this.roomId = routeEvent.snapshot.paramMap.get('roomId') || '';
        console.log(this.roomId)
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
