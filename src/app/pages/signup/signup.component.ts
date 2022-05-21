import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_apis/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor(private router: Router,
    private authApi: AuthService,
    private translate: TranslateService,
    private toastr: ToastrService) { }

  signupform: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'cin': new FormControl('', [Validators.required, Validators.min(1000000), Validators.max(99999999)]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required),
    "confirm_password": new FormControl('', Validators.required)

  })
  ngOnInit(): void {
  }

  save() {
    if (this.signupform.valid) {
      if (this.signupform.get('password')?.value
        == this.signupform.get('confirm_password')?.value) {
        console.log(this.signupform.get('password')?.value)
        console.log(this.signupform.value)

        this.authApi.register(this.signupform.value)
          .subscribe((res) => {
            console.log(res)

            localStorage.setItem('email', this.signupform.get('email')?.value)
            this.toastr.success('', 'Success !')
            this.router.navigate(['/feedback'])
          })



      } else {
        console.log("password error")
        this.toastr.error(this.translate.instant('wrong_password'), 'Error')
      }
    }
  }


  signin(){
    if(this.signupform.get('email')?.value && this.signupform.get('password')?.value){
      let body = {
        email : this.signupform.get('email')?.value,
        password : this.signupform.get('password')?.value
      }
      this.authApi.login(body)
      .subscribe((res : any)=>{
          console.log(res)
          localStorage.setItem('uid' , res._id)
          this.router.navigate(['/feedback'])
      },(err)=>{
        console.log(err)
        this.toastr.error(err.status , err.statusText)
      })
    }
  }

}
