import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempHomeComponent } from './temp-home.component';

describe('TempHomeComponent', () => {
  let component: TempHomeComponent;
  let fixture: ComponentFixture<TempHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
