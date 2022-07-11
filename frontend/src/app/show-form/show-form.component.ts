import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';

import {MarkdownModule, MarkdownModuleConfig, MarkdownService, MarkedOptions, MarkedRenderer} from 'ngx-markdown';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, Title} from "@angular/platform-browser";

import {DataService, GetFieldNamesInterface, GetFormInterface} from '../data.service'
import {ActivatedRoute} from "@angular/router";
import {HtmlSanitizerPipe} from "../app.component";


@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.css']
})
export class ShowFormComponent implements OnInit, PipeTransform {

  dataSource: GetFormInterface[];
  dataSourceFields: GetFieldNamesInterface[];
  formId: number;
  formName: string;
  safeHtml: HtmlSanitizerPipe;
  fieldNames: any;

  form = "";
  formData: any;
  formData_test1: any;

  constructor(private markdownService: MarkdownService,
              private titleService:Title,
              public dataServ: DataService,
              public dataServFields: DataService,
              public router :ActivatedRoute) {
    this.titleService.setTitle("SHOW LEO FORM");
  }

  transform(value: any, ...args: any[]) {
        throw new Error('Method not implemented.');
    }


  get(): void {

    this.dataServ.getMds(this.formName).subscribe((value: any) => {
      this.dataSource = value;
      //console.log(this.dataSource)
      //console.log('<div ng-app="formApp" ng-controller="formController">' + this.dataSource + '</div>')
      // @ts-ignore
      //document.getElementsByClassName("htmlLoad").item(0).innerHTML = this.dataSource;
      this.form = '<div ng-app="formApp" ng-controller="formController">' + this.dataSource + '</div>';
    });

    /*
    this.dataServ.getFieldNames(this.formName).subscribe((value: any) => {
      console.log(value);
    });
    */

  }


  ngOnInit(): void {
    // ROUTER TINGS
    console.log(this.router.snapshot.params);

    if (this.formName === "blank") {
      console.log("STANDARD");
    } else {
      this.formName = this.router.snapshot.params.name;
      this.get();
    }
  }

  submit() {

    this.dataServFields.getFieldNames(this.formName).subscribe(value => {
      let string = value.substring(3, value.length-3)
      this.fieldNames = string.split('","');
    });

    for (let i = 0; i < this.fieldNames.length; i++) {
      if (this.fieldNames[i] === this.fieldNames[i + 1]) {
        console.log("Radio: " + this.fieldNames[i]);
      } else {
        console.log("Checkbox / Dd: " + this.fieldNames[i]);
      }
    }


    for (let i = 0; i < this.fieldNames?.length; i++) {
      let currentField = this.fieldNames[i];
      //console.log(currentField);
      if (document.querySelectorAll('input[name="' + this.fieldNames[i] + '"]') != null) {
        let checkboxes = document.querySelectorAll('input[name="' + this.fieldNames[i] + '"]') as NodeListOf<HTMLInputElement>
        checkboxes.forEach(c => console.log(this.fieldNames[i] + ': ' +c.checked))
      }
    }
    console.log("-------------------------------")


    //let obst = document.getElementsByName("obst")
    let obst = document.querySelectorAll('input[name="obst"]') as NodeListOf<HTMLInputElement>
    for (let i = 0; i < obst.length; i++) {
      if (obst[i].checked) {
        console.log(this.fieldNames[i] + ": " + obst[i].value)
      }
    }
    console.log("-------------------------------")

  }




}
