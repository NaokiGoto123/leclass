import { TestBed } from '@angular/core/testing';

import { ReportGetService } from './report-get.service';

describe('ReportGetService', () => {
  let service: ReportGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
