import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {TemplateModel} from "../model/template.model";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService, GroupInterface} from "../data.service";
import {MarkdownService} from "ngx-markdown";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  groupControl = new FormControl();
  filteredGroups: Observable<string[]>;
  groups: string[] = [];
  evaluateFields: string[] = [];
  allGroups: string[] = [];
  dataSource: GroupInterface[] | undefined;
  // @ts-ignore
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  todayDate:Date = new Date();

  constructor(public router :ActivatedRoute,
              public dataServ: DataService,
              private markdownService: MarkdownService,
              private route: Router) {

    this.filteredGroups = this.groupControl.valueChanges.pipe(
      startWith(null),
      map((group: string | null) => (group ? this._filter(group) : this.allGroups.slice())),
    );

    this.dataSource = this.dataServ.groups;

    this.dataServ.getGroups().subscribe((value: any) => {
      this.dataSource = value;
      // @ts-ignore
      let i = 0;
      this.dataSource?.forEach(item => {
        // @ts-ignore
        this.allGroups.push(this.dataSource[i].name)
        i++;
      });

    });

  }

  templateId: any;
  singleTemplate: TemplateModel | undefined;
  form = "";
  formName: any;
  markdown: any;
  formDesc: any;
  endDate?: Date;

  ngOnInit(): void {

    this.templateId = this.router.snapshot.params['id'];

    this.dataServ.getTemplateById(this.templateId).subscribe(template => this.singleTemplate = template)
    this.dataServ.getTemplateById(this.templateId).subscribe(template => this.markdown = template.markdown)
    this.dataServ.getTemplateById(this.templateId).subscribe(template => this.formName = template.name)
    this.dataServ.getTemplateById(this.templateId).subscribe(template => this.formDesc = template.description)


    console.log(this.markdown)

    this.markdownService.renderer.listitem = function (text ) {
      let fieldName;
      if (/\[x\]\s*/.test(text)) {
        fieldName = text.substring(3, text.length);
        text = text
          .replace(/\[x\]\s*/, '<input type="checkbox" class="boxerl" style="list-style: none" ' +
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
          .replace(/\[r:.{1,}\]\s/gi, '<input type="radio" name="'+ name + '" value="'+ text.substring(9) + '"> ');
        return '<li style="list-style: none">' + text + '</li>';
      } if (/^\s*\[[d ]\]\s*/.test(text)) {
        text = text
          .replace(/^\s*\[[d ]\]\s*/, '<option> ' +text + '</option>>');
        return '<select>' + text + '</select>';
      } if (/\[t:.{1,}\]/gi.test(text)) {
        var name = text.substring(
          text.indexOf(":") + 1,
          text.lastIndexOf("]")
        );
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
      console.log(fieldName);
      return '<select name="' + fieldName + '">\n'
        + '<option disabled selected hidden>\n'
        + header + 'wählen...'
        + '</option>\n'
        + newBody
        + '</select>\n';
    };

  }

  saveSurvey() {
    // @ts-ignore
    let inputElement = "<form id='daform'>" + document.getElementsByClassName("variable-binding").item(0).innerHTML + '<button onclick="submitData()">Serialize form values</button></form>';

    let finalForm = '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>\n' +
      "<script>function submitData() {\n" +
      "    var data = $(\"form\").serialize();\n" +
      "    console.log(data);\n" +
      "    alert(data);\n" +
      "    $.ajax({\n" +
      "        type: 'POST',\n" +
      "        url: 'http://localhost:8080/answer',\n" +
      "        dataType: 'json',\n" +
      "        contentType: 'application/json; charset=utf-8',\n" +
      "        data: JSON.stringify(data),\n" +
      "        success: function (result) {\n" +
      "            console.log('Data received: ');\n" +
      "            console.log(result);\n" +
      "        }\n" +
      "    })\n" +
      "}" +
      '</script>' +
      '<div id="formNameDiv"><h1 id="formName">' + this.formName + '</h1></div>' + inputElement;
    //console.log(finalForm);


    // @ts-ignore
    let date = this.endDate?.getFullYear() + "-" + (this.endDate?.getMonth().valueOf() + 1) + "-" + this.endDate?.getDate();

    // @ts-ignore
    this.dataServ.saveSurvey(date, this.formName, this.formDesc, finalForm, this.templateId);

    console.log(finalForm);

    this.markdown = "";
    this.formName = "";
    this.formDesc = "";
    //this.route.navigate(["/survey_inv"]);

  }


  // CHIP GROUP SELECT
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allGroups.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.groups.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.groupControl.setValue(null);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.groups.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.groupControl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.groups.indexOf(fruit);

    if (index >= 0) {
      this.groups.splice(index, 1);
    }
  }

  showDate() {
    // @ts-ignore
    //console.log(this.endDate?.getDate() + "-" + (this.endDate?.getMonth().valueOf() + 1) + "-" + this.endDate?.getFullYear());
    console.log(this.formName + " - " + this.formDesc)
  }
}
