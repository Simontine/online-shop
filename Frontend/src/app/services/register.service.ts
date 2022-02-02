import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl = 'http://10.10.3.21:8080/api/v1/auth/signup'
  constructor(private http: HttpClient) { }

  register(data: any) {
   return this.http.post(this.baseUrl,data);
  }
}
