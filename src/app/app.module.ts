import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AddskillComponent } from './addskill/addskill.component';
import {RouterModule , Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyskillComponent } from './myskill/myskill.component';
import { AllskillComponent } from './allskill/allskill.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DetailsComponent } from './details/details.component';
import { UserprofileComponent } from './userprofile/userprofile.component';



const routes: Routes = [
  {path: '' , redirectTo: 'home' , pathMatch: 'full'},
  {path: 'home' , component: HomeComponent},
  {path: 'addskill' , component: AddskillComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'register' , component: RegisterComponent},
  {path: 'myskill' , component: MyskillComponent},
  {path: 'allskill' , component: AllskillComponent},
  {path: 'details/:id' , component: DetailsComponent},
  {path: 'userprofile' , component: UserprofileComponent},
  ]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AddskillComponent,
    LoginComponent,
    RegisterComponent,
    MyskillComponent,
    AllskillComponent,
    DetailsComponent,
    UserprofileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
