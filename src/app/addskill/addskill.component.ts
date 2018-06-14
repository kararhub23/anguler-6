import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { auth } from 'firebase';

@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.component.html',
  styleUrls: ['./addskill.component.css']
})
export class AddskillComponent implements OnInit {
 data = {
  name : '' ,
  phone : '' ,
  skill : '' ,
  provice : '',
  price: '',
  comments: '',
  }
  email: string = '';
  uid: any ;
 itemList: AngularFireList<any>

  constructor(public db: AngularFireDatabase , private fire: AngularFireAuth , public router: Router) {
    this.itemList = db.list('skills')
    let user = localStorage.getItem('email')
    this.email = user
    console.log(user)
    console.log('---------------------')
     //console.log(this.data.name)
     this.uid = localStorage.getItem('uid')
     console.log('uid : '+ this.uid)
     // 2 method to storige uid
     //this.fire.authState.subscribe(auth=>{
       //if(auth){
      //this.uid = auth.uid
      //console.log('uid :' + this.uid)
       //}
     //})
  }
  ngOnInit() {
  }
  insertskill() {
    this.itemList.push({
      name : this.data.name ,
      phone : this.data.phone,
      skill : this.data.skill ,
      provice : this.data.provice,
      price : this.data.price ,
      comments : this.data.comments,
      email : this.email ,
      uid : this.uid
    })
    this.router.navigate(['/myskill'])
  }
}
