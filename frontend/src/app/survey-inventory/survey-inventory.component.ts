import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {DataService} from "../data.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {TemplateModel} from "../model/template.model";
import {SurveyModel} from "../model/survey.model";

@Component({
  selector: 'app-survey-inventory',
  templateUrl: './survey-inventory.component.html',
  styleUrls: ['./survey-inventory.component.css']
})
export class SurveyInventoryComponent  {

  allSurveys: SurveyModel[] = [];

  constructor(public dataServ: DataService, private titleService:Title, private route: Router) {
    this.titleService.setTitle("SURVEY INVENTORY");
  }

  ngOnInit(): void {
    this.dataServ.getAllSurveys().subscribe(survey => this.allSurveys = survey)
    console.log(this.allSurveys)
  }

}
