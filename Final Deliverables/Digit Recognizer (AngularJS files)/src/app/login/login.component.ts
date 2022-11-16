// Done by Harshath.M

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = "";
  pwd = "";
  invalid= true;
  showbutton = true;

  constructor(private route:Router, private http:HttpClient, private snackbar:MatSnackBar) {
    
  }

  ngOnInit(): void {
    
  }
  emailFC = new FormControl('',[Validators.email,Validators.required]);
  passwordFC = new FormControl('',[Validators.required]);
  
  val_credentials(email:string,pwd:string){
    let formdata = new FormData();
    formdata.append("email",email);
    formdata.append("pwd",pwd);
    let api_url = "http://127.0.0.1:5000/api/";
    this.http.post(api_url+"verify",formdata).subscribe({
      next:((res:any)=>{
        if(res.statusmessage=='true'){
          this.snackbar.open("Email and Password is verified😎","Welcome", {duration:2000});
          this.route.navigate(['/upload']);
        }
        else if(res.statusmessage=="false"){
          this.snackbar.open("Invalid Credentials🤷‍♂️","Close", {duration:4000});
        }
        else{
          this.snackbar.open("Oops! Something went wrong😟","Close", {duration:4000});
        }
      }),
      error:(()=>{
        this.showbutton=true;
        this.snackbar.open("Oops! Server is not available 😟","Close", {duration:4000});
      })
    });
  }
}
