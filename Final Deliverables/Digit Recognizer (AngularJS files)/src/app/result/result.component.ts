import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';


// Done by Harshath.M

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private http:HttpClient,
              private domsanitizer:DomSanitizer) { }
	chartOptions:any;
  pred_value = 0 ;
	load_graph = false;
  preview: any;
  api_url = "http://127.0.0.1:5000/api/";

  ngOnInit(): void {
    this.http.get(this.api_url+'image',{responseType:'blob'}).subscribe({
      next:((res:any)=>{
        let objecturl = URL.createObjectURL(res);
        this.preview = this.domsanitizer.bypassSecurityTrustUrl(objecturl);
      })
    });
		this.http.get(this.api_url+"predict").subscribe((res:any)=>{
      this.pred_value = res.value;
			this.open_page();
			this.load_graph = true;
		});
  }
  getDataPoints() {
    let dataPoints =[];
    for (var i = 0; i <= 9 ; i++)
      dataPoints.push({
        x: i,
        y: 0
      });
    dataPoints[this.pred_value]= { x : this.pred_value ,y:100, indexLabel: "Highest\u2705"};
    console.log(dataPoints);
		return dataPoints;
	}

	open_page(){
		this.chartOptions = {                              //https://canvasjs.com/angular-charts/chart-index-data-label/
      animationEnabled: true,
			exportEnabled: true,
			theme: "light2",
			title: {
				text: "Recognized Result"
			},
      axisX: {
        title: "Digits",
        interval: 1
      },
      axisY:{
        title: "Prediction value (%)",
        maximum: 110,
        interval:25
      },
			data: [{
				type: "column",
		    dataPoints: this.getDataPoints()
			}]
		}
	}
}
