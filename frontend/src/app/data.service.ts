import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


export interface GroupInterface {
  name: string;
  year: string;
  id: string;
}

export interface FormInterface {
  idF: string;
  nameF: string;
  creationDate: string;
  markdown: string;
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


  saveMd(nameForm: string, markdownString: string) {

    const form = {
      idF: 'bfds',
      nameF: nameForm,
      creationDate: '12-12-2021',
      markdown: markdownString
    };

    this.forms.push(form);

    this.http.post(`http://localhost:8080/questionnaire`, form).subscribe(value => {
        console.log(value);
      }
    );

  }


}
