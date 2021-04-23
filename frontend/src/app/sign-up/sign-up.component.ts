import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { AddUserDocument  } from '../../graphql/generated/graphql'
import { AuthService } from "../auth.service";

import { ToastrService } from 'ngx-toastr';
interface Ivalid{
  email:boolean 
  username:boolean 
  firstname:boolean 
  lastname:boolean 
  password:boolean
  confPassword:boolean
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  email:string 
  username:string 
  firstname:string 
  lastname:string 
  password:string
  confPassword:string
  valid:Ivalid

  constructor(private apollo: Apollo, private authService: AuthService, private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.valid = {email:true, 
      username:true, 
      firstname:true, 
      lastname:true, 
      password:true,
      confPassword:true}
  }
  login(){
    this.apollo.mutate({
      mutation: AddUserDocument,
      variables: {
        email: this.email,
        password: this.password
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  } 
  checkValid() {
    
    this.valid.password=this.password&&this.password==this.confPassword
    this.valid.confPassword=this.confPassword&&this.password==this.confPassword
  }
  onSubmit() {
this.checkValid()
if(this.valid.password&&this.valid.confPassword){

  this.apollo
    .mutate({
      mutation: AddUserDocument,
      variables: { 
        email: this.email,
        username: this.username,
        firstname:this.firstname,
        lastname:this.lastname,
        password:this.password 
      },
      
    })
    .subscribe(
      (data) => {
       
        this.authService.signin(this.email, this.password);
        
      },
      error => {
        console.log("there was an error sending the query", error);
        this.toastr.error( 'That login isn\'t right...','WHOOPS',  {positionClass: "toast-top-center"});
      }
);
}
  }
}
