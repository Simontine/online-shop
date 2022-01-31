import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {

 
  public editDataDetails: any = 0;

  public productData: any = {};

  public subject = new Subject<any>();

  private messageSource = new BehaviorSubject(this.editDataDetails);
  private productSource = new BehaviorSubject(this.productData);

  currentMessage = this.messageSource.asObservable();
  currentProduct = this.productSource.asObservable();

  changeMessage(message: any) {
    this.messageSource.next(message);
  }

  productModel(product: any){
    this.productSource.next(product);
  }

}
