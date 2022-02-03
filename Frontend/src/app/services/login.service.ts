import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = 'http://localhost:8080/api/v1/auth'

  constructor(private http: HttpClient) { }

  login(data:any){
    try{
    return this.http.post(this.baseUrl+'/login',data)
    }catch(err){
      return err;
    }
  }
}
