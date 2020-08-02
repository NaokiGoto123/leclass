import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomicsSlComponent } from './economics-sl.component';

describe('EconomicsSlComponent', () => {
  let component: EconomicsSlComponent;
  let fixture: ComponentFixture<EconomicsSlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EconomicsSlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomicsSlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
