import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;
  private isLoggedin: Boolean = false;
  private email: string;

  constructor(public afAuth: AngularFireAuth , public router: Router) {
   let status = localStorage.getItem('isLoggedIn')
   // console.log(status)
    if (status === 'true') {
      this.isLoggedin = true ;
     }else{
        this.isLoggedin = false ;
      }
   }
  ngOnInit() {
  }
  logout() {
    this.afAuth.auth.signOut();
    this.isLoggedin = false ;
     localStorage.setItem('isLoggedIn','false')
     localStorage.setItem('email', '' )
    localStorage.setItem('uid','' )
     this.router.navigate(['/login'])
  }
}
