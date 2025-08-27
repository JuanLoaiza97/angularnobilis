import { TestBed } from '@angular/core/testing';

import { PropieadesServiceService } from './propieades-service.service';

describe('PropieadesServiceService', () => {
  let service: PropieadesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropieadesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
