import { Injectable } from '@angular/core';

@Injectable()
export class DataServiceService {

  private zip: number = 10010;

  constructor() { }

  getZipCode(): number {
    return this.zip;
  }

  setZipCode(val: number): void {
    this.zip = val;
  }

}
