import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/viewModels/feedback';
import { FeedbackService } from 'src/app/_apis/feedback.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback-app',
  templateUrl: './feedback-app.component.html',
  styleUrls: ['./feedback-app.component.css']
})
export class FeedbackAppComponent implements OnInit {

  constructor(private feedbackApis: FeedbackService) { }
  items: Feedback[] =[]
  uid = localStorage.getItem('uid')
  valeur =''
  avg : any= 0;
  ngOnInit(): void {
    this.feedbackApis.getAll()
      .subscribe((res: any) => {
        this.items = res

        // array of objects -> array of numbers
        let tab  = this.items.map((f)=>{return f.rating})
        let somme = tab.reduce((acc , current)=> acc + current)
        if(this.items.length > 0 ){

        this.avg = (somme / this.items.length).toFixed(2)
        console.log(this.avg)
        }
      })
  }

  /*   text = ''
    rating = 1
    _id= undefined */
  feedback: Feedback = new Feedback()

  nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  content = ''

  editMode = false
  add() {
    /* ! null  ! undefined !false ! 0  */
    if (this.editMode) {

      let index = this.items.findIndex((i) => i._id == this.feedback._id)

      this.feedbackApis.update(this.feedback, this.feedback._id + '')
        .subscribe(() => {

          this.items[index] = this.feedback
          this.feedback = new Feedback()
          this.editMode = false
        })


    } else {
      /* if( this.text && this.text.length >3){
        this.items.unshift({text : this.text , rating : this.rating , _id : 4})
        this.text = ''
      } */
      if (this.feedback.text && this.feedback.text.length > 3) {
        //this.feedback._id = 4
        this.feedback.user_id = localStorage.getItem('uid') + ''
        this.feedbackApis.create(this.feedback)
          .subscribe((res: any) => {
            this.items.unshift(res)
            this.feedback = new Feedback()
          })

      }
    }

  }
  delete(i: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        let id = this.items[i]._id;
        this.feedbackApis.remove(id+'')
        .subscribe(()=>{

          this.items.splice(i, 1)
        })

      }
    })

  }

  edit(feedback: any) {
    console.log(feedback)
    /* this.text = feedback.text
    this.rating = feedback.rating
    this._id = feedback._id */
    this.feedback = feedback
    this.editMode = true
  }

}
