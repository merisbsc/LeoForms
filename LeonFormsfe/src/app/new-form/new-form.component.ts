import {Component, ElementRef, OnInit, SecurityContext, ViewChild} from '@angular/core';

import {MarkdownModule, MarkdownModuleConfig, MarkdownService, MarkedOptions, MarkedRenderer} from 'ngx-markdown';
import {HttpClient} from "@angular/common/http";
import {Title} from "@angular/platform-browser";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";



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
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;


  title = 'LeoFormsfe';

  markdown = `## LeoForms hat __swag__!
---

### Wahlfächer
1. Ordered list
2. Another bullet point
   - Unordered list
   - Another unordered bullet
`;

  constructor(private markdownService: MarkdownService, private titleService:Title) {
    this.titleService.setTitle("NEW LEO FORM");

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );

  }

  ngOnInit(): void {
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

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }



}



