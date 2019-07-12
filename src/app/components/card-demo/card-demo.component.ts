import { Component, OnInit, ViewChild, TemplateRef, ContentChild, Output } from '@angular/core';
export let cardloctemp = [];

@Component({
  selector: 'app-card-demo',
  templateUrl: './card-demo.component.html',
  styleUrls: ['./card-demo.component.css']
})
export class CardDemoComponent implements OnInit {
  @ViewChild('Map') mapTemplate: TemplateRef<any>;
  @ViewChild('Date') dateRangeTemplate: TemplateRef<any>;
  @ViewChild('Health') healthTemplate: TemplateRef<any>;
  @ViewChild('AverageResponse') averageResponseTemplate: TemplateRef<any>;
  @ViewChild('TotalResponse') responseTemplate: TemplateRef<any>;
  @ViewChild('TotalRequest') requestTemplate: TemplateRef<any>;
  @ViewChild('TotalError') totalErrorTemplate: TemplateRef<any>;
  cardtemp = [];

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.cardtemp = [this.mapTemplate, this.dateRangeTemplate, this.healthTemplate, this.averageResponseTemplate,this.responseTemplate, this.requestTemplate, this.totalErrorTemplate];
    cardloctemp = this.cardtemp;
  }

}
