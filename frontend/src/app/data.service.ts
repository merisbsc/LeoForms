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

  constructor(private http: HttpClient) {
    this.forms = [];
  }

  getGroups(): Observable<GroupInterface[]> {
    return this.http.get<GroupInterface[]>(`http://localhost:8080/groups`);
  }


  getMds(name: string): Observable<string> {
    //console.log(this.http.get<GetFormInterface[]>('http://localhost:8080/questionnaire/' + name + '/markdown/name'));
    return this.http.get('http://localhost:8080/template/' + name + '/markdown/name', {responseType: 'text'});
  }


  saveMd(nameForm: string, markdownString: string, fieldNames: string[]) {

    let datenow = new Date().toISOString().substring(0,10);
    console.log(datenow);

    const form = {
      name: nameForm,
      creationDate: datenow.toString(),
      markdown: markdownString,
      fieldNames: fieldNames
    };

    this.forms.push(form);

    this.http.post(`http://localhost:8080/template`, form).subscribe(value => {
        console.log(value);
      }
    );

  }

}
