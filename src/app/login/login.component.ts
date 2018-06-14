import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password : string = '';
  uid : any
  constructor( private fire: AngularFireAuth , private router: Router) { }

  ngOnInit() {
  }
  login(){
    this.fire.auth.signInWithEmailAndPassword(this.email ,this.password).then(user =>{
      console.log(this.email, this.password )
      localStorage.setItem('isLoggedIn','true')
      localStorage.setItem('email', this.fire.auth.currentUser.email)

      this.fire.authState.subscribe(auth=>{
        if(auth){
       this.uid = auth.uid
       localStorage.setItem('uid', auth.uid)
        }
      })


      this.router.navigate(['home'])
    }).catch(error=>{
      console.error(error)
    })
  }
}
