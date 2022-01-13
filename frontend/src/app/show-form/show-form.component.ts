import { Component, OnInit } from '@angular/core';

import {MarkdownModule, MarkdownModuleConfig, MarkdownService, MarkedOptions, MarkedRenderer} from 'ngx-markdown';
import {HttpClient} from "@angular/common/http";
import {Title} from "@angular/platform-browser";

import {DataService, GetFormInterface} from '../data.service'

@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.css']
})
export class ShowFormComponent implements OnInit {

  dataSource: GetFormInterface[];

  markdown = `## LeoForms hat __swag__!
---

### Mahlwächer
1. Ordered list
2. Another bullet point
   - Unordered list
   - Another unordered bullet
`;

  constructor(private markdownService: MarkdownService, private titleService:Title, public dataServ: DataService) {
    this.titleService.setTitle("SHOW LEO FORM");


   // this.dataSource = this.dataServ.mds;

    this.dataServ.getMds().subscribe((value: any) => {
      this.dataSource = value;
      console.log(this.dataSource)
      console.log(this.dataSource[1].markdown)
      this.markdown = value;
    });

  }



  ngOnInit(): void {
  }

}
