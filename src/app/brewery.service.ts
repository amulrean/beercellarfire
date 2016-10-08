import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import {Beer} from './beer'

@Injectable()
export class BreweryService {

  constructor(private http: Http) {}

  search(term: string): Observable<Beer[]> {
    return this.http
               .get(`http://localhost:3000/?search=${term}`)
               .map((r: Response) => r.json().data as Beer[]);
  }

}
