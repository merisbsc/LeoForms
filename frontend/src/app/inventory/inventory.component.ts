import { Component, OnInit } from '@angular/core';
import {DataService, GetFormInterface} from "../data.service";
import {TemplateModel} from "../model/template.model";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  formName: string;
  dataSource: GetFormInterface[];
  form = "";

  allTemplates: TemplateModel[] = [];

  constructor(public dataServ: DataService, private titleService:Title,) {
    this.titleService.setTitle("INVENTORY");
  }

  ngOnInit(): void {
    this.dataServ.getAllTemplates().subscribe(template => this.allTemplates = template)
    console.log(this.allTemplates)
  }

  get(): void {

    this.dataServ.getTemplate(this.formName).subscribe((value: any) => {
      this.dataSource = value;

      this.form = '<div ng-app="formApp" ng-controller="formController">' + this.dataSource + '</div>';
    });

    /*
    this.dataServ.getFieldNames(this.formName).subscribe((value: any) => {
      console.log(value);
    });
    */

  }

}
