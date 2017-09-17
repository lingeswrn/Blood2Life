import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpRequestService } from '../../_service/http-request/http-request.service';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {Router} from '@angular/router';

import { ConstantsService } from '../../_service/constants/constants.service';
import * as $ from 'jquery';

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
  public registrationData = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      gender: '0',
      dob: '',
      age: '',
      email: '',
      blood_group: '0',
      donation_frequency: '0',
      address: '',
      home_town: '',
      pincode: '',
      current_city: '',
      district: '0',
      state: '0',
      country: '0'
    };
  public errorText = '';
  public isError = false;
  registrationForm: FormGroup;

  constructor(
    private request: HttpRequestService,
    private constants: ConstantsService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.registrationForm = new FormGroup({
        'firstname': new FormControl(this.registrationData.firstName, [Validators.required]),
        'lastname': new FormControl(this.registrationData.lastName, [Validators.required]),
        'phoneNumber': new FormControl(this.registrationData.phoneNumber, [Validators.required]),
        'email': new FormControl(this.registrationData.email, [Validators.required]),
        'gender': new FormControl(this.registrationData.gender, [Validators.required]),
        'dob': new FormControl(this.registrationData.dob, [Validators.required]),
        //'age': new FormControl(this.registrationData.age, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
        'blood_group': new FormControl(this.registrationData.blood_group, [Validators.required]),
        'donation_frequency': new FormControl(this.registrationData.donation_frequency, [Validators.required]),
        'address': new FormControl(this.registrationData.address, [Validators.required]),
        //'home_town': new FormControl(this.registrationData.home_town, [Validators.required]),
        'pincode': new FormControl(this.registrationData.pincode, [Validators.required]),
        //'current_city': new FormControl(this.registrationData.current_city, [Validators.required]),
        'district': new FormControl(this.registrationData.district, [Validators.required]),
        'state': new FormControl(this.registrationData.state, [Validators.required]),
        'country': new FormControl(this.registrationData.country, [Validators.required]),
      });

  }

  onSubmit(value: any): void {
    if (value.phoneNumber.toString().length !== 10) {
      this.isError = true;
      this.errorText = 'Please Enter valid phone number!';
    }else if (value.gender === '0') {
      this.isError = true;
      this.errorText = 'Please choose Gender!';
    }else if (value.blood_group === '0') {
      this.isError = true;
      this.errorText = 'Please select Blood Group!';
    }else if (value.donation_frequency === '0') {
      this.isError = true;
      this.errorText = 'Please select Donation Frequency!';
    }else if (value.country === '0') {
      this.isError = true;
      this.errorText = 'Please select Country!';
    }else if (value.state === '0') {
      this.isError = true;
      this.errorText = 'Please select State!';
    }else if (value.district === '0') {
      this.isError = true;
      this.errorText = 'Please select District!';
    }else if (this.getAge(value.dob) < 18) {
      this.isError = true;
      this.errorText = 'Your age is not eligible!';
    }else {
      let reqData = {
        firstname: value.firstname,
        lastname: value.lastname,
        contactnumber: value.phoneNumber.toString(),
        gender: value.gender,
        dob: value.dob,
        age: this.getAge(value.dob),
        bloodgroup: value.blood_group,
        frequency: value.donation_frequency,
        address1: value.address,
        address2: '',
        updatedate: new Date(),
        status: '0',
        username: value.phoneNumber.toString(),
        password: '',
        profilepic: '',
        email: value.email,
        type: '1',
        hometown: '',
        pincode: value.pincode,
        currentcity: '',
        district: value.district,
        state: value.state,
        country: value.country
      };
      this.request.securePost(this.constants.API_ADD_USER, reqData)
        .subscribe(this.addRes);
    }
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

  getAge = (date) => {
    const now = new Date();
    const dates = new Date(date);
    const birthday = new Date(now.getFullYear(), dates.getMonth(), dates.getDate());
    if (now >= birthday) {
      return now.getFullYear() - dates.getFullYear();
    } else {
      return now.getFullYear() - dates.getFullYear() - 1;
    }
  }

  addRes = (res) => {
    if (res.code === this.constants.API_SUCCESS) {
      this.router.navigateByUrl('thank-you');
    }else {
      this.isError = true;
      this.errorText = 'Phone number or Email id already registered';
    }
  }
  get firstname() { return this.registrationForm.get('firstname'); }
  get lastname() { return this.registrationForm.get('lastname'); }
  get phoneNumber() { return this.registrationForm.get('phoneNumber'); }
  get email() { return this.registrationForm.get('email'); }
  get gender() { return this.registrationForm.get('gender'); }
  get dob() { return this.registrationForm.get('dob'); }
  get age() { return this.registrationForm.get('age'); }
  get blood_group() { return this.registrationForm.get('blood_group'); }
  get donation_frequency() { return this.registrationForm.get('donation_frequency'); }
  get address() { return this.registrationForm.get('address'); }
  get home_town() { return this.registrationForm.get('home_town'); }
  get pincode() { return this.registrationForm.get('pincode'); }
  get current_city() { return this.registrationForm.get('current_city'); }
  get district() { return this.registrationForm.get('district'); }
  get state() { return this.registrationForm.get('state'); }
  get country() { return this.registrationForm.get('country'); }
}
