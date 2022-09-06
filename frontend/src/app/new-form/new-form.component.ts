import {Component, ElementRef, OnInit, SecurityContext, ViewChild} from '@angular/core';

import {MarkdownModule, MarkdownModuleConfig, MarkdownService, MarkedOptions, MarkedRenderer} from 'ngx-markdown';
import {HttpClient} from "@angular/common/http";
import {Title} from "@angular/platform-browser";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith, window} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

import {DataService, GroupInterface} from '../data.service'


@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css']
})
export class NewFormComponent implements OnInit {

  // CHIPS FIELDS
  separatorKeysCodes: number[] = [ENTER, COMMA];
  evaluateFields: string[] = [];
  formName: string;
  formDesc: string;
  // @ts-ignore
  dataSource: GroupInterface[];

  title = 'LeoFormsfe';

  markdown = `### Choose one
-  [r:obst] Apfel
-  [r:obst] Birne
-  [r:obst] Schoko

### Choose Multiple
-  [x] Mathe
-  [x] Deutsch
-  [x] Englisch

### Write Text
-  [t:spitzname]

### Dropdown
| Recht |
| -----------  |
| Wirtschaft |
| Chemie |
`;

  constructor(private markdownService: MarkdownService, private titleService:Title, public dataServ: DataService) {
    this.titleService.setTitle("Create Template");

    this.dataSource = this.dataServ.groups;

  }

  ngOnInit(): void {

    this.markdownService.renderer.listitem = function (text, ) {
      let fieldName;
      if (/^\s*\[[x ]\]\s*/.test(text)) {
        fieldName = text.substring(5, text.length);
        text = text
          .replace(/^\s*\[[x ]\]\s*/, '<input type="checkbox" class="boxerl" style="list-style: none" ' +
            //'checked="false" ' +
            'name="' +
             fieldName + '" ' +
            '> ');
        return '<li style="list-style: none">' + text + '</li>';
      } if (/\[r:.{1,}\]\s/gi.test(text)) {
        //console.log(text)
        var name = text.substring(
          text.indexOf(":") + 1,
          text.lastIndexOf("]")
        );        text = text
          .replace(/\[r:.{1,}\]\s/gi, '<input type="radio" name="'+ name + '" value="'+ text.substring(10) + '"> ');
        return '<li style="list-style: none">' + text.substring(1) + '</li>';
      } if (/^\s*\[[d ]\]\s*/.test(text)) {
        text = text
          .replace(/^\s*\[[d ]\]\s*/, '<option> ' +text + '</option>>');
        return '<select>' + text + '</select>';
      } if (/\[t:.{1,}\]/gi.test(text)) {
        var name = text.substring(
          text.indexOf(":") + 1,
          text.lastIndexOf("]")
        );
        console.log(name);
        text = text
          .replace(/\[t:.{1,}\]/gi, '<input type="text" name="' + name + '"> ');
        return '<li style="list-style: none">' + text + '</li>';
      } else {
        return '<li>' + text + '</li>';
      }
    };

    this.markdownService.renderer.table = function (header, body) {
      let newBody = body.replace(/td/gi, 'option');
      //console.log(header.substring(9, header.length - 12));
      let fieldName = header.substring(9, header.length - 12);

      return '<select name="' + fieldName + '">\n'
        + '<option>\n'
        + header
        + '</option>\n'
        + newBody
        + '</select>\n';
    };

  }

  testMd(markdown: string) {
    if (/^\s*\[[x ]\]\s*/.test(markdown)) {
      console.log(/^\s*\[[x ]\]\s*/.test(markdown))
    }
  }

  sendForm() {
    let fieldNames = ["figojdagf", "gdsagfdsg"];
    // @ts-ignore
    this.dataServ.saveMd(this.formName, this.markdown, this.formDesc, fieldNames)

    this.markdown = "";
    this.formName = "";
    this.formDesc = "";
  }

  getHTMLValue() {
    const inputElement = document.getElementsByClassName("boxerl");
    // @ts-ignore
    let inputElement2 = document.getElementsByClassName("variable-binding").item(0).innerHTML;
    let fieldNames = inputElement2.toString().match(/(?<=name=")[A-z]+(?=")/g);
  }

}
