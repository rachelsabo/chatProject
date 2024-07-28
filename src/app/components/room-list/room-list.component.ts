import { Component, Input, input } from '@angular/core';
import { IChatRoom } from '../../models';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent {

  @Input() rooms:Array<IChatRoom> = [];

  constructor() {}


}
