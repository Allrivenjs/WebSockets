import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { UserListComponent } from './components/user-list/user-list.component';
import { ChatBodyComponent } from './components/chat-body/chat-body.component';





@NgModule({
  declarations: [
    LoginComponent,
    UserListComponent,
    ChatBodyComponent,
  ],
  exports: [
    UserListComponent,
    ChatBodyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class PageModule { }
