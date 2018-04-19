import { TestBed, inject } from '@angular/core/testing';

import { ObjLoaderService } from './obj-loader.service';

describe('ObjLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObjLoaderService]
    });
  });

  it('should be created', inject([ObjLoaderService], (service: ObjLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
