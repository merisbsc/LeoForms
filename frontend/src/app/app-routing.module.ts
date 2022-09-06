import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginPageComponent} from "./login-page/login-page.component";
import { Routes, RouterModule } from '@angular/router';
import {NewFormComponent} from "./new-form/new-form.component";
import {ShowFormComponent} from "./show-form/show-form.component";
import {InventoryComponent} from "./inventory/inventory.component";
import {SurveysComponent} from "./surveys/surveys.component";
import {CreateSurveyComponent} from "./create-survey/create-survey.component";

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'new', component: NewFormComponent },
  { path: 'show/:name', component: ShowFormComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'surveys', component: SurveysComponent },
  { path: 'cs/:name', component: CreateSurveyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
