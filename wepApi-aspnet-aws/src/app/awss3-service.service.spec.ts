import { TestBed } from '@angular/core/testing';

import { AWSS3Service } from './awss3-service';

describe('AWSS3ServiceService', () => {
  let service: AWSS3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AWSS3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
