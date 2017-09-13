import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  public API_URL: string = "http://api.blood2life.org/";
  public VERSION: string = "api-v1.0/";

  // API NAMES
  private country: string = "country";
  private state: string = "state";
  private city: string = "city";

  public API_COUNTRY = this.getAPIurl() + this.country;
  public API_STATE = this.getAPIurl() + this.state;
  public API_CITY = this.getAPIurl() + this.city;

  constructor() { }

  /*
   *@name: getAPIurl
   *@desc: get API URL with version name
   */
  getAPIurl(){
    return this.API_URL + this.VERSION;
  }


}
