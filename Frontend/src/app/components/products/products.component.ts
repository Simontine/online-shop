import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/models/product.model';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: product[] = [
    {
      id: 2,
      price: 'R2O.00',
      shortDescription: ' Lorem ipsum dolor 2',
      longDescription:
        ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis 2',
      name: 'lorem ipsun dolor 2',
      category: 'fjskfjs fsdkfjsdj 2',
    },
    {
      id: 1,
      price: 'R1O.00',
      shortDescription: ' Lorem ipsum dolor 1',
      longDescription:
        ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis! 1',
      name: 'lorem ipsun dolor 1',
      category: 'fjskfjs fsdkfjsdj 1',
    },
    {
      id: 4,
      price: 'R4O.00',
      shortDescription: ' Lorem ipsum dolor 4',
      longDescription:
        ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis! 4',
      name: 'lorem ipsun dolor 4',
      category: 'fjskfjs fsdkfjsdj 4',
    },
    {
      id: 3,
      price: 'R3O.00',
      shortDescription: ' Lorem ipsum dolor 3',
      longDescription:
        ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis 3',
      name: 'lorem ipsun dolor 3',
      category: 'fjskfjs fsdkfjsdj 3',
    },
  ];

  productInCart: any = [];

  
  constructor(private sharedDataService: SharedDataService, private toastr: ToastrService) {}

  ngOnInit(): void {
    //private sharedDataService: SharedDataService

    console.log(this.productInCart);
  }

  addToWishList() {
    console.log('Wish list hs been added');
  }

  viewMore() {
    console.log('View more has been aaded');
  }

  totalInCart: number = 0;

  //addedToCart
  addToCart(product: any) {

    //this.productInCart = producsts;

    this.productInCart.push(product);
    console.log(this.productInCart)
    this.totalInCart = this.productInCart.length;

    //this groups product by id
    const productGroupedById = this.productInCart.reduce(function (
      results: any,
      product: any
    ) {
      (results[product.id] = results[product.id] || []).push(product);
      return results;
    },
    {});

    //This store the key and create a new array with based on key
    console.log(productGroupedById);
    const productById = Object.keys(productGroupedById);

    let products: any = [];

    productById.forEach((p) => {
      let product = productGroupedById[p];

      if (product[0]) {
        product[0].quantity = productGroupedById[p].length;
        products.push(product[0]);
      }
    });

    console.log('-------Our Cart-----');
    // console.log(`Total in cart: ${this.totalInCart}`);
    // console.log(products)

    this.showSuccess();
  

    this.sharedDataService.productMessage(products);
    console.log(this.totalInCart);
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
