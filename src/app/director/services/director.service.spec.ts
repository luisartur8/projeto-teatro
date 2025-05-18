import { TestBed } from '@angular/core/testing';

import { DirectorService } from './director.service';

describe('GameService', () => {
  let service: DirectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});