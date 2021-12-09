import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginPageComponent} from "./login-page/login-page.component";
import { Routes, RouterModule } from '@angular/router';
import {NewFormComponent} from "./new-form/new-form.component";
import {ChipsAutocompleteComponent} from "./chips-autocomplete/chips-autocomplete.component";

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'new', component: NewFormComponent },
  { path: 'in', component: ChipsAutocompleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
