import { TestBed } from '@angular/core/testing';

import { FiscalInfoService } from './fiscal-info.service';

describe('FiscalInfoService', () => {
  let service: FiscalInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiscalInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
