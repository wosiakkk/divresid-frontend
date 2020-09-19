import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyRulesViewComponent } from './property-rules-view.component';

describe('PropertyRulesViewComponent', () => {
  let component: PropertyRulesViewComponent;
  let fixture: ComponentFixture<PropertyRulesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyRulesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyRulesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
