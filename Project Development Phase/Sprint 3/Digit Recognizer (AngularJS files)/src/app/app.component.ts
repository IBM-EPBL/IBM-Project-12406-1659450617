import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private dialog:MatDialog){}

  openDialog(){
    this.dialog.open(AboutDialog);
  }

  title = 'Digit_Recognizer';
}

@Component({
  selector: 'about-dialog',
  templateUrl:'./about-dialog.html'
})
export class AboutDialog{}
