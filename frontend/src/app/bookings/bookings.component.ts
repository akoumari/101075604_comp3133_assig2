import { Component, OnInit } from '@angular/core';
import { BookingsByUserDocument  } from '../../graphql/generated/graphql'
import { Apollo, gql } from 'apollo-angular';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {


  public bookings: any;
  public loading: boolean;
  page: number
  pageSize: number
  collectionSize: number
  private querySubscription: Subscription;

  constructor(private apollo: Apollo ) { }

  ngOnInit(): void {

    this.page =1
    this.pageSize =6
    this.querySubscription  = this.apollo.watchQuery<any>({
      query:BookingsByUserDocument,
      variables:{
        user: JSON.parse( localStorage.getItem("user")).userId
      }
    
    }).valueChanges.subscribe(({data, loading})=>{
      console.log(data)
        this.loading = loading;
        this.bookings = data.bookingsByUser
        this.collectionSize = data.bookingsByUser.length
      })
    console.log(this.bookings)
    

  }

}
