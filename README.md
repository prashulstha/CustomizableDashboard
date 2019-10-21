# CustomizableDashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

## Article
________________________________________
Customizable Dashboard in Angular using Gridtser2 & Ng-TemplateOutlet
 
In this article, I’ll go over the steps to build a customizable dashboard to be able to drag/drop, resize or duplicate components in Angular using Angular Gridster2 and Ng-TemplateOutlet. 
________________________________________
Before we begin — let’s look at the tools we will be using:
Angular
Angular is a Typescript-based open-source web application framework led by the Angular Team at Google for developing website ranging from personal portfolio to large admin dashboard. Angular follows a certain pattern and conventions which simplifies things and saves a lot of time and effort by enforcing re-usability.
Angular Gridster2
Angular-Gridster2 is a pure Angular Package that will help us build responsive multi-column grid enabling users to move/resize each individual component. It supports adding components dynamically and is highly configurable.
tiberiuzuld/angular-gridster2
Angular gridster 2. Contribute to tiberiuzuld/angular-gridster2 development by creating an account on GitHub.github.com
 Gridster Layout & Gridster Item
let’s Begin
# Step 1. Create a new Angular Project
Make sure Node.js is pre-installed in your computer. Open your Terminal and type in the following command to install Angular:
npm install -g @angular/cli
Now, let’s create the angular App using Angular’s CLI:
 : Creating a new Angular App
After the angular app gets created, get inside the App Folder and install the Gridster Package:
cd ng-dashboard-builder
npm install angular-gridster2 –save
Open your Angular app in your favorite IDE — Visual Studio for me. 
# Step 2. Create Grid Service and Component
Next, we will create our Gridster Service Class and Gridster Layout Component.
________________________________________
Service in Angular encompasses all the logic, data models, functions or feature that the app needs. Separating application logic makes it easy to factor into services and make those services available to components through dependency injection.
Components are used to enable the user experience by rendering data into the view. Angular has four parts in its component:
/component-name.component.html => Template used for rendering HTML
/component-name.component.css => Styling
/component-name.component.spec.ts => Unit test spec
/component-name.component.ts =>TypeScript file with logic and methods for that component
________________________________________
In our case, we are creating Gridster Service Class to hold all the data related to the Gridster such as configurations flags for setting up the Dashboard. Gridster items — Object that holds value such as # of cols and rows it will be covering and its position in the Gridster layout. (More on this later)
Let’s go ahead to create separate components and services into different folders at the src/app/. From the same terminal, type in:
cd src/app/
mkdir components services
Now, create the Gridster service and Gridster Layout using Angular CLI command below:
cd components/
ng generate component gridster-layout
cd ../services/
ng generate service gridster-layout
Upon adding new component and services, our app directory will get updated to something below:
 : After adding Component and Service
Go to your app.component.html, delete everything and add <app-gridster-layout></app-gridster-layout>. We are referencing to render our newly created component as default.
# Step 3. Modify the Gridster-Layout Module
To make things working, we have to add the Service class we just created into the app.module.ts, that will allow us to use the Gridster Package and Gridster-layout Service anywhere inside the app.
Open src/app/app.module.ts:
Import GridsterModule at the top of the file and add GrdisterLayoutService in the provider:
 
# Step 4. Modifying the Gridster Service Class:
Let’s pause to first understand how the Gridster2 Package works:
 : 6 rows x 5 cols Dashboard
Dashboard: In Gridster2, the dashboard mimics a 2-D Array where it is divided between rows and columns and the Gridster Item hold the cols, rows, x-y values as their attributes. The dashboard uses those values to render the item into the Grid.
For instance: In the picture above, the dashboard is 6 x 5 Array and the Total Error Gridster Item covers 3 Columns x 4 Rows, with its position being (1,1).
# 1: Import the packages into it: GrdisterItem & GridsterConfig
Head over to the Gridster Service Class src/app/services/gridster-layout.service.ts, we created before and make the following changes to it:
import { Injectable } from ‘@angular/core’;
import { GridsterItem, GridsterConfig, GridType, DisplayGrid, CompactType} from ‘angular-gridster2’;
@Injectable({ providedIn: ‘root’})
export class GridsterLayoutService { 
constructor() {}
}
# 2: Initialize GrdisterConfig and GrdisterItem Array:
At the same file, make the following changes to initialize the varibales.
import { Injectable } from ‘@angular/core’;
import { GridsterItem, GridsterConfig, GridType, DisplayGrid, CompactType} from ‘angular-gridster2’;
@Injectable({ providedIn: ‘root’})
export class GridsterLayoutService {
options: GridsterConfig;
dashboardItems: Array<GridsterItem>;
constructor() {
  this.options = {
     draggable: {
       enabled: true //That allows us to drag items
     },
     pushItems: true, //That allows us to push items while dragging
     resizable: {
      enabled: true  //That allows us to resize items
     }
   };
  this.dashboardItems = [
 {cols: 5, rows: 5, y: 0, x: 0, selector: 1, label: 'Date', display: true},
 {cols: 5, rows: 5, y: 0, x: 6, selector: 2,label: 'Health', display: true},
 {cols: 5, rows: 5, y: 0, x: 12, selector: 3, label: 'Average Response', display: true},
 {cols: 6, rows: 5, y: 5, x: 0, selector: 4,label: "Total Response", display: true},
 {cols: 6, rows: 5, y: 5, x: 6, selector: 5, label: "Total Result", display: true},
 {cols: 6, rows: 5, y: 5, x: 12, selector: 6, label: "Total Errors", display: true},
];
  }
}
Here, we are defining GridsterConfig as options, and an array of 6 GridsterItem Object as dashboardItems.
# 3: Display the Dashboard
After we have initialized the config in the service, we must load the Gridster Dashboard. For that head over to: src/gridster-layout/gridster-layout.component.html
<div class="toolbar">Customizable Dashboard</div>
<gridster [options]="options"> 
  <div *ngFor="let item of dashboardItems">  
      <gridster-item [item]="item">
        <h5>{{item.label}}</h5>
      </gridster-item>
  </div>
</gridster>
The <gridster> tag helps create an instance of Gridster and the [options] = options is a way of binding values in Angular. Lastly, the ngFor is a directive that helps us iterate over the dashboardItems array that we will define the gridster-layout.component.ts file.
Moving on, add some CSS values to the Gridster from grdister-layout.component.css file.
.toolbar {
 height: 100px;
 display: flex;
 } 
gridster {
 display: flex;
 height: calc(100vh — 115px);
 flex-direction: column;
 }
 If you run the app, nothing will load up inside the gridster item. It’s because we need to bring the default config and dashboardItems array from the Gridster Service Class. For that, we will be using Dependency Injection.
Dependency Injection is wired into the Angular that allows the components to use the services by injecting the class into the component’s constructor. 
Now, to do so we’ll go in the gridster-layout.component.ts and add the GridsterService in the constructor and initialize a local variable to hold the config and the dashboardItem array.
import { GridsterLayoutService } from 'src/app/services/gridster-layout.service';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
.
.
//Dependency Injection
constructor(private gridItemService: GridsterLayoutService, private cdRef : ChangeDetectorRef) { }


Recap: Lot to take in, so let’s see what we did so far. We created a Service Class and a Component to hold the dashboard. In the service class, we initialized default configuration for the dashboard and dashboardItems. In the component, we added the Gridster in the html and using dependency injection loaded the dashboardItems into the Dashboard. 
What Next: In the next steps, we will see how to load templates into the Dashboard dynamically with the help of Ng-TemplateOutlet and TemplateRef. 
# Step 4: Load Templates Dynamically using Ng-TempalteOutlet 
Now, we have our dashboard ready and we will use the Angular Directive feature ng-templateOutlet to render the components dynamically into the Gridster item.
Ng-Template: Ng-TemplateOutlet is part of angular feature which allows us to create reusable components by defining HTML templates with specific name and rendering it dynamically inside the Angular App.
Note: Rendering components dynamically directly into the Grid Layout is straight-forward using Ng-Component-Outlet or Dynamic Component Loader. Read the easy way here. The problem I’m addressing is to render the components with Data Bindings on them i.e., why we will be rendering components using Ng-templateOutlet.
For that, go to gridster-layout.component.html and create some templates shown below:

<ng-template #Map>
  <div class='card'>
    <p>
      I am a Map.
    </p>
  </div>
</ng-template>

<ng-template #Date>
  <div class='card'>
    <p>
      I am a Date.
    </p>
  </div>
</ng-template>
<ng-template #AverageResponse>
  <div class='card'>
    <p>
      I am a Average Response.
    </p>
  </div>
</ng-template>
On the same file, inside the <gridster-item> tag, include the line:
<gridster-item [item]=item>
  <h4>{{item.label}}</h4>
  <ng-container *ngTemplateOutlet= 'dummyTemplate'></ng-container>
</gridster-item>
All we are doing is telling the Angular which ng-template to load using the name of the template. Learn more about ng-template, ng-cotainer, ng-templateOutlet. 
We have to use ViewChild Decorator from Angular to create a Template Reference for the ng-templates inside the typescript file.
ViewChild: ViewChild Decorator grants us access to a child component, directive or a DOM element from a parent component class. ViewChild returns the first element that matches a given component, directive or template reference selector. The nice thing too is that, if the reference changes to a new element dynamically, ViewChild will take care of updating its reference.
On the starting of the same file create the ViewChild decorators:
export class GridsterLayoutComponent implements OnInit {
  @ViewChild('Map') mapTemplate: TemplateRef<any>;
  @ViewChild('Date') dateRangeTemplate: TemplateRef<any>;
  @ViewChild('Health') healthTemplate: TemplateRef<any>;
  @ViewChild('AverageResponse') averageResponseTemplate: TemplateRef<any>;
  @ViewChild('TotalResponse') responseTemplate: TemplateRef<any>;
  @ViewChild('TotalRequest') requestTemplate: TemplateRef<any>;
  @ViewChild('TotalError') totalErrorTemplate: TemplateRef<any>;
  public templates = [];

# Step 6: Create TemplateRef Array 
Once we have all the ViewChild decorators, we will store them onside an array which will help us load them into our dashboard using for loop. In the components file, gridster-layout.component.ts file, add the rest of the tempalteRef.
Intialize the templateRef array after the view gets initialized. 
ngAfterViewInit(): void{
this.templates = [this.mapTemplate, this.dateRangeTemplate, this.healthTemplate, this.averageResponseTemplate,this.responseTemplate, this.requestTemplate, this.totalErrorTemplate];} 
Finally, in the Component’s HTML file gridster-layout.component.html, just add these:
<gridster [options]="options" id='gridster'>
  <div *ngFor="let item of dashboardItems">
    <gridster-item [item]="item" *ngIf='item.display;'>
      <div class="item-buttons" *ngIf="clicked">
          <button class="btn" (click)=" unDisplayItem($event, item)"
            style="height: 30px;position: absolute; right: 0;">
            <img id='deleteicon' src="/assets/images/delete.png" height="20px">

          </button>
        </div>
        <ng-container [ngTemplateOutlet]="templates[item.selector]"></ng-container>
    </gridster-item>
  </div>

Fire up the app and congrats — you successfully created a customizable dashboard, but….it needs few twerking such as toggling Edit mode/View mode, persisting the state and drag/drop items onto the dashboard. 
 
Figure 1: View Mode
 
Figure 2: Edit Mode
For the scope of the article, I won’t be adding those twerks here, but feel free to be creative. 


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
