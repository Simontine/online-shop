import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private ps: RegisterService,private toastr: ToastrService, private router:Router, private formbulder:FormBuilder) { }

  ngOnInit(): void {
  }
  registerForm = this.formbulder.group({
    email: ["", [Validators.required, Validators.email]],
    password:["", [Validators.required,Validators.minLength(6)]],
    name:["", [Validators.required,Validators.minLength(2)]],
    lastName:["", [Validators.required, Validators.minLength(3)]],
    cellno:["", [Validators.required, Validators.minLength(10)]]
  });

  get email() { return this.registerForm.get('email'); }

  get password() { return this.registerForm.get('password'); }

  get name() { return this.registerForm.get('name'); }

  get lastName() { return this.registerForm.get('lastName'); }
  
  get cellno() { return this.registerForm.get('cellno'); }


  register() {
    this.ps.register(this.registerForm.value).subscribe(
      {
        next: (res)=>{
          if (res == null){
            this.toastr.error("somthing went wrong");
            return this.router.navigate(['/register']);
           
          } else {
            this.showSuccess();  
            return this.router.navigate(['/login']);
          }
          
        },
        error: (err)=>{
          this.toastr.error(err.error.message);
          this.router.navigate(['/register']);
        }
     })
    
  }

  showSuccess() {
    this.toastr.success('successful login');
  }
}
