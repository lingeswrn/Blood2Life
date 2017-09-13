import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../../_service/http-request/http-request.service';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { ConstantsService } from '../../_service/constants/constants.service';

@Component({
  selector: 'app-become-adonor',
  templateUrl: './become-adonor.component.html',
  styleUrls: ['./become-adonor.component.css'],
  providers: [HttpRequestService, ConstantsService, HttpClient]
})
export class BecomeAdonorComponent implements OnInit {
  public test: any[];
  constructor(
    private request: HttpRequestService,
    private constants: ConstantsService
  ) { }

  ngOnInit() {
    this.getCountries();
  }

  getCountries(){
    var reqData = {};
    this.request.securePost(this.constants.API_COUNTRY, reqData)
      .subscribe(this.testRes);
    
  }

  testRes = (res) => {
    this.test = res;
    console.log(this.test);
  }
}
