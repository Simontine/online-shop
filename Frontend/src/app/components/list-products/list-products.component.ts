import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/product.model';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  products: product[] = [];
  productInCart: any = [];
  cartItem: any = {};
  totalInCart: number = 0;
  totalPriceInCart: number = 0;

  constructor(
    private sharedDataService: SharedDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('Products')) {
      let localProduct: any = localStorage.getItem('Products');
      this.products = JSON.parse(localProduct);

      this.calculateTotal();
    }
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
    this.sharedDataService.changeMessage(this.products.length);
  }

  showSuccess() {
    this.toastr.success('Product has been added');
  }

  addToCart(currentProduct: any) {
    this.totalInCart++;

    console.log(this.totalInCart);
    
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
    
    this.showSuccess();
    this.sharedDataService.changeMessage(this.products.length);
    localStorage.setItem('Products', JSON.stringify(this.products));
  }

  minus(currentProduct: any) {
 

    console.log(currentProduct);
    //let matched = false;
    this.products.forEach((citem: any) => {
      console.log(this.productInCart);
      if (citem.product_id == currentProduct.product_id) {
        
        if(citem.quantity >= 2){

          citem.quantity--;
        }
        // matched = true;
        citem.subtotal = currentProduct.price * citem.quantity;
        this.totalPriceInCart -= citem.subtotal;
        this.showMinusSuccess();
      }
    });
  }

  
  showMinusSuccess() {
    this.toastr.success('Product has been removed');
  }
}
