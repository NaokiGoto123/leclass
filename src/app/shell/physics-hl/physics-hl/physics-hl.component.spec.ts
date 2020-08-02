import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicsHlComponent } from './physics-hl.component';

describe('PhysicsHlComponent', () => {
  let component: PhysicsHlComponent;
  let fixture: ComponentFixture<PhysicsHlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicsHlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicsHlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
