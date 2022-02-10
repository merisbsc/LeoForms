import { Component } from '@angular/core';

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml'
})
export class HtmlSanitizerPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LeoFormsfe';

  markdown = `## LeoForms hat __swag__!
---

### Wahlfächer
1. Ordered list
2. Another bullet point
   - Unordered list
   - Another unordered bullet
`;


}
