import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(public auth: AuthenticationService, public http: HttpClient) {}
  myControlPlain = new FormControl();
  myControlAuto = new FormControl();

  options: string[] = ['One', 'Two', 'Three'];

  filteredOptions: Observable<string[]>;

  ngOnInit(){
    let obs = this.http.get('https://reqres.in/api/users?page=2')
    obs.subscribe((response) => console.log(response));

    this.filteredOptions = this.myControlAuto.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(value);

    let ret = this.options.filter(option => option.toLowerCase().includes(filterValue));
    console.log(ret);
    return ret;
  }
}
