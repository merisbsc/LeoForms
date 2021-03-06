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
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  evaluateFields: string[] = [];
  allFruits: string[] = [];
  formName: string;
  // @ts-ignore
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
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

### Fach Wählen
| Recht |
| -----------  |
| Wirtschaft |
| Chemie |
`;

  constructor(private markdownService: MarkdownService, private titleService:Title, public dataServ: DataService) {
    this.titleService.setTitle("NEW LEO FORM");

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );



    this.dataSource = this.dataServ.groups;

    this.dataServ.getGroups().subscribe((value: any) => {
      this.dataSource = value;
      // @ts-ignore
      let i = 0;
      this.dataSource.forEach(item => {
        // @ts-ignore
        // @ts-ignore
        this.allFruits.push(this.dataSource[i].name)
        i++;
      });

    });

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
      } if (/^\s*\[[t ]\]\s*/.test(text)) {
        text = text
          .replace(/^\s*\[[t ]\]\s*/, '<input type="text"> ');
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


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  testMd(markdown: string) {
    if (/^\s*\[[x ]\]\s*/.test(markdown)) {
      console.log(/^\s*\[[x ]\]\s*/.test(markdown))
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  sendForm() {

    // @ts-ignore
    let inputElement = "<form>" + document.getElementsByClassName("variable-binding").item(0).innerHTML + "</form>";
    console.log(inputElement);
    let fieldNames = inputElement.toString().match(/(?<=name=")[A-z]+(?=")/g);
    //console.log(fieldNames);



    // @ts-ignore
    this.dataServ.saveMd(this.formName, inputElement, fieldNames)

    this.markdown = "";
    this.formName = "";

  }

  getHTMLValue() {
    const inputElement = document.getElementsByClassName("boxerl");

    console.log(inputElement.item(0))
    console.log(inputElement.item(1))
    console.log(inputElement.item(2))
    console.log(inputElement.length)

    // @ts-ignore
    let inputElement2 = document.getElementsByClassName("variable-binding").item(0).innerHTML;
    console.log(inputElement2);
    let fieldNames = inputElement2.toString().match(/(?<=name=")[A-z]+(?=")/g);
    console.log(fieldNames);
  }

}



