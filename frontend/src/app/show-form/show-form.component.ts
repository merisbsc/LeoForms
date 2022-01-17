import { Component, OnInit } from '@angular/core';

import {MarkdownModule, MarkdownModuleConfig, MarkdownService, MarkedOptions, MarkedRenderer} from 'ngx-markdown';
import {HttpClient} from "@angular/common/http";
import {Title} from "@angular/platform-browser";

import {DataService, GetFormInterface} from '../data.service'
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.css']
})
export class ShowFormComponent implements OnInit {

  dataSource: GetFormInterface[];
  formId: number;
  formName: string;
  markdown = `## LeoForms hat __swag__!
---

### Mahlwächer
1. Ordered list
2. Another bullet point
   - Unordered list
   - Another unordered bullet
`;

  constructor(private markdownService: MarkdownService,
              private titleService:Title,
              public dataServ: DataService,
              public router :ActivatedRoute) {
    this.titleService.setTitle("SHOW LEO FORM");


   // this.dataSource = this.dataServ.mds;



  }


  get(): void {
    this.dataServ.getMds(this.formName).subscribe((value: any) => {
      this.dataSource = value;
      console.log(this.dataSource)
      console.log(this.dataSource[1].markdown)
      this.markdown = value;
    });
  }


  ngOnInit(): void {

    // MD TINGS

    this.markdownService.renderer.listitem = function (text) {
      debugger;
      if (/^\s*\[[x ]\]\s*/.test(text)) {

        text = text
          .replace(/^\s*\[ \]\s*/, '<input type="checkbox" checked="false"> ')
          .replace(/^\s*\[x\]\s*/, '<input type="checkbox" checked="true"> ');
        return '<li style="list-style: none">' + text + '</li>';
      } if (/^\s*\[[r ]\]\s*/.test(text)) {
        text = text
          .replace(/^\s*\[r\]\s*/, '<input type="radio"> ');
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

}
