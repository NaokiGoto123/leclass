import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IbDpComponent } from './ib-dp.component';

describe('IbDpComponent', () => {
  let component: IbDpComponent;
  let fixture: ComponentFixture<IbDpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IbDpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbDpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
