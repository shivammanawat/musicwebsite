import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltrackComponent } from './alltrack.component';

describe('AlltrackComponent', () => {
  let component: AlltrackComponent;
  let fixture: ComponentFixture<AlltrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlltrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlltrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
