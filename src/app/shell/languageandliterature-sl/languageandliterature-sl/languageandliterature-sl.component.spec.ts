import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageandliteratureSlComponent } from './languageandliterature-sl.component';

describe('LanguageandliteratureSlComponent', () => {
  let component: LanguageandliteratureSlComponent;
  let fixture: ComponentFixture<LanguageandliteratureSlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageandliteratureSlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageandliteratureSlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
