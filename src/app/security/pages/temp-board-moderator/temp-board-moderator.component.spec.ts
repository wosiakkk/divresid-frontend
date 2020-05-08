import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempBoardModeratorComponent } from './temp-board-moderator.component';

describe('TempBoardModeratorComponent', () => {
  let component: TempBoardModeratorComponent;
  let fixture: ComponentFixture<TempBoardModeratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempBoardModeratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempBoardModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
