import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from '../app-config';
import { Member } from '../models/membre';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  tab:Member[]=GLOBAL._DB.members;
  constructor(private httpClient : HttpClient) {}
  saveMember(member:Member): Promise<Member>{
    const memberToSave={...member};
    memberToSave.id=member.id??Math.ceil(Math.random()*1000).toString()
    memberToSave.createdDate =member.createdDate?? new Date().toDateString()
    this.tab= [memberToSave, ...this.tab.filter(item=> item.id!==member.id)];
    return new Promise(resolve=> resolve(memberToSave));
  }
  getMemberById(id : string): Promise<Member>{
    //return this.httpClient.get<Member>('linkToRestAPI',id).toPromise();
    return new Promise(resolve=> resolve(this.tab.filter( item => item.id==id) [0]?? null));
  }

}