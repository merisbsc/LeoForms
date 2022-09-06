import { Component, OnInit } from '@angular/core';
import {DataService, GetFormInterface} from "../data.service";
import {TemplateModel} from "../model/template.model";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

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

  constructor(public dataServ: DataService, private titleService:Title, private route: Router) {
    this.titleService.setTitle("INVENTORY");
  }

  ngOnInit(): void {
    this.dataServ.getAllTemplates().subscribe(template => this.allTemplates = template)
    console.log(this.allTemplates)
  }

  createSurvey() {
    this.route.navigate(["/cs"])
  }
}
