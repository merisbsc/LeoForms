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
  markdown = `## LeoForms hat __swag__!
---

### Mahlwächer
1. Ordered list
2. Another bullet point
   - Unordered list
   - Another unordered bullet
`;
  form = "";
  formData: any;
  formData_test1: any;

  constructor(private markdownService: MarkdownService,
              private titleService:Title,
              public dataServ: DataService,
              public dataServFields: DataService,
              public router :ActivatedRoute) {
    this.titleService.setTitle("SHOW LEO FORM");


   // this.dataSource = this.dataServ.mds;
  }

  transform(value: any, ...args: any[]) {
        throw new Error('Method not implemented.');
    }


  get(): void {

    this.dataServ.getMds(this.formName).subscribe((value: any) => {
      this.dataSource = value;
      console.log(this.dataSource)
      console.log('<div ng-app="formApp" ng-controller="formController">' + this.dataSource + '</div>')
      // @ts-ignore
      //document.getElementsByClassName("htmlLoad").item(0).innerHTML = this.dataSource;
      this.form = '<div ng-app="formApp" ng-controller="formController">' + this.dataSource + '</div>';
    });


    this.dataServ.getFieldNames().subscribe((value: any) => {
      console.log(this.dataSource)
    })
  }


  ngOnInit(): void {

    this.markdownService.renderer.listitem = function (text) {
      debugger;
      if (/^\s*\[[x ]\]\s*/.test(text)) {

        text = text
          .replace(/^\s*\[ \] \s*/, '<input type="checkbox" checked="true"  name=" ' + text + '"> ')
          .replace(/^\s*\[x\] \s*/, '<input type="checkbox" checked="false"  name="checkboxInput"> ');
        return '<li style="list-style: none">' + text + '</li>';
      } if (/^\s*\[[r ]\]\s*/.test(text)) {
        text = text
          .replace(/^\s*\[r\]\s*/, '<input type="radio" name="radioInput">');
        return '<li style="list-style: none">' + text + '</li>';
      } if (/^\s*\[[d ]\]\s*/.test(text)) {
        text = text
          .replace(/^\s*\[[d ]\]\s*/, '<option> ' +text + '</option>>');
        return '<select>' + text + '</select>';
      } else {
        return '<li>' + text + '</li>';
      }
    };


    this.markdownService.renderer.table = function (header, body) {
      if (body) body = '<option>' + body + '</option>';

      return '<select>\n'
        + '<option>\n'
        + header
        + '</option>\n'
        + body
        + '</select>\n';
    };


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
    if (document.querySelectorAll('input[name="check"]') != null) {
      let checkboxes = document.querySelectorAll('input[name="check"]') as NodeListOf<HTMLInputElement>
      checkboxes.forEach(c => console.log(c.checked))
    }

    this.dataServFields.getFieldNames().subscribe(value => {
      let string = value.substring(2, value.length-2)
      let array = value.split('","');


      console.log(array)

    });

  }




}
