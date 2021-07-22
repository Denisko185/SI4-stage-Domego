import { TestBed } from '@angular/core/testing';

import { WatchingService } from './watching.service';

describe('WatchingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WatchingService = TestBed.get(WatchingService);
    expect(service).toBeTruthy();
  });
});
