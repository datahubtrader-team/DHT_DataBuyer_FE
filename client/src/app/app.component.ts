import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(public auth: AuthenticationService, public http: HttpClient) {}

  ngOnInit(){
    let obs = this.http.get('https://reqres.in/api/users?page=2')
    obs.subscribe((response) => console.log(response));
  }
}
