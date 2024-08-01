import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent {

  constructor(public dialogRef: MatDialogRef<AddRoomComponent>)
  {
    
  }

  public closeModal():void{
    this.dialogRef.close();
  }
}
