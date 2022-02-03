import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = 'http://10.10.3.21:8080/api/v1/auth'

  constructor(private http: HttpClient) { }

  login(data:any){
    return this.http.post(this.baseUrl+'/login',data)
  }
}
