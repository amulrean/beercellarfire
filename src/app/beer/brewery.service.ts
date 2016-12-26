import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestMethod, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
//noinspection TypeScriptCheckImport
import {environment} from '../../environments/environment'

import {Beer} from './beer'

@Injectable()
export class BreweryService {

  constructor(private http: Http) {}

  searchBeer(term: string): Observable<Beer[]> {

    var params = new URLSearchParams();
    params.append('q', term);
    params.append('type', 'beer');
    params.append('withBreweries', 'Y');

    var options = new RequestOptions({
      method: RequestMethod.Get,
      url: environment.brewerydbServer + '/search',
      search: params
    });

    var request = new Request(options);

    return this.http.request(request)
               .map((r: Response) => r.json().data as Beer[]);
  }

}
