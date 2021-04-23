import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { LoginResponse } from 'src/graphql/generated/graphql';
import jwt_decode from "jwt-decode";

import { ToastrService } from 'ngx-toastr';
const login = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;
    interface IResponse{
   data:{ login:{
        token:string
      }}
    }
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private apollo: Apollo,private toastr: ToastrService) {
    if (localStorage.getItem("token")) this.isAuthenticated.next(true);
    else this.isAuthenticated.next(false);
  }

  signin(email: string, password: string) {
    this.apollo
      .mutate({
        mutation: login,
        variables: { email, password },
        
      })
      .subscribe(
        (res:IResponse|null) => {
          console.log(res)
          
          localStorage.setItem("token", res.data.login.token);

          console.log(jwt_decode(res.data.login.token))
          localStorage.setItem("user", JSON.stringify(jwt_decode(res.data.login.token)));
          this.isAuthenticated.next(true);
          window.location.href = "/";
        },
        error => {
          console.log("there was an error sending the query", error);
          this.toastr.error( 'That login isn\'t right...','WHOOPS',  {positionClass: "toast-top-center"});
        }
  );
  }
  signout() {
    console.log("ummmmm")
    localStorage.removeItem("token");
    this.isAuthenticated.next(false);
    window.location.href = "/";
  }
}
