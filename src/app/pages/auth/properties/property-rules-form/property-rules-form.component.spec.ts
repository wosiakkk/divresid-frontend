import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyRulesFormComponent } from './property-rules-form.component';

describe('PropertyRulesFormComponent', () => {
  let component: PropertyRulesFormComponent;
  let fixture: ComponentFixture<PropertyRulesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyRulesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyRulesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
