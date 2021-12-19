import {Component, OnInit, SecurityContext} from '@angular/core';

import {MarkdownModule, MarkdownModuleConfig, MarkdownService, MarkedOptions, MarkedRenderer} from 'ngx-markdown';
import {HttpClient} from "@angular/common/http";
import {Title} from "@angular/platform-browser";



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

  constructor(private markdownService: MarkdownService, private titleService:Title) {
    this.titleService.setTitle("NEW LEO FORM");
  }

  ngOnInit(): void {
    this.markdownService.renderer.listitem = function (text) {
      debugger;
      if (/^\s*\[[x ]\]\s*/.test(text)) {
        text = text
          .replace(/^\s*\[ \]\s*/, '<input type="checkbox" checked="false"> ')
          .replace(/^\s*\[x\]\s*/, '<input type="checkbox" checked="true"> ');
        return '<li style="list-style: none">' + text + '</li>';
      } if (/^\s*\[(x )\]\s*/.test(text)) {
        text = text
          .replace(/^\s*\( \)\s*/, '<input type="radio" value="HTML"> ')
          .replace(/^\s*\(x\)\s*/, '<input type="radio" value="HTML"> ');
        return '<li style="list-style: none">' + text + '</li>';
      }else {
        return '<li>' + text + '</li>';
      }
    };





  }

}



