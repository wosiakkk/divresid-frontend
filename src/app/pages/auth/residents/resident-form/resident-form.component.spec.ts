import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentFormComponent } from './resident-form.component';

describe('ResidentFormComponent', () => {
  let component: ResidentFormComponent;
  let fixture: ComponentFixture<ResidentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
