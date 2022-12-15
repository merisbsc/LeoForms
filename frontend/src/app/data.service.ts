import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TemplateModel} from "./model/template.model";
import {SurveyModel} from "./model/survey.model";


export interface GroupInterface {
  name: string;
  year: string;
  id: string;
}

export interface FormInterface {
  name: string;
  creationDate: string;
  markdown: string;
}

export interface GetFormInterface {
  markdown: string
}

export interface GetFieldNamesInterface {
  fieldnames: string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {


  readonly groups: GroupInterface[];
  readonly forms: FormInterface[];

  constructor(private http: HttpClient) {
    this.forms = [];
  }

  getGroups(): Observable<GroupInterface[]> {
    return this.http.get<GroupInterface[]>(`http://localhost:8080/groups`);
  }

  getTemplate(name: string): Observable<string> {
    return this.http.get('http://localhost:8080/template/' + name + '/markdown/name', {responseType: 'text'});
  }

  getAllTemplates(): Observable<TemplateModel[]> {
    return this.http.get<TemplateModel[]>('http://localhost:8080/template/');
  }

  getTemplateById(id: any): Observable<TemplateModel> {
    return this.http.get<TemplateModel>('http://localhost:8080/template/' + id);
  }


  deleteTemplateById(id: any): Observable<null> {
    return this.http.delete<null>('http://localhost:8080/template/' + id + '/template-id');
  }

  saveSurvey(): Observable<null> {

    const survey = {
      creationDate: "2022-09-07",
      endDate: "2022-09-07",
      template: {
        name: "NAME NAME OK NAME",
        creationDate: "2022-09-07",
        markdown: "string",
        description: "so a guade soch",
        fieldNames: [
          "string"
        ]
      }
    }

    return this.http.post<null>('', survey);
  }

  saveMd(nameForm: string, markdownString: string, descForm: string, fieldNames: string[]) {

    let datenow = new Date().toISOString().substring(0,10);
    console.log(datenow);

    const form = {
      name: nameForm,
      creationDate: datenow.toString(),
      markdown: markdownString,
      description: descForm,
      fieldNames: fieldNames
    };

    this.forms.push(form);

    this.http.post(`http://localhost:8080/template`, form).subscribe(value => {
        console.log(value);
      }
    );

  }

}
