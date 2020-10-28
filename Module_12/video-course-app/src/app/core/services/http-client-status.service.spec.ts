import { TestBed } from '@angular/core/testing';

import { HttpClientStatusService } from './http-client-status.service';

describe('Http.Client.StatusService', () => {
  let service: HttpClientStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should be initialized with false', () => {
  //   expect(service.isWorking).toBeFalse();
  // });

  // it('should set status properly', () => {
  //   service.setStatus(false);
  //   expect(service.isWorking).toBeFalse();
  //   service.setStatus(true);
  //   expect(service.isWorking).toBeTrue();
  // });
});
