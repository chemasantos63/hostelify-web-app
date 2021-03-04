import { TestBed } from '@angular/core/testing';

import { RoomerService } from './roomer.service';

describe('RoomerService', () => {
  let service: RoomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
