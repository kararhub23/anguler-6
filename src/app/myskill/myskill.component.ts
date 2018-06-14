import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
@Component({
  selector: 'app-myskill',
  templateUrl: './myskill.component.html',
  styleUrls: ['./myskill.component.css']
})
export class MyskillComponent implements OnInit {
  itemList: AngularFireList<any>
  itemarray = []
  data = {
    name : '' ,
    phone : '' ,
    skill : '' ,
    provice : '',
    price: '',
    comments: ''
   }

   myuid: any
  constructor(public db: AngularFireDatabase , public router: Router) {
    this.itemList = db.list('skills')

    this.itemList.snapshotChanges().
    subscribe(actions=>{
      actions.forEach(action=>{
       let y = action.payload.toJSON()
       y["$key"] = action.key
       this.itemarray.push( y as listitemclass)
       // console.log(this.itemarray)
      })

    })
  this.myuid = localStorage.getItem('uid')

    console.log(this.itemarray)

   }

  ngOnInit() {
  }

  onedite($key){
    this.data.name
    this.data.phone
    this.data.skill
    this.data.provice
    this.data.price
    this.data.comments

    this.itemList.set($key , {
      name : this.data.name ,
      phone : this.data.phone,
      skill : this.data.skill ,
      provice : this.data.provice,
      price : this.data.price ,
      comments : this.data.comments
       })
      this.itemarray = []
   }

  delete($key){
  this.itemList.remove($key);
  this.itemarray = []
  }
  editform($key){
    for(let value of this.itemarray) {
      if(value["$key"] == $key) {
        console.log(value["$key"])
        this.data.name = value['name'];
        this.data.phone = value['phone'];
        this.data.skill = value['skill'];
        this.data.provice = value['provice'];
        this.data.price = value['price'];
        this.data.comments = value['comments'];

      }
    }

  }
}
export class listitemclass{
  $key: string;
  name: string;
  phone: string;
  skill: string;
  provice: string;
  price: string;
  comments: string;
}



