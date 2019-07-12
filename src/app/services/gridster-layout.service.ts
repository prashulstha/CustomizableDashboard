import { Injectable } from '@angular/core';
import { GridsterItem, GridsterConfig, GridType, DisplayGrid, CompactType} from 'angular-gridster2';

@Injectable({
  providedIn: 'root'
})
export class GridsterLayoutService {

  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  constructor() { 
    this.options = {
      itemChangeCallback: this.itemChange.bind(this),
      itemResizeCallback: this.itemResize.bind(this),
      gridType: GridType.Fit,
      compactType: CompactType.None,
      displayGrid: DisplayGrid.None,
      minCols: 6,
      maxCols: 18,
      minRows: 4,
      maxRows: 30,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 800,
      disableScrollHorizontal: true,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      draggable: {
        enabled: false
      },
      resizable: {
        enabled: false,
      },
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushResizeItems: false,
      swap: true,
      setGridSize: false,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };
    //Checking if the Dashboard get's loading from the Local Storage
    if(this.getItems() == null){
    this.dashboard = [
      {cols: 19, rows: 15, y: 0, x: 0, selector: 0,  minItemRows: 6, minItemCols: 6,  label: "Map", display: true},
      {cols: 5, rows: 5, y: 0, x: 19, selector: 1, label: 'Date', display: true},
      {cols: 5, rows: 5, y: 5, x: 19, selector: 2,label: 'Health', display: true},
      {cols: 5, rows: 5, y: 10, x: 19, selector: 3, label: 'Avergae Response', display: true},
      {cols: 6, rows: 5, y: 15, x: 0, selector: 4,label: "Total Response", display: true},
      {cols: 6, rows: 5, y: 15, x: 6, selector: 5, label: "Total Request", display: true},
      {cols: 6, rows: 5, y: 15, x: 12, selector: 6, label: "Total Errors", display: true},
    ];
  }else{
    this.dashboard = this.getItems();
  }

  }
  
  itemChange(item) {
    console.info('itemChanged', item);
    //this.updateRowColumn(item);
  }

  itemResize(item) {
    console.info('itemResized', item);

  }
  getItems() {
    try {
        var retreivedItem = localStorage.getItem('Items');
        var dashboard = JSON.parse(retreivedItem);
        console.log("Printing Retrieved Items: ", dashboard);
        return dashboard;
    } catch (error) {
        console.log("Error Retrieving Items: ", error);
    }
}

saveItems(dashboard: Array<GridsterItem>) {
    try {

        console.log("Saving Items: ", dashboard);
        localStorage.clear();
        localStorage.setItem('Items', JSON.stringify(dashboard));
    } catch (error) {
        console.log("Error Saving the Items: ", error);
    }
}

   //Callback function when Grid Options Cofiguration changes while toggling Modes
   changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  
  startGridDragResize() {
    this.options.draggable.enabled = true;
    this.options.resizable.enabled = true;
    this.options.displayGrid = DisplayGrid.Always;

    this.changedOptions();
}

stopGridDragResize() {
    this.options.draggable.enabled = false;
    this.options.resizable.enabled = false;
    this.options.displayGrid = DisplayGrid.None;
    this.changedOptions();

} 
}
