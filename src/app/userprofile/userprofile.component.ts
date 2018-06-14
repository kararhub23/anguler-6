import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {Router , ActivatedRoute} from '@angular/router';
import { AngularFireStorage , AngularFireStorageReference , AngularFireUploadTask} from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import * as firebase from 'firebase';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
 email: string ;
 myid: string ;
 itemList: AngularFireList<any>;
 ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
 itemarray = [];
 data = {
  name : '',
  age : '',
  phone : '',
  address : '',
  city: '',
  job: '',
  email : '',
  image : ''
}
  userkey: any;
  imageURL: string;
  downloadURL: Observable<string>;

  constructor(private afStorage: AngularFireStorage , public db: AngularFireDatabase , public router: Router
     ) {
      this.itemList = db.list('users')

    this.email = localStorage.getItem('email')
    this.myid = localStorage.getItem('uid')

    this.itemList.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
       let y = action.payload.toJSON()
       y["$key"] = action.key
      // this.itemarray.push(y as listitemclass)
        // this.userkey
       if(action.payload.child('uid').val() == this.myid) {
         this.userkey = action.key ;
        this.itemarray.push( y as listitemclass )
         this.data.name   = this.itemarray[0]['name']
         this.data.age   = this.itemarray[0]['age']
         this.data.phone   = this.itemarray[0]['phone']
         this.data.address   = this.itemarray[0]['address']
         this.data.city  = this.itemarray[0]['city']
         this.data.job  = this.itemarray[0]['job']
         this.data.email  = this.itemarray[0]['email']
         this.data.image = this.itemarray[0]['image']
         console.log("userkey " + this.userkey)

         }
      })
    })
   }
    //
   //
   upload(event) {
    const id = Math.random().toString(36).substring(2)
    this.ref = this.afStorage.ref(id)
    this.task = this.ref.put(event.target.files[0])
    this.downloadURL =  this.task.downloadURL();
    this.downloadURL.subscribe(url => {
      if (url) {
        console.log(url);
       this.imageURL = url ;
      }
      console.log(this.imageURL)

      this.itemList.set(this.userkey , {
        name : this.data.name  ,
        phone :  this.data.phone ,
        age : this.data.age ,
        address :  this.data.address ,
        city :  this.data.city ,
        job :  this.data.job ,
        email: this.data.email ,
        uid: this.myid ,
        image: this.imageURL
      })
    })

  }
  //
   oneedite() {
    this.itemList.set(this.userkey , {
      name: this.data.name ,
      age: this.data.age,
      phone: this.data.phone ,
      address: this.data.address,
      city: this.data.city ,
      job: this.data.job ,
      email: this.data.email ,
      uid: this.myid
    })
 }
  ngOnInit() {
    console.log(this.email)
    console.log(this.myid)
  }
}
export class listitemclass {
  $key: string;
  name: string;
  age: string;
  phone: string;
  address: string;
  city: string;
  job: string;
  email: string;
  uid: string;
  image: string;
}
