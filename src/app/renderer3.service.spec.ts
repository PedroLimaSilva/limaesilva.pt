import { TestBed, inject } from '@angular/core/testing';

import { Renderer3Service } from './renderer3.service';

describe('Renderer3Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Renderer3Service]
    });
  });

  it('should be created', inject([Renderer3Service], (service: Renderer3Service) => {
    expect(service).toBeTruthy();
  }));
});
