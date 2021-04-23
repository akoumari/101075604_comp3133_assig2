import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from "./auth.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'frontend';
  isLoggedIn: boolean;
  showReg: boolean;
  loc: string;
  user: string
  constructor(private authService: AuthService,  private route: ActivatedRoute) {
    this.authService.isAuthenticated.subscribe(value => {
      this.isLoggedIn = value;
    });
    this.user = JSON.parse(localStorage.getItem("user"))
    console.log(this.user)
  }
  ngOnInit() {
    this.showReg = false
    
  }
  setShowReg(howYouWantIt: boolean){
    console.log(howYouWantIt)
    this.showReg = howYouWantIt
  }
  signout() {
    console.log("ummmm")
    this.authService.signout();
  }
}
