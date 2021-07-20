import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent implements OnInit {
  title: string;
  text: string;
  type: string;
  lines: string[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogComponent>) {
    this.title = data.title;
    this.text = data.text;
    this.type = data.type;
  }

  ngOnInit(): void {
    this.lines = this.parseTextInLines(this.text);
  }

  public handleUserAction(event: any, userReponse: boolean): void {
    event.preventDefault();
    this.dialogRef.close(userReponse);
  }

  private parseTextInLines(text: string): string[] {
    return text.split(`.`);
  }
}
