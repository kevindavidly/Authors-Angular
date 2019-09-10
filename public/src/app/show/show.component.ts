import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(private _httpService: HttpService, 
    private _router: Router, 
    private _route: ActivatedRoute) { }

    authorId;
  
    author = {
      "first_name": "",
      "last_name": "",
    }

    quote = {
      "content": '',
    }
  
    ngOnInit(){
      this._route.params.subscribe((params: Params) => {
        console.log(params['id'])
        this.authorId = params['id']
      })
      this.getOneAuthor();
    }
    
    getOneAuthor(){
      this._httpService.getAuthor(this.authorId).subscribe( data => {
        console.log("Got one author: ", data)
        this.author = data['author']
      })
    }
    
    goHome(){
      this._router.navigate(['/home']);  // this will route us back to home
    }

    onSubmit() {
      this._httpService.createQuote(this.quote, this.authorId).subscribe( data => {
        console.log("Created Quote: ", data)
        this.quote = data['quote']
        this.goHome();
      })
    }
}