import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }
  
  url = "https://epi-server.herokuapp.com/"

  register(body : any){
    return this.http.post(this.url+'register' , body)
  }
  login(body : any){
    return this.http.post(this.url+'login' , body)
  }
}
