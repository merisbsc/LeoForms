import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyInventoryComponent } from './survey-inventory.component';

describe('SurveyInventoryComponent', () => {
  let component: SurveyInventoryComponent;
  let fixture: ComponentFixture<SurveyInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
