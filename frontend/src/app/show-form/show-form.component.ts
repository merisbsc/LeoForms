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
    //console.log(this.router.snapshot.params);

    if (this.formName === "blank") {
      //console.log("STANDARD");
    } else {
      this.formName = this.router.snapshot.params.name;
      this.get();
    }
  }

  submit() {

    let obj = document.forms.item(0);
    //console.log(obj?.childNodes);

    /*
    if (obj !== null) {
    for (let i = 0; i < obj.childNodes.length; i++) {
      //console.log(obj.childNodes[i].nodeName);
      if ( obj.childNodes[i].nodeName === "UL") {
        let ul = obj.childNodes[i]
        //console.log(ul.childNodes)
        for (let j = 0; j < ul.childNodes.length; j++) {
          if (ul.childNodes[j].nodeName === "LI") {
            //console.log(ul.childNodes[j].childNodes.item(0))
            let u2 = ul.childNodes[j].childNodes.item(0);
            console.log(u2);
          }
        }
      }
    } }
    */

    this.dataServFields.getFieldNames(this.formName).subscribe(value => {
      let string = value.substring(3, value.length-3)
      this.fieldNames = string.split('","');
    });


    for (let i = 0; i < this.fieldNames?.length; i++) {
      let currentField = this.fieldNames[i];
      //console.log(currentField);
      if (document.querySelectorAll('input[name="' + this.fieldNames[i] + '"]') != null) {
        let checkboxes = document.querySelectorAll('input[name="' + this.fieldNames[i] + '"]') as NodeListOf<HTMLInputElement>
        checkboxes.forEach(c => console.log(this.fieldNames[i] + ': ' + c.checked))
      }
    }
    console.log("-------------------------------")





  }




}
