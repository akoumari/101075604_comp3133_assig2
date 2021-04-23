import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HotelsDocument, HotelsGQL, AddBookingDocument  } from '../../graphql/generated/graphql'
import { matchSorter } from "match-sorter";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment'

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchText:string
  filterBySearchText (){
    if(this.allhotels == null){
      this.allhotels = this.hotels
    console.log(this.allhotels)
    }
    this.hotels = [...matchSorter(this.allhotels, this.searchText, { keys: ["hotel_name", "city"] })]
  
  }
  public hotels: any;
  public allhotels: any;
  public loading: boolean;
  public selectedHotel: any;
  page: number
  pageSize: number
  closeResult = '';
collectionSize: number
  public booking_start: string
  public booking_end: string
  private querySubscription: Subscription;
  constructor(private apollo: Apollo, private modalService: NgbModal, private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.searchText = ""
    this.page =1
    this.pageSize =6
    this.querySubscription  = this.apollo.watchQuery<any>({
      query:HotelsDocument}).valueChanges.subscribe(({data, loading})=>{
        this.loading = loading;
        this.hotels = data.hotels
        this.collectionSize = data.hotels.length
      })
    console.log(this.hotels)
    

  }
  open(content, hotel) {
 

this.selectedHotel = hotel
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered:true,}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
onSubmit(){
if(moment(this.booking_end).isBefore(moment(this.booking_start))){
  this.toastr.error( 'You can\'t leave before you arrive silly!','WHOOPS',  {positionClass: "toast-top-center"});
return
}else if (moment(this.booking_end).isBefore(moment())){
  
  this.toastr.error( 'You can\'t book for the past silly!','WHOOPS',  {positionClass: "toast-top-center"});
return
}else if (moment(this.booking_start).isBefore(moment())){
  this.toastr.error( 'You can\'t book for the past silly!','WHOOPS',  {positionClass: "toast-top-center"});
return

}
  this.apollo
  .mutate({
    mutation: AddBookingDocument,
    variables: { 
      hotel: this.selectedHotel.id,
      booking_start: moment(this.booking_start).toISOString(),
      booking_end:moment(this.booking_end).toISOString(),
user: JSON.parse( localStorage.getItem("user")).userId
    },
    
  })
  .subscribe(
    (data) => {
     
      this.toastr.success( 'Task finally failed successfully ','Eyyyyyyy',  {positionClass: "toast-top-center"});
      this.modalService.dismissAll()
      
    },
    error => {
      console.log("there was an error sending the query", error);
      this.toastr.error( 'That login isn\'t right...','WHOOPS',  {positionClass: "toast-top-center"});
    }
);
}

handleSearch(){

 
    // console.log("not ducks?")
    // this.searchText = ""
    this.filterBySearchText()
  
}
}
