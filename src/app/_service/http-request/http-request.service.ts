import { Injectable } from '@angular/core';
import {
  Http,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Headers,
  Request
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpRequestService {
  constructor(
    private http: Http
  ) {}

  securePost(url, req) {
    return this.http.post(url, req).map((res: Response) => res.json());
  }

  secureGet(url) {
    return this.http.get(url).map((res: Response) => res.json());
  }
}
