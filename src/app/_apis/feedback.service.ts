import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http : HttpClient) { }
  url = "https://epi-server.herokuapp.com/"


  getAll(){
    return this.http.get(this.url + 'feedbacks')
  }

  create(body : any){

    return this.http.post(this.url+'feedbacks' , body)
  }

  update(body : any , id : string){
    return this.http.put(this.url+ 'feedbacks/'+id , body)
  }
  remove( id : string){
    return this.http.delete(this.url+`feedbacks/${id}`)
  }
}
