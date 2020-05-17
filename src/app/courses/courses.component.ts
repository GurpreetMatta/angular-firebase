import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {
  // todos$: AngularFireList<any>;
  courses$;
  courses: any[];
  course;
  subscription: Subscription;
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.courses$= this.db.list('/courses');
    this.subscription =
      this.db.list('/courses').valueChanges().subscribe(result => {
        console.log('user ' + result);
        this.courses = result;
      });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  onEnter(id){
       this.db.object('/courses/'+id.value).valueChanges().subscribe(r => {
         this.course=r;
         id='';
        });
  }

  onEnterTitle(titles :HTMLInputElement){
    console.log(titles.value);
    
    this.courses$.push({
      title :titles.value
    })
    titles.value=''
   }

   update(course1){
     this.db.object('/courses/'+course1.$key).set("updated");
   }
   delete(course1){
    this.db.object('/courses/'+course1.$key).remove().then(object => console.log("DELETED")
    )
   }
}
