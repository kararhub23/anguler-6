import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
 id: any

 itemList: AngularFireList<any>
 itemarray = []

 data = {
   name : '' ,
   phone : '' ,
   skill : '' ,
   provice : '',
   price: '',
   comments: '',
   email: ''
  }
  constructor( private route: ActivatedRoute , public db: AngularFireDatabase) {
    this.route.params.subscribe( params =>{
      this.id = params
      } );
      this.itemList = db.list('skills')

    this.itemList.snapshotChanges().subscribe(actions=>{
      actions.forEach(action=>{
       let y = action.payload.toJSON()
       y['$key'] = action.key

      // console.log(action.key)

       if(action.key == this.id['id']){
        this.itemarray.push( y as listitemclass)

       this.data.name   = this.itemarray[0]['name']
       this.data.phone   = this.itemarray[0]['phone']
       this.data.price   = this.itemarray[0]['price']
       this.data.provice   = this.itemarray[0]['provice']
       this.data.skill  = this.itemarray[0]['skill']
       this.data.comments  = this.itemarray[0]['comments']
       this.data.email  = this.itemarray[0]['email']

        console.log(this.itemarray[0]['name'])
       }
       // console.log(this.itemarray)
      })

    })

    console.log(this.itemarray)
   }


  ngOnInit() {
    console.log(this.id['id'])
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
  email: string;

}
