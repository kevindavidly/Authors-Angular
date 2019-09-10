import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAuthors() {  // correlates with what will be passed into the home/hom.component.ts
    return this._http.get('/authors') //correlates with the routes established in the server.js
  }
  
  deleteAuthor(id) {
    return this._http.delete('/authors/' + id);
  }

  newAuthor(author) {
    return this._http.post('/authors/new', author) 
  }

  getAuthor(id){
    return this._http.get('/authors/' + id)
  }

  editAuthor(author) {
    return this._http.put('/authors/' + author._id, author)
  }

  createQuote(quote, authorId) {
    return this._http.put('/authors/' + authorId + '/quote', quote)
  }
}
