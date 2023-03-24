import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { SurveyInventoryComponent } from './survey-inventory/survey-inventory.component';
import { TemplateInventoryComponent } from './template-inventory/template-inventory.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: CreateTemplateComponent },
  { path: 'template_inv', component: TemplateInventoryComponent, canActivate: [ AuthGuard ] },
  { path: 'survey_inv', component: SurveyInventoryComponent, canActivate: [ AuthGuard ] },
  { path: 'cs/:id', component: CreateSurveyComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
