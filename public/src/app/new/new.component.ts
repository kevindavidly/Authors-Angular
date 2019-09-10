import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(private _httpService: HttpService, private _router: Router) { }

   
  newAuthor = {  // without this, you will likely get an error saying that itmes in form are undefined
    'first_name': "",
    'last_name': "",
  }
  
  authorErrors = {  
    'first_name': "",
    'last_name': "",
  }
  
  ngOnInit(){}

  goHome(){
    this._router.navigate(['/home']);  // this will route us back to home
  }
  
  onSubmit(){ //correlates with the form in html
    this._httpService.newAuthor(this.newAuthor).subscribe( data => {
      console.log(data)
      this.authorErrors = {  
        'first_name': "",
        'last_name': "",
      }
      if(data['message'] === 'Error') {
        console.log("There was an error!")
        if(data['err']['errors']['first_name']) {
          this.authorErrors['first_name'] = data['err']['errors']['first_name']['message']; 
        }
        if(data['err']['errors']['last_name']) {
          this.authorErrors['last_name'] = data['err']['errors']['last_name']['message']; 
        }
      } else {
        console.log("Success!")
        this.newAuthor = {  // will reset the fields after the form is submitted
          'first_name': "",
          'last_name': "",
        }
        this.goHome(); //calls the goHome() function after a successful addition
      }
    })
  }
}
