import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { OffersacceptedComponent } from './offersaccepted/offersaccepted.component';
import { TradesComponent } from './trades/trades.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';


import {MatSnackBarModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatInputModule, MatAutocompleteModule } from '@angular/material';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'trades', component: TradesComponent, canActivate: [AuthGuardService] },
  { path: 'offersaccepted', component: OffersacceptedComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    TradesComponent,
    OffersacceptedComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatSnackBarModule,
    MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatInputModule, MatAutocompleteModule
  ],
  providers: [
    AuthenticationService, 
    AuthGuardService
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
