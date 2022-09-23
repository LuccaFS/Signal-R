import { SignalRService } from './services/signal-r.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public chartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  public chartLabels: string[] = ["Real time data for the chart"];
  public chartType: string = "bar";
  public chartLegend: boolean = true;
  public colors: any[] =[
    {backgroundColor: "#5491DA"},
    {backgroundColor: "#E74C3C"},
    {backgroundColor: "#B2E0AA"},
    {backgroundColor: "#E5E7E9"}
  ]

  constructor(public signalRService: SignalRService, private http: HttpClient){ }

  ngOnInit(){
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
    this.signalRService.addBroadcastChartDataListener()
    this.startHttpRequest();
  }

  private startHttpRequest(){
    this.http.get('https://localhost:5001/api/chart').subscribe(res =>{
      console.log(res);
    })
  }

  public chartClicked(event: any){
    console.log(event);
    this.signalRService.broadcastChartData();
  }
}
