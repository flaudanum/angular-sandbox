import { TestBed } from '@angular/core/testing';

import { ModernaDataService } from './moderna-data.service';

describe('ModernaDataService', () => {
  let service: ModernaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModernaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
