import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

@Component({
  templateUrl: './trades.component.html'
  // styleUrls: [ './profile.component.css' ],
})
export class TradesComponent {
  details: UserDetails;

  page: string = "";
  response: any;
  dd: any;

  //Payload to the Data consumer service
  searchInput: string = "";
  participant_min: string = "";
  participant_max: string = "";
  activity: string = "";
  deadline: string = "";
  buyerId: string = "";

  email: string = "";
  //Output message
  name = 'Angular 4';
  
  message: string = 'Submitted a search request.';
  actionButtonLabel: string = '';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  addExtraClass: boolean = false;

  //===================================================================

  constructor(private auth: AuthenticationService, private http: HttpClient, public snackBar: MatSnackBar) {}
  
  ngOnInit() {    
    this.auth.profile().subscribe(user => {
      this.details = user;
      console.log(user._id);
      console.log(this.details._id);
      console.log(this.details.email);
      this.awsurl(this.details.email);
      this.dd = user;
      this.email = this.details.email;
    }, (err) => {
      console.error(err);
    });
    
    //console.log("********************* " +  this.dd);

    //=== List all aws links ===================
    // this.http.get('/getawsurls?email=buyer')
    // .subscribe((response) => {
    // this.response = response;
    // console.log(this.response);
    // //console.log("*********************" +  this.details._id);
    // });
    
  }

  search(){
    // this.http.get('https://reqres.in/api/users?page=3')
    // .subscribe((response) => {
    //   this.response = response;
    //   console.log(this.response);
    // });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    this.http.post('/hat',{
      "username":"jhamm",
      "password":"Dillonjerome28",
      "message":"login"
    },{headers: {
      //'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Credentials':'true',
      'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, X-Auth-Token, Authorization',
      "Vary":"Accept-Encoding, Origin"
    }}
      )
      .subscribe((response) => {
      this.response = response;
      console.log(this.response);
      console.log("Julian Hamm ",this.dd);
    });
    
  }

  awsurl(email){
    this.http.get('/getawsurls?email=' + email)
    .subscribe((response) => {
    this.response = response;
    console.log(this.response);
    console.log("********************* " +  email);
    });
  }

  searchReq(){
    this.http.get('/allsearchrequests')
    .subscribe((response) => {
    this.response = response;
    console.log(this.response);
    });
  }

  Inputsearch(buyerId){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('/search-requests',{
      "search": this.searchInput,
      "participant_min": this.participant_min,
      "participant_max": this.participant_max,
      "activity": this.activity,
      "deadline": this.deadline,
      "buyerId": buyerId,
      "message":"search"
    },{headers: {
      //'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Credentials':'true',
      'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, X-Auth-Token, Authorization',
      "Vary":"Accept-Encoding, Origin"
    }}).subscribe((response) => {
      this.response = response;
      console.log(this.response);
      //console.log("Julian Hamm ",this.dd);
    });

    //Output message
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    config.extraClasses = this.addExtraClass ? ['test'] : undefined;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);

  }

  refresh(): void {
    window.location.reload();
  }
}
