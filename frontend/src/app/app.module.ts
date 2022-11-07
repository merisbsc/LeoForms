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
import { ShowFormComponent } from './show-form/show-form.component';
import { InventoryComponent } from './inventory/inventory.component';
import {HtmlSanitizerPipe} from "./app.component";
import { SanitizehtmlPipe } from './sanitizehtml.pipe';
import { SurveysComponent } from './surveys/surveys.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NewFormComponent,
    ShowFormComponent,
    InventoryComponent,
    HtmlSanitizerPipe,
    SanitizehtmlPipe,
    SurveysComponent,
    CreateSurveyComponent
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
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }




