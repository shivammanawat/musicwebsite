import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtrackComponent } from './showtrack.component';

describe('ShowtrackComponent', () => {
  let component: ShowtrackComponent;
  let fixture: ComponentFixture<ShowtrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowtrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowtrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
