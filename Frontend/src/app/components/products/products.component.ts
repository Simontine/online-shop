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
      category: '../../../assets/p3.jpg',
    },
    {
      id: 1,
      price: 'R1O.00',
      shortDescription: ' Lorem ipsum dolor 1',
      longDescription:
        ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis! 1',
      name: 'lorem ipsun dolor 1',
      category: '../../../assets/p4.jpg',
    },
    {
      id: 4,
      price: 'R4O.00',
      shortDescription: ' Lorem ipsum dolor 4',
      longDescription:
        ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis! 4',
      name: 'lorem ipsun dolor 4',
      category: '../../../assets/p6.jpg',
    },
    {
      id: 3,
      price: 'R3O.00',
      shortDescription: ' Lorem ipsum dolor 3',
      longDescription:
        ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis 3',
      name: 'lorem ipsun dolor 3',
      category: '../../../assets/p3.jpg',
    },
  ];

  productInCart: any = [];

  
  constructor(private sharedDataService: SharedDataService, private toastr: ToastrService) {}

  ngOnInit(): void {
  
    let localProduct: any;
    localProduct = localStorage.getItem("Products") == null ? [] : localStorage.getItem("Products");

    let s = JSON.parse(localProduct)
    console.log(s);
  }

  addToWishList() {
    console.log('Wish list hs been added');
  }

  updateViewMore: any = {}; 
  viewMore(product: any) {
    this.updateViewMore = product;
  }

  totalInCart: number = 0;

  //addedToCart
  addToCart(product: any) {

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

      if (product[0].id == product.id) {
      //   let y = null ? 0 :  product[0].quantity;
      product[0].quantity = product[0].quantity + 1;
      //   products.push(product[0]);
      }


    });

    console.log('-------Our Cart-----');

    this.showSuccess();
    localStorage.setItem("Products", JSON.stringify(products));
  

    this.sharedDataService.productMessage(products);
    console.log(this.totalInCart);
  }

  showSuccess() {
    this.toastr.success('Product has been added');
  }
}
