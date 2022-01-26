import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  constructor() {}

  public data: any = [];
  public num : number = 0;


  public subject = new Subject<any>();

  private messageSource = new BehaviorSubject(this.data);

  message = this.messageSource.asObservable();

  productMessage(product: any) {
    this.messageSource.next(product)
  }

}
