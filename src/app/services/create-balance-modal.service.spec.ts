import { TestBed } from '@angular/core/testing';

import { CreateBalanceModalService } from './create-balance-modal.service';

describe('CreateBalanceModalService', () => {
  let service: CreateBalanceModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateBalanceModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
