import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerscienceHlComponent } from './computerscience-hl.component';

describe('ComputerscienceHlComponent', () => {
  let component: ComputerscienceHlComponent;
  let fixture: ComponentFixture<ComputerscienceHlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerscienceHlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerscienceHlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
