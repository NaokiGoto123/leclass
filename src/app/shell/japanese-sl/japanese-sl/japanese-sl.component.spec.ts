import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JapaneseSlComponent } from './japanese-sl.component';

describe('JapaneseSlComponent', () => {
  let component: JapaneseSlComponent;
  let fixture: ComponentFixture<JapaneseSlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JapaneseSlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JapaneseSlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
