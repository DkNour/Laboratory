import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../models/membre';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
form: any;
currentId: any;
item1: any;

initform(item : any): void{
  this.form = new FormGroup({
    cin: new FormControl(item?.cin,[Validators.required]),
    name: new FormControl(item?.name,[Validators.required]),
    type: new FormControl(item?.type,[Validators.required]),
    cv: new FormControl(item?.cv,[])    
  })
}

  OnSubmit():void{
      console.log(this.form.value);
      const objectToSubmit :Member = {...this.item1,...this.form.value};
      console.log(this.item1);
      this.memberService.saveMember(objectToSubmit).then(()=> {this.router.navigate(['./members'])});
  }

  constructor(private memberService : MemberService, private router : Router, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.currentId=this.activatedRoute.snapshot.params.id;
    if (!!this.currentId){
      this.memberService.getMemberById(this.currentId).then((item) => {this.item1=item ; this.initform(this.item1);})}
    else{this.initform(null)}
  }

}
