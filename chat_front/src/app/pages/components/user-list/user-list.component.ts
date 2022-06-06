import {Component, Input, OnInit} from '@angular/core';
import {IUser} from "../../../insterfaces/chat";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() userList: IUser[] = [];
  User: IUser;
  constructor() {
    this.User = JSON.parse(localStorage.getItem('user')??'');
  }

  ngOnInit(): void { }

}
