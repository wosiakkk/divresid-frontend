import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarItensComponent } from './sidebar-itens.component';

describe('SidebarItensComponent', () => {
  let component: SidebarItensComponent;
  let fixture: ComponentFixture<SidebarItensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarItensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
