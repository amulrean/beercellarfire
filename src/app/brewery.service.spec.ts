/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BreweryService } from './brewery.service';

describe('Service: Brewery', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreweryService]
    });
  });

  it('should ...', inject([BreweryService], (service: BreweryService) => {
    expect(service).toBeTruthy();
  }));
});
