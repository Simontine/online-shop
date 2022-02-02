import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(private fb: FormBuilder, private sharedDataService: SharedDataService) {}

  productInCart: any;
  totalInCart: number  = 0;


  ngOnInit(): void {
 
    if (localStorage.getItem('Products')) {
      let localProduct: any = localStorage.getItem('Products');
      this.productInCart = JSON.parse(localProduct);

      this.productInCart.forEach((data: any) => {
        this.totalInCart += data.subtotal;
        console.log(this.totalInCart);
      });
      this.sharedDataService.changeMessage(this.productInCart.length);
    }
  }

  checkoutForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    city: ['', Validators.required],
    province: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: ['', Validators.required],
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

  get address() {
    return this.checkoutForm.get('address');
  }

  get phoneNumber() {
    return this.checkoutForm.get('phoneNumber');
  }

  submit() {
    console.log('Hass been clicked');
  }

  form() {
    console.log(this.checkoutForm.value);
  }
}
