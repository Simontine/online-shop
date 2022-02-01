import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  checkoutForm = this.fb.group({
    firstname: [''],
    lastname: [''],
    email: [''],
    address: [''],
    city: [''],
    province: [''],
    phoneNumber: ['']
  })

  submit(){
    console.log("Hass been clicked")
  }

  form(){
    console.log(this.checkoutForm.value)
  }

}
