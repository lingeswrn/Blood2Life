import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  public countries: any[];
  public states;
  public cities;
  public bloodGroups;
  public registrationData = {firstName: '', lastName: ''};
  registrationForm: FormGroup;

  constructor(
    private request: HttpRequestService,
    private constants: ConstantsService,
    fb: FormBuilder
  ) {
    this.registrationForm = new FormGroup({
        'firstName': new FormControl(this.registrationData.firstName, [Validators.required]),
        'lastName': new FormControl(this.registrationData.lastName, [Validators.required])});
  }

  submitForm(value: any): void {
    console.log('Reactive Form Data: ');
    console.log(value);
  }
  ngOnInit() {
    this.getCountries();
    this.getBloodGroups();
  }

  getCountries() {
    const reqData = {};
    this.request.securePost(this.constants.API_COUNTRY, reqData)
      .subscribe(this.countryRes);
  }

  getStatesByCountryId(id) {
    const reqData = { 'countryId': id};
    this.request.securePost(this.constants.API_STATE, reqData)
      .subscribe(this.stateRes);
  }

  getCitiesByStateId(id) {
    const reqData = { 'stateId': id};
    this.request.securePost(this.constants.API_CITY, reqData)
      .subscribe(this.cityRes);
  }

  getBloodGroups() {
    this.request.secureGet(this.constants.API_BLOOD_GROUP)
      .subscribe(this.blodRes);
  }

  countryRes = (res) => {
    if (res.code === this.constants.API_SUCCESS) {
      const tempCountry = [];
      tempCountry.push(res.data);
      this.countries = tempCountry;
      console.log(this.countries);
      this.getStatesByCountryId(res.data.CountryID);
    }
  }

  stateRes = (res) => {
    if (res.code === this.constants.API_SUCCESS) {
      this.states = res.data;
    }
  }

  cityRes = (res) => {
    if (res.code === this.constants.API_SUCCESS) {
      this.cities = res.data;
    }
  }

  blodRes = (res) => {
    if (res.code === this.constants.API_SUCCESS) {
      this.bloodGroups = res.data;
    }
  }

  get firstName() { return this.registrationForm.get('firstName'); }
  get lastName() { return this.registrationForm.get('lastName'); }
}
