import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css'],
})
export class ProductDescriptionComponent implements OnInit {
  products: any = [];
  productInCart: any = [];
  cartItem: any = {};
  totalInCart: number = 0;
  totalPriceInCart: number = 0;

  constructor(
    private sharedDataService: SharedDataService,
    private toastr: ToastrService
  ) {}

  product: any = {};

  ngOnInit(): void {
    this.sharedDataService.currentProduct.subscribe(
      (data) => (this.product = data)
    );
    console.log(this.product);
  }

  RemoveItem(index: any) {
    this.products.splice(index, 1);
    console.log(this.products);
    this.totalInCart = 0;
    localStorage.setItem('Products', JSON.stringify(this.products));
    this.calculateTotal();
  }

  calculateTotal() {
    this.products.forEach((data: any) => {
      this.totalInCart += data.quantity;
      console.log(this.totalInCart);
    });
    this.sharedDataService.changeMessage(this.totalInCart);
  }

  showSuccess() {
    this.toastr.success('Product has been added');
  }

  showMinusSuccess() {
    this.toastr.success('Product has been removed');
  }

  addToCart(currentProduct: any) {
    this.totalInCart++;

    console.log(this.totalInCart);
    this.sharedDataService.changeMessage(this.totalInCart);

    console.log(currentProduct);
    //let matched = false;
    this.products.forEach((citem: any) => {
      console.log(this.productInCart);
      if (citem.product_id == currentProduct.product_id) {
        citem.quantity++;
        // matched = true;
        citem.subtotal = currentProduct.price * citem.quantity;
        this.totalPriceInCart += citem.subtotal;
        this.showSuccess();
      }
    });
  }

  minus(currentProduct: any) {
    this.totalInCart--;

    console.log(this.totalInCart);
    this.sharedDataService.changeMessage(this.totalInCart);

    console.log(currentProduct);
    //let matched = false;
    this.products.forEach((citem: any) => {
      console.log(this.productInCart);
      if (citem.product_id == currentProduct.product_id) {
        citem.quantity--;
        // matched = true;
        citem.subtotal = currentProduct.price * citem.quantity;
        this.totalPriceInCart -= citem.subtotal;
        this.showMinusSuccess();
      }
    });

    localStorage.setItem('Products', JSON.stringify(this.products));
  }
}
