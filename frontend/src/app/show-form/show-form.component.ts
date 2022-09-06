import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';

import {MarkdownModule, MarkdownModuleConfig, MarkdownService, MarkedOptions, MarkedRenderer} from 'ngx-markdown';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, Title} from "@angular/platform-browser";

import {DataService, GetFieldNamesInterface, GetFormInterface} from '../data.service'
import {ActivatedRoute} from "@angular/router";
import {HtmlSanitizerPipe} from "../app.component";

declare function myMethod(): void;

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

    this.dataServ.getTemplate(this.formName).subscribe((value: any) => {
      this.dataSource = value;

      this.form = '<div ng-app="formApp" ng-controller="formController">' + this.dataSource + '</div>';


    });

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

    console.log("dkwadpkwa")
    let form = document.getElementById("daform");

    // @ts-ignore
    console.log(form);

  }
}
