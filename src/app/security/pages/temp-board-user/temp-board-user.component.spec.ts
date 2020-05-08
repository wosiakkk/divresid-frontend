import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempBoardUserComponent } from './temp-board-user.component';

describe('TempBoardUserComponent', () => {
  let component: TempBoardUserComponent;
  let fixture: ComponentFixture<TempBoardUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempBoardUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempBoardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
