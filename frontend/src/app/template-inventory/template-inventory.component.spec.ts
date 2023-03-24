import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateInventoryComponent } from './template-inventory.component';

describe('TemplateInventoryComponent', () => {
  let component: TemplateInventoryComponent;
  let fixture: ComponentFixture<TemplateInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
