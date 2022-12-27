import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ShowFormComponent} from "./show-form/show-form.component";
import {TemplateInventoryComponent} from "./template-inventory/template-inventory.component";
import {SurveyInventoryComponent} from "./survey-inventory/survey-inventory.component";
import {CreateSurveyComponent} from "./create-survey/create-survey.component";
import {CreateTemplateComponent} from "./create-template/create-template.component";

const routes: Routes = [
  { path: '', component: CreateTemplateComponent },
  { path: 'template_inv', component: TemplateInventoryComponent },
  { path: 'survey_inv', component: SurveyInventoryComponent },
  { path: 'cs/:id', component: CreateSurveyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
