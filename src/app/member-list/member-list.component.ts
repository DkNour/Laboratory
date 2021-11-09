import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GLOBAL } from '../app-config';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Member } from '../models/membre';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'cin', 'name', 'createdDate', 'type', 'cv', 'action'];
  
  dataSource:Member[]

  constructor(private MS:MemberService, private dialog:MatDialog) {
    this.dataSource = MS.tab;
  }

  ngOnInit(): void {}

  getAllData(): void{
    this.MS.getAllMembers().then((data) => this.dataSource = data)
  }

  delete(item : any){

    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
        //propriéte dialog
      }
      );
      dialogRef.afterClosed().pipe().subscribe(isDeleteConfirmed => {
        if  (isDeleteConfirmed){
          console.log(item);
          //this.MS.deleteMember(item).then(() => this.dataSource = this.MS.tab);
          this.MS.deleteMember(item).then(() => this.getAllData());
        }
      });
  }

}
