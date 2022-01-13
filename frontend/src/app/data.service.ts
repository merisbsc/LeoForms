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

  markdown = `## LeoForms hat __swag__!
---

### Wahlfächer
1. Ordered list
2. Another bullet point
   - Unordered list
   - Another unordered bullet
`;

  // @ts-ignore
  getItems(markdown): Observable<String> {
    return markdown;
  }


  getGroups(): Observable<GroupInterface[]> {
    console.log(this.http.get<GroupInterface[]>(`http://localhost:8080/groups`));
    return this.http.get<GroupInterface[]>(`http://localhost:8080/groups`);
  }


  getMds(): Observable<string> {
    console.log(this.http.get<GetFormInterface[]>('http://localhost:8080/questionnaire/xdfcgvh/markdown/name'));
    return this.http.get('http://localhost:8080/questionnaire/xdfcgvh/markdown/name', {responseType: 'text'});
  }


  saveMd(nameForm: string, markdownString: string) {

    const form = {
      name: nameForm,
      creationDate: '2021-12-12',
      markdown: markdownString
    };

    this.forms.push(form);

    this.http.post(`http://localhost:8080/questionnaire`, form).subscribe(value => {
        console.log(value);
      }
    );

  }


}
