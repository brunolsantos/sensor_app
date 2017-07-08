import { Component, OnInit } from '@angular/core';

import * as Chartist from 'chartist';
import { ChartType } from 'ng-chartist';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

declare var require: any;

//Interface for chart creation
export interface Chart {
  title: String;
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  measurements: any = [];
  charts: Chart[];
  dates: any = [];
  ph: any = [];
  turbidity: any = [];
  temperature: any = [];
  nivel: any = [];
  interval:any;

  constructor(private http: Http, private flashMessages: FlashMessagesService) {
    this.interval = setInterval(() => {
         this.initCharts();
    }, 3000);   
  }


  ngOnInit() {
    //this.initCharts();
  } 

  initCharts(){
    this.measurements = [];
    this.dates= [];
    this.ph = [];
    this.turbidity = [];
    this.temperature = [];
    this.nivel = [];
    this.interval;

    this.getMeasurements().subscribe(data => {
      if (data.success) {
        this.measurements = data.msg;
        this.prepareDataForChart();
         if (typeof this.charts === 'undefined' || !this.charts) {
          console.log('undefined11');
          };
      } else {
        console.log('error');
      }
    });
  }
  getMeasurements() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/measurement', { headers: headers })
      .map(res => res.json());
  }

  prepareDataForChart() {
    //Preparing Lines and Series
    for (var i = 0; i < this.measurements.length; i++) {
      this.dates.push(this.measurements[i].date);
      /*
      this.ph.push({ 'meta': 'PH', 'value': this.measurements[i].ph });
      this.temperature.push({ 'meta': "TEMP", "value": this.measurements[i].temperature });
      this.nivel.push({ 'meta': 'NIVEL', 'value': this.measurements[i].level });
      this.turbidity.push({ 'meta': 'TURB', 'value': this.measurements[i].turbidity });
      */
      this.ph.push(this.measurements[i].ph);
      this.temperature.push(this.measurements[i].temperature);
      this.nivel.push(this.measurements[i].level);
      this.turbidity.push(this.measurements[i].turbidity);
    }

    var completeData = {
      "Turbidez": {
        "labels": this.dates,
        "series": [this.turbidity]
      },
      "PH": {
        "labels": this.dates,
        "series": [this.ph]
      },
      "Temperatura": {
        "labels": this.dates,
        "series": [this.temperature]
      },
      "Nivel": {
        "labels": this.dates,
        "series": [this.nivel]
      }
    }

    this.charts = [
      {
        title:"Turbidez",
        type: 'Line',
        data: completeData['Turbidez'],
        options: {
          low: 0,
          high: 10,
          fullWidth: true//,
          //plugins: [
            //Chartist.plugins.tooltip()
          //]
        }
      },
      {
        title:"PH",
        type: 'Line',
        data: completeData['PH'],
        options: {
          low: 0,
          high: 10,
          fullWidth: true//,
          //plugins: [
            //Chartist.plugins.tooltip()
          //]
        }
      },
      {
        title:"Temperatura",
        type: 'Line',
        data: completeData['Temperatura'],
        options: {
          low: 0,
          high: 100,
          fullWidth: true//,
          //plugins: [
            //"Chartist.plugins.tooltip()"
          //]
        }
      },
      {
        title:"Nivel",
        type: 'Line',
        data: completeData['Nivel'],
        options: {
          low: 0,
          high: 2,
          fullWidth: true//,
         // plugins: [
            //Chartist.plugins.tooltip()
          //]
        }
      }
    ];
  }

}


/*"Line": {
    "labels": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "series":  [
      [
        { meta: 'TEMP.', value: 1 },
        { meta: 'TEMP.', value: 2 },
        { meta: 'TEMP.', value: 0.6 }
      ]
    ], 
    "options":{
      "low": 0,
      "high": 100,
      "fullWidth": true,
      "plugins": [
        "Chartist.plugins.tooltip()"
      ]
    }
  }

  {
    "Turbidez":{
      "labels":[
        "2012-11-10T09:44:44.243Z",
        "2012-11-10T09:44:44.243Z"
      ],
    
    "series":[
        {"meta":"TURB","value":91.2},
        {"meta":"TURB","value":95.2}
      ]},
    "PH":{
        "labels":[
          "2012-11-10T09:44:44.243Z",
          "2012-11-10T09:44:44.243Z"
        ],"series":[
          {"meta":"PH","value":2.5},
          {"meta":"PH","value":3.5}
      ]},
    "Temperatura":{
          "labels":[
            "2012-11-10T09:44:44.243Z",
            "2012-11-10T09:44:44.243Z"
          ],"series":[
            {"meta":"TEMP","value":25.2},
            {"meta":"TEMP","value":26.2}
      ]},
    "Nivel":{
        "labels":[
          "2012-11-10T09:44:44.243Z",
          "2012-11-10T09:44:44.243Z"
        ],"series":[
          {"meta":"NIVEL"},
          {"meta":"NIVEL"}
      ]}}





  */