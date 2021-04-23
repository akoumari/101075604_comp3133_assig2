import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes,  ActivatedRoute, ParamMap  } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BookingsComponent } from './bookings/bookings.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthService } from "./auth.service";


const routes: Routes = [
  
    { path: 'home', component: HomeComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'login', component: LoginComponent },
    { path: 'bookings', component: BookingsComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
    { path: '**', component: HomeComponent },  // Wildcard route for a 404 page
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule implements OnInit  {
  isLoggedIn: boolean;
  loc:string
  constructor(private authService: AuthService,  private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      this.loc = params['name'];
    });
      this.authService.isAuthenticated.subscribe(value => {
        this.isLoggedIn = value;
      });
    }


    ngOnInit() {
    }
 }
