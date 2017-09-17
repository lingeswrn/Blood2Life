import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  public API_URL = 'http://api.blood2life.org/';
  public VERSION = 'api-v1.0/';

  // API NAMES
  private add = '49a9645a26923768c7267221cb211c0e';
  private country = 'country';
  private state = 'state';
  private city = 'city';
  private bloodGroup = 'bloodgroups';
  private user = 'user';
  private todo = '?todo=';


  public API_COUNTRY = this.getAPIurl() + this.country;
  public API_STATE = this.getAPIurl() + this.state;
  public API_CITY = this.getAPIurl() + this.city;
  public API_BLOOD_GROUP = this.getAPIurl() + this.bloodGroup;
  public API_ADD_USER = this.getAPIurl() + this.user + this.todo + this.add;

  // API CODES
  public API_SUCCESS = '200';
  public API_ERROR = '400';

  constructor() { }

  /*
   *@name: getAPIurl
   *@desc: get API URL with version name
   */
  getAPIurl(){
    return this.API_URL + this.VERSION;
  }


}
