import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


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

const BASE_URL: string = 'http://localhost:8080/api'


@Injectable({
  providedIn: 'root'
})
export class DataService {


  readonly groups: GroupInterface[];
  readonly forms: FormInterface[];
  readonly mds: GetFormInterface[];

  constructor(private http: HttpClient) {
    this.forms = [];
  }


  // @ts-ignore
  getItems(markdown): Observable<String> {
    return markdown;
  }


  getGroups(): Observable<GroupInterface[]> {
    //console.log(this.http.get<GroupInterface[]>(`http://localhost:8080/groups`));
    return this.http.get<GroupInterface[]>(`http://localhost:8080/groups`);
  }


  getMds(name: string): Observable<string> {
    //console.log(this.http.get<GetFormInterface[]>('http://localhost:8080/questionnaire/' + name + '/markdown/name'));
    return this.http.get('http://localhost:8080/questionnaire/' + name + '/markdown/name', {responseType: 'text'});
  }

  getFieldNames(name: string): Observable<string> {
    //console.log(this.http.get<GetFieldNamesInterface[]>('http://localhost:8080/questionnaire/' + name + '/fieldnames'))
    return this.http.get('http://localhost:8080/questionnaire/' + name + '/fieldnames', {responseType: 'text'});
  }


  saveMd(nameForm: string, markdownString: string, fieldNames: string[]) {

    const form = {
      name: nameForm,
      creationDate: '2021-12-12',
      markdown: markdownString,
      fieldNames: fieldNames
    };

    this.forms.push(form);

    this.http.post(`http://localhost:8080/questionnaire`, form).subscribe(value => {
        console.log(value);
      }
    );

  }

}
