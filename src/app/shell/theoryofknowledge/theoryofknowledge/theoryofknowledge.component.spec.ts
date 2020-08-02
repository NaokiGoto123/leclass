import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheoryofknowledgeComponent } from './theoryofknowledge.component';

describe('TheoryofknowledgeComponent', () => {
  let component: TheoryofknowledgeComponent;
  let fixture: ComponentFixture<TheoryofknowledgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheoryofknowledgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheoryofknowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
