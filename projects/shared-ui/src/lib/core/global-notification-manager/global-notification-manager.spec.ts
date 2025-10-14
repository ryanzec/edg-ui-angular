import { TestBed } from '@angular/core/testing';

import { GlobalNotificationManager } from './global-notification-manager';

describe('GlobalNotificationManager', () => {
  let service: GlobalNotificationManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalNotificationManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
