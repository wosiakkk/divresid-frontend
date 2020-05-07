import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempProfileComponent } from './temp-profile.component';

describe('TempProfileComponent', () => {
  let component: TempProfileComponent;
  let fixture: ComponentFixture<TempProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
