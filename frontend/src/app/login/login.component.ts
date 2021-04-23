import { Component, Input, OnInit } from '@angular/core';
import { LoginDocument  } from '../../graphql/generated/graphql'
import { AuthService } from "../auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
@Input() setShowReg
  email: string;
  password: string;
  constructor(private authService: AuthService) {}

  onSubmit() {
    console.log(this.email)
    console.log(this.password)
    this.authService.signin(this.email, this.password);
  }

  ngOnInit(): void {

  }

}
