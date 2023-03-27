import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TemplateModel } from './model/template.model';
import { SurveyModel } from './model/survey.model';
import {AnswerModel} from "./model/answer.model";

export interface FormInterface {
  name: string;
  creationDate: string;
  markdown: string;
}

export interface GroupInterface {
  name: string;
  year: string;
  id: string;
}

export interface UserData {
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  preferred_username: string;
  sub: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  groups?: GroupInterface[];
  readonly forms: FormInterface[];

  constructor(private http: HttpClient) {
    this.forms = [];
  }

  getAllTemplates(): Observable<TemplateModel[]> {
    console.log(this.http.get<TemplateModel[]>('http://localhost:8080/template/'));
    return this.http.get<TemplateModel[]>('http://localhost:8080/template/');
  }

  getAllSurveys(): Observable<SurveyModel[]> {
    console.log(this.http.get<SurveyModel[]>('http://localhost:8080/survey/'));
    return this.http.get<SurveyModel[]>('http://localhost:8080/survey/');
  }

  deleteTemplateById(id: any): Observable<null> {
    return this.http.delete<null>('http://localhost:8080/template/' + id + '/template-id');
  }

  getTemplateById(id: any): Observable<TemplateModel> {
    return this.http.get<TemplateModel>('http://localhost:8080/template/' + id);
  }

  getAllAnswers(): Observable<AnswerModel[]> {
    console.log(this.http.get<AnswerModel[]>('http://localhost:8080/answer'));
    return this.http.get<AnswerModel[]>('http://localhost:8080/answer');
  }

  saveMd(nameForm: string, markdownString: string, descForm: string, fieldNames: string[]) {

    let datenow = new Date().toISOString().substring(0, 10);
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

  getGroups(): Observable<GroupInterface[]> {
    return this.http.get<GroupInterface[]>(`http://localhost:8080/groups`);
  }

  saveSurvey(endDate: string, name: string, description: string, finalForm: string, templateId: number, groups: string[]) {



    const survey = {
      'creationDate': new Date().toISOString().substring(0, 10),
      'endDate': new Date(endDate).toISOString().substring(0, 10),
      'templateId': templateId,
      'status': 'CREATED',
      'name': name,
      'description': description,
      html: finalForm,
      // groups: this.groups!.filter(g => groups.includes(g.name))
    };

    this.http.post('http://localhost:8080/survey', survey).subscribe(value => {
        // console.log(value);
      }
    );
  }



}
