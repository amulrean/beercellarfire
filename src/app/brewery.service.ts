import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
//noinspection TypeScriptCheckImport
import {environment} from '../environments/environment'

import {Beer} from './beer'

@Injectable()
export class BreweryService {

  constructor(private http: Http) {}

  search(term: string): Observable<Beer[]> {
    return this.http
               .get(environment.brewerydbServer + `?search=${term}`)
               .map((r: Response) => r.json().data as Beer[]);
  }

}
