import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectiveEntryListComponent } from './collective-entry-list.component';

describe('CollectiveEntryListComponent', () => {
  let component: CollectiveEntryListComponent;
  let fixture: ComponentFixture<CollectiveEntryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectiveEntryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectiveEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
