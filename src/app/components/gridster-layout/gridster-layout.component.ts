import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, Input } from '@angular/core';
import { GridsterLayoutService } from 'src/app/services/gridster-layout.service';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { CardDemoComponent } from '../card-demo/card-demo.component';
import { cardloctemp } from '../card-demo/card-demo.component';

let components: any = [CardDemoComponent, CardDemoComponent, CardDemoComponent, CardDemoComponent, CardDemoComponent, CardDemoComponent, CardDemoComponent];

@Component({
  selector: 'app-gridster-layout',
  templateUrl: './gridster-layout.component.html',
  styleUrls: ['./gridster-layout.component.css']
})
export class GridsterLayoutComponent implements OnInit {
  @ViewChild('Map') mapTemplate: TemplateRef<any>;
  @ViewChild('Date') dateRangeTemplate: TemplateRef<any>;
  @ViewChild('Health') healthTemplate: TemplateRef<any>;
  @ViewChild('AverageResponse') averageResponseTemplate: TemplateRef<any>;
  @ViewChild('TotalResponse') responseTemplate: TemplateRef<any>;
  @ViewChild('TotalRequest') requestTemplate: TemplateRef<any>;
  @ViewChild('TotalError') totalErrorTemplate: TemplateRef<any>;
  public templates = [];
  
  options: GridsterConfig;
  dashboardItems: Array<GridsterItem>;
  clicked: boolean = false;

  constructor(private gridItemService: GridsterLayoutService, private cdRef : ChangeDetectorRef) { }

  ngAfterViewInit(): void{
    this.templates = cardloctemp;
    console.log('CardTemp: ', cardloctemp);
    //this.templates = [this.mapTemplate, this.dateRangeTemplate, this.healthTemplate, this.averageResponseTemplate,this.responseTemplate, this.requestTemplate, this.totalErrorTemplate]; 
  }
  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }
  ngOnInit() {
    this.options = this.gridItemService.options;

     this.dashboardItems = this.gridItemService.dashboard;
     console.log(this.dashboardItems);
    // this.dashboardItems = [
    //   {cols: 5, rows: 5, y: 0, x: 0, selector: 1, label: 'Date', display: true},
    //   {cols: 5, rows: 5, y: 0, x: 6, selector: 2,label: 'Health', display: true},
    //   {cols: 5, rows: 5, y: 0, x: 12, selector: 3, label: 'Average Response', display: true},
    //   {cols: 6, rows: 5, y: 5, x: 0, selector: 4,label: "Total Response", display: true},
    //   {cols: 6, rows: 5, y: 5, x: 6, selector: 5, label: "Total Result", display: true},
    //   {cols: 6, rows: 5, y: 5, x: 12, selector: 6, label: "Total Errors", display: true},
    //      ];
    

  }
//Toggle bewteen Edit Mode and Save Mode
editDashboard(): void{
  let button = document.getElementById('toggleButton');
  let gridBackground = document.getElementById('gridster');

  if (!this.clicked) {
    this.clicked = true; 

    //Change the Color of Button and Background to Edit 
    button.style.backgroundColor = "#ff5678";
    gridBackground.style.backgroundColor = '#343a40';
    
    //Change the Options Configuration for entring Edit Mode
    this.gridItemService.startGridDragResize();
    //callback when Options changes 
    this.changedOptions();
    

  } else {
    this.clicked = false;
    
    //Change the Color of Button and Background to default 
    button.style.backgroundColor = null;
    gridBackground.style.backgroundColor = null;
    //Change the Options Configuration for entring Edit Mode
    this.gridItemService.stopGridDragResize();
    this.gridItemService.saveItems(this.dashboardItems);
    this.changedOptions();
  }
  }

   //Callback function when Grid Options Cofiguration changes while toggling Modes
   changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }
  
  unDisplayItem($event, item: GridsterItem){
console.log('UnDsiaplay Func');
    if(item.display){
      item.display = false;
    }else{
      item.display = true;
      //this.addDashBoardItem(item);
    }
   
  }

}
