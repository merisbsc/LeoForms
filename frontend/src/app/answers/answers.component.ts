import { Component } from '@angular/core';
import {DataService} from "../data.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {AnswerModel} from "../model/answer.model";

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent {

  allAnswers: AnswerModel[] = [];

  constructor(public dataServ: DataService, private titleService: Title, private route: Router) {
    this.titleService.setTitle('ANSWERS');
  }

  ngOnInit(): void {
    this.dataServ.getAllAnswers().subscribe(answer => this.allAnswers = answer);
    console.log(this.allAnswers);
  }

}
