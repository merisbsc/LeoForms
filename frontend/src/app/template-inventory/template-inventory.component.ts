import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {TemplateModel} from "../model/template.model";
import {DataService} from "../data.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-template-inventory',
  templateUrl: './template-inventory.component.html',
  styleUrls: ['./template-inventory.component.css']
})
export class TemplateInventoryComponent {

  form = "";

  allTemplates: TemplateModel[] = [];

  constructor(public dataServ: DataService, private titleService:Title, private route: Router) {
    this.titleService.setTitle("TEMPLATE INVENTORY");
  }

  ngOnInit(): void {
    this.dataServ.getAllTemplates().subscribe(template => this.allTemplates = template)
    console.log(this.allTemplates)
  }

  loadAll() {
    this.dataServ.getAllTemplates().subscribe(template => this.allTemplates = template)
  }

  createSurvey(id: any) {
    console.log(id)
    this.route.navigate(["/cs/" + id]);
  }

  deleteTemplate(id: any) {
    this.dataServ.deleteTemplateById(id).subscribe( () => {
      this.dataServ.getAllTemplates().subscribe(template => this.allTemplates = template)
    });
  }
}
