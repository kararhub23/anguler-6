import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Router , ActivatedRoute} from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-allskill',
  templateUrl: './allskill.component.html',
  styleUrls: ['./allskill.component.css']
})
export class AllskillComponent implements OnInit {
  itemList: AngularFireList<any>
  itemarray = []

  data = {
    name : '' ,
    phone : '' ,
    skill : '' ,
    provice : '',
    price: '',
    comments: '',
   }

  constructor(public db: AngularFireDatabase , public router: Router , public route: ActivatedRoute) {

    this.itemList = db.list('skills')

    this.itemList.snapshotChanges().subscribe(actions=>{
      actions.forEach(action=>{
       let y = action.payload.toJSON()
       y['$key']=action.key
       this.itemarray.push( y as listitemclass)
       // console.log(this.itemarray)
      })

    })

    console.log(this.itemarray)
   }

  ngOnInit() {
  }
  morinfo($key){
   // console.log($key)
    this.router.navigate(['details/'+$key])
    }
  /*onedite( $key ){

          this.data.name
          this.data.phone
          this.data.skill
          this.data.provice
          this.data.price
          this.data.comments

          this.itemList.set($key ,{
            name : this.data.name ,
            phone : this.data.phone,
            skill : this.data.skill ,
            provice : this.data.provice,
            price : this.data.price ,
            comments : this.data.comments,
          })
            this.itemarray = []

          //this.router.navigate(['/myskill'])
         // console.log("name" + this.data.name)

      }*/

  /*delete($key){
  this.itemList.remove($key);
  this.itemarray = []
  }*/

  /*editform($key){
    for(let value of this.itemarray){
      if(value['$key'] == $key){
        console.log(value['$key'])
        this.data.name =value['name'];
        this.data.phone =value['phone'];
        this.data.skill =value['skill'];
        this.data.provice =value['provice'];
        this.data.price =value['price'];
        this.data.comments =value['comments'];

      }
    }

  }*/
}
export class listitemclass{
  $key:string;
  name :string;
  phone :string;
  skill :string;
  provice :string;
  price :string;
  comments:string;
}




