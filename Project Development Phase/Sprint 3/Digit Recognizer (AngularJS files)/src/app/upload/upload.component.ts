import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

// Done by Harshath.M

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  all_formats=['png', 'jpg', 'jpeg']
  file :any;
  fname ='';
  fformat='';
  formdata:any;
  enable_preview =false;
  preview : any;

  constructor(private snackbar:MatSnackBar,
              private http:HttpClient,
              private route:Router,
              private domsanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }

  select_file(event : any){
    try{
      this.file = event.target.files[0];
      if(this.file){
        this.fname = this.file.name;
        this.fformat = this.file.type.split('/')[1];
        if(this.all_formats.indexOf(this.fformat)!=-1){
          this.formdata= new FormData();
          this.formdata.append('image', this.file);
          this.formdata.append("format", this.fformat);

          let api_url = "http://127.0.0.1:5000/api/upload";
          this.http.post(api_url,this.formdata,{responseType:'blob'}).subscribe({
            next:((res:any)=>{
              let objecturl = URL.createObjectURL(res);
              this.preview = this.domsanitizer.bypassSecurityTrustUrl(objecturl);
            }),
            error:(()=>{
              this.snackbar.open("Oops! Server is not available 😟","Close", {duration:4000});
            }),
            complete:(()=> this.enable_preview=true)
          });
        }
        else{
          this.snackbar.open("Please select a jpg/jpeg/png file","Got it" ,{duration :3000});
          this.fname='';
          this.fformat='';
          this.file=null;
        }
      }  
    }
    catch(err){
      console.log(err);
    }
  }

  deletefile(){
    this.fname='';
    this.fformat='';
    this.file=null;
    this.formdata.delete("image");
    this.formdata.delete("format")
    this.enable_preview=false;
  }

// .subscribe(next?: ((value: string) => void) | null | undefined, 
// error?: ((error: any) => void) | null | undefined,
//  complete?: (() => void) | null | undefined): Subscription (+2 overloads)

  predict(){
      if(this.file){
        this.route.navigate(['result']);
      }
      else{
        this.snackbar.open("Please select a file 🙄","Okay",{duration:3000});
      }
  }
}
