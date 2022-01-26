import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/product.model';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  products: product[] = [];

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.sharedDataService.message.subscribe((data) => (this.products = data));
  }
}