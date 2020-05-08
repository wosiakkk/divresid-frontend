import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempBoardAdminComponent } from './temp-board-admin.component';

describe('TempBoardAdminComponent', () => {
  let component: TempBoardAdminComponent;
  let fixture: ComponentFixture<TempBoardAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempBoardAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempBoardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
