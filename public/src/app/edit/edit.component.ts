import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private _httpService: HttpService, 
    private _router: Router, 
    private _route: ActivatedRoute) { }

    authorId;
  
    author = {
      "first_name": "",
      "last_name": "",
    }
    
    authorErrors = {  
      "first_name": "",
      "last_name": "",
    }
    
    ngOnInit() {         // these three methods are all the same as in ShowComponent!!
      this._route.params.subscribe((params: Params) => {
        console.log(params['id'])
        this.authorId = params['id']
      })
      this.getOneAuthor();
    }
  
    getOneAuthor() {
      this._httpService.getAuthor(this.authorId).subscribe( data => {
        console.log("Got one author: ", data)
        this.author = data['author']
      })
    }
    
    goHome() {
      this._router.navigate(['/home']);  // this will route us back to home
    }
    
    onSubmit() {
      this._httpService.editAuthor(this.author).subscribe( data => {
        console.log("Updated Author: ", data)
        this.authorErrors = {  
          'first_name': '',
          'last_name': '',
        }
        if(data['Message'] == 'Error') {
          console.log("There was an error!")
          if(data['err']['errors']['first_name']) {
            this.authorErrors['first_name'] = data['err']['errors']['first_name']['message']; 
          }
          if(data['err']['errors']['last_name']) {
            this.authorErrors['last_name'] = data['err']['errors']['last_name']['message']; 
          }
        } else {
          console.log('Successful update!')
          this.goHome();
        }
      })
    }
}
  