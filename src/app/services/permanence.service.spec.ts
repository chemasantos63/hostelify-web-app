import { TestBed } from '@angular/core/testing';

import { PermanenceService } from './permanence.service';

describe('PermanenceService', () => {
  let service: PermanenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermanenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
