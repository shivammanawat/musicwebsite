import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittrackComponent } from './edittrack.component';

describe('EdittrackComponent', () => {
  let component: EdittrackComponent;
  let fixture: ComponentFixture<EdittrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
