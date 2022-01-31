import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
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
      price: 20.0,
      shortDescription: ' Lorem ipsum dolor 2',
      longDescription:
        ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis 2',
      name: 'lorem ',
      category: 'fsfsd',
      image: 'https://i.ibb.co/fNbq6VM/Choc-cream-biscuits.jpg',
    },
    {
      id: 1,
      price: 10.0,
      shortDescription: ' Lorem ipsum dolor 1',
      longDescription:
        ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis! 1',
      name: 'lorem ipsun dolor 1',
      category: 'https://i.ibb.co/fNbq6VM/Choc-cream-biscuits.jpg',
      image: 'https://i.ibb.co/fNbq6VM/Choc-cream-biscuits.jpg',
    },
    {
      id: 4,
      price: 40.0,
      shortDescription: ' Lorem ipsum dolor 4',
      longDescription:
        ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis! 4',
      name: 'lorem ipsun dolor 4',
      category: 'https://i.ibb.co/fNbq6VM/Choc-cream-biscuits.jpg',
    },
    {
      id: 3,
      price: 30.0,
      shortDescription: ' Lorem ipsum dolor 3',
      longDescription:
        ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis 3',
      name: 'lorem ipsun dolor 3',
      category: 'https://i.ibb.co/fNbq6VM/Choc-cream-biscuits.jpg',
    },
  ];

  productInCart: any = [];
  cartItem: any = {};

  totalPriceInCart: number = 0;
  totalInCart: number = 0;

  constructor(
    private sharedDataService: SharedDataService,
    private toastr: ToastrService,
    private router: Router,
    private ps: ProductService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('Products')) {
      let localProduct: any = localStorage.getItem('Products');
      this.productInCart = JSON.parse(localProduct);

      this.productInCart.forEach((data: any) => {
        this.totalInCart += data.quantity;
        console.log(this.totalInCart);
      });
      this.sharedDataService.changeMessage(this.totalInCart);
    }

    this.ps.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addToWishList() {
    console.log('Wish list hs been added');
  }

  updateViewMore: any = {};
  viewMore(product: any) {
    this.sharedDataService.productModel(product);
    this.updateViewMore = product;
    this.router.navigate(['/productdescription']);
  }

  addToCart(currentProduct: any) {
    this.totalInCart++;

    this.sharedDataService.changeMessage(this.totalInCart);

  
    let matched = false;
    this.productInCart.forEach((citem: any) => {
      if (citem.product_id == currentProduct.product_id) {
        console.log(citem);
        citem.quantity++;
        matched = true;
        citem.subtotal = currentProduct.price * citem.quantity;
        this.totalPriceInCart += citem.subtotal;
        this.showSuccess();
      }
    });

    if (!matched) {
      this.cartItem = {
        ...currentProduct,
        quantity: 1,
        subtotal: currentProduct.price,
      };
      this.totalPriceInCart += currentProduct.price;
      this.productInCart.push(this.cartItem);
      this.showSuccess();
    }

    localStorage.setItem('Products', JSON.stringify(this.productInCart));
  }

  showSuccess() {
    this.toastr.success('Product has been added');
  }
}
