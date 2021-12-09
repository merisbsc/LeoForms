import {Component, OnInit, SecurityContext} from '@angular/core';

import {MarkdownModule, MarkdownModuleConfig, MarkdownService, MarkedOptions, MarkedRenderer} from 'ngx-markdown';
import {HttpClient} from "@angular/common/http";



@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css']
})
export class NewFormComponent implements OnInit {


  title = 'LeoFormsfe';

  markdown = `## LeoForms hat __swag__!
---

### Wahlfächer
1. Ordered list
2. Another bullet point
   - Unordered list
   - Another unordered bullet
`;

  constructor(private markdownService: MarkdownService) { }

  ngOnInit(): void {
    this.markdownService.renderer.heading = (text: string, level: 4) => {
      const escapedText = text.toLowerCase().replace(/\S[.[\w]]/g, '-');
      return '<div>\n' +
        '    <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter">\n' +
        '    <label for="subscribeNews">Subscribe to newsletter?</label>\n' +
        '  </div>';
    };



  }

}



