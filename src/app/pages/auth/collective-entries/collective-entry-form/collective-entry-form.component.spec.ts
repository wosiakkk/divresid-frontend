import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectiveEntryFormComponent } from './collective-entry-form.component';

describe('CollectiveEntryFormComponent', () => {
  let component: CollectiveEntryFormComponent;
  let fixture: ComponentFixture<CollectiveEntryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectiveEntryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectiveEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
