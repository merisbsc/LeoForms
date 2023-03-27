import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { SurveyInventoryComponent } from './survey-inventory/survey-inventory.component';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { TemplateInventoryComponent } from './template-inventory/template-inventory.component';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { MatMenuModule } from '@angular/material/menu';
import { AnswersComponent } from './answers/answers.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CreateSurveyComponent,
    CreateTemplateComponent,
    SurveyInventoryComponent,
    TemplateInventoryComponent,
    AnswersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MarkdownModule,
    MatInputModule,
    FormsModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
          smartLists: true, // enable smartLists
          smartypants: false
        }
      },
      sanitize: SecurityContext.NONE // disable sanitization
    }),
    AuthModule.forRoot({
      config: {
        authority: 'https://auth.htl-leonding.ac.at/realms/htlleonding',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'htlleonding',
        scope: 'openid profile email offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug
      }
    }),
    MatMenuModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
