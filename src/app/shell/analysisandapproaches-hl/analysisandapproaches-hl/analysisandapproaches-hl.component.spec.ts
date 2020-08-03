import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisandapproachesHlComponent } from './analysisandapproaches-hl.component';

describe('AnalysisandapproachesHlComponent', () => {
  let component: AnalysisandapproachesHlComponent;
  let fixture: ComponentFixture<AnalysisandapproachesHlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisandapproachesHlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisandapproachesHlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
