import {NgModule, SecurityContext} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MarkdownModule, MarkedOptions, MarkdownService, MarkedRenderer, MarkdownModuleConfig} from 'ngx-markdown';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from '@angular/material/toolbar';


import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import {NewFormComponent} from './new-form/new-form.component';
import { ChipsAutocompleteComponent } from './chips-autocomplete/chips-autocomplete.component';

// MAT CHIP INPUT IMPORTS
import {MaterialExampleModule} from '../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import marked from 'marked';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NewFormComponent,
    ChipsAutocompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
          smartLists: true, // enable smartLists
          smartypants: false,
        },
      },
      sanitize: SecurityContext.NONE // disable sanitization
    }),
    MatButtonModule,
    MatToolbarModule,
    AppRoutingModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    HttpClientModule,
    MaterialExampleModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent, ChipsAutocompleteComponent]
})
export class AppModule { }


/*
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };


  renderer.heading = (text: string, level: 4) => {
    const escapedText = text.toLowerCase().replace(/\[x\]/g, '-');
    console.log(escapedText)
    return '<div>\n' +
      '    <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter">\n' +
      '    <label for="subscribeNews"> ' + escapedText + '</label>\n' +
      '  </div>';
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  };
}
*/


