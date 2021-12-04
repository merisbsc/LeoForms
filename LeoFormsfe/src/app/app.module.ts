import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MarkdownModule, MarkedOptions, MarkdownService } from 'ngx-markdown';

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
import { NewFormComponent } from './new-form/new-form.component';
import { ChipsAutocompleteComponent } from './chips-autocomplete/chips-autocomplete.component';

// MAT CHIP INPUT IMPORTS
import {MaterialExampleModule} from '../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";


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
    MarkdownModule.forRoot(),
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
    MaterialExampleModule
  ],
  providers: [],
  bootstrap: [AppComponent, ChipsAutocompleteComponent]
})
export class AppModule { }
