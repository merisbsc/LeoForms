import { Injectable } from '@angular/core';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

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

}
