import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private sharedDataService: SharedDataService
  ) {}

  productInCart: any;
  totalInCart: number = 0;

  //populate shipping info if availabe on localstorage or give it empty object
  shipping_info: any = localStorage.getItem('shippingInfo')
    ? JSON.parse(localStorage.getItem('shippingInfo'))
    : {};

  ngOnInit(): void {
    if (localStorage.getItem('Products')) {
      let localProduct: any = localStorage.getItem('Products');
      this.productInCart = JSON.parse(localProduct);

      this.productInCart.forEach((data: any) => {
        this.totalInCart += data.subtotal;
      });
      this.sharedDataService.changeMessage(this.productInCart.length);
    }
  }

  checkoutForm = this.fb.group({
    firstname: [this.shipping_info.firstname, Validators.required],
    lastname: [this.shipping_info.lastname, Validators.required],
    email: [this.shipping_info.email, Validators.required],
    address: this.fb.group({
      province: [this.shipping_info.address.province, Validators.required],
      city: [this.shipping_info.address.city, Validators.required],
      street: [this.shipping_info.address.street, Validators.required],
      surburb: [this.shipping_info.address.surburb, Validators.required],
    }),
    payment_method: [this.shipping_info.payment_method, Validators.required],
    phoneNumber: [this.shipping_info.phoneNumber, Validators.required],
  });

  get firstname() {
    return this.checkoutForm.get('firstname');
  }

  get lastname() {
    return this.checkoutForm.get('lastname');
  }

  get email() {
    return this.checkoutForm.get('email');
  }

  get city() {
    return this.checkoutForm.get('city');
  }

  get province() {
    return this.checkoutForm.get('province');
  }

  get street() {
    return this.checkoutForm.get('street');
  }

  get surburb() {
    return this.checkoutForm.get('surburb');
  }

  get phoneNumber() {
    return this.checkoutForm.get('phoneNumber');
  }

  checkoutSubmit() {
   
    let formShippingInfo = {
      ...this.checkoutForm.value,
      cart: this.productInCart,
      total_amount: this.totalInCart,
    };

   /* if (this.auth.isAuthenticated) {
      console.log("has logged in")
      //service to send order
      //have to clear localstorage once order completed
    }else{
      localStorage.setItem('shippingInfo', JSON.stringify(formShippingInfo));
      //go back to login
      localStorage.removeItem("shippingInfo");
    }*/
    localStorage.setItem('shippingInfo', JSON.stringify(formShippingInfo));

  }
}