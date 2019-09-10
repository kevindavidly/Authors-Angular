import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  authors: any;
  
  constructor(private _httpService: HttpService) {}
  
  ngOnInit() {
    this.getAllAuthors(); // will invoke this function on page initialization
  }
  getAllAuthors(){
    this._httpService.getAuthors().subscribe( data => {   // getAuthors() method will be underlined until created
      console.log("Successfully got all authors: ", data);
      this.authors = data['authors']  // puts the pulled info into a variable to use within html
    })
  }
  
  deleteOneAuthor(id) {
    this._httpService.deleteAuthor(id).subscribe( data =>{
      console.log("Deletion successful!")
      this.getAllAuthors();
    })
  }
}
