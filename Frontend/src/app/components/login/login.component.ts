import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ps: LoginService, private toastr: ToastrService, private router:Router, private formbulder:FormBuilder) { }

  
  ngOnInit(): void {
    

  }
  loginForm = this.formbulder.group({
    email: ["", [Validators.required, Validators.email]],
    password:["", [Validators.required,Validators.minLength(6)]],
    remember: [""]
  });

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }

  login(){
  
    var data=this.loginForm.value;
<<<<<<< HEAD
    this.ps.login(data).subscribe((res) => {
      console.log(res)
      if (res == null){
        this.router.navigate(['/register']);
        return this.toastr.error("somthing went wrong");
      }
     var myobject:any={
       token:"",user:{}
     };
     myobject=res;
     if (myobject){
        localStorage.setItem("auth-token",myobject.token); 
        this.showSuccess();  
        return this.router.navigate(['/home']);
      }
      return this.toastr.error("somthing went wrong");
    }, err => {
    console.log(err.error.message)
      this.toastr.error(err.error.message);
    });
=======
    this.ps.login(data).subscribe(
    {
        next: res => {
              if (res == null){
                this.router.navigate(['/register']);
                return this.toastr.error("somthing went wrong");
              }
              var myobject:any={
                token:"",user:{}
              };
              myobject=res;
              if (myobject){
                  localStorage.setItem("auth-token",myobject.token); 
                  this.showSuccess();  
                  return this.router.navigate(['/home']);
                }
                return this.toastr.error("somthing went wrong");
        },
        error: err => {
        
            this.toastr.error(err.error.message, err.error.status);
        }
    })
>>>>>>> 74d2a3568a0939d25abf5ac21dc378b4ef1102a5
  }
  error(msg:any){
    this.toastr.error(msg.message,msg.status);
  }
  showSuccess() {
    this.toastr.success('successful login');
  }
}
