import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Title } from '@angular/platform-browser';
import { SurveyModel } from '../model/survey.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-survey-inventory',
  templateUrl: './survey-inventory.component.html',
  styleUrls: [ './survey-inventory.component.css' ]
})
export class SurveyInventoryComponent implements OnInit {

  allSurveys: SurveyModel[] = [];

  constructor(public dataServ: DataService, private titleService: Title, private route: Router) {
    this.titleService.setTitle('SURVEY INVENTORY');
  }

  ngOnInit(): void {
    this.dataServ.getAllSurveys().subscribe(survey => this.allSurveys = survey);
    console.log(this.allSurveys);
  }

  seeAnswers() {
    this.route.navigate(["/answers"]);
  }

}
