import { TestBed } from '@angular/core/testing';

import { KnightService } from './knight.service';

describe('KnightService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KnightService = TestBed.get(KnightService);
    expect(service).toBeTruthy();
  });
});
