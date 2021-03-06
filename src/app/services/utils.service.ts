import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  splitArrayMaxLenght(originalArray: any[], maxLength: number): any[] {
    let arrayOfArrays: any[] = [];

    let numberOfSubArrays = Math.ceil(originalArray.length / maxLength);

    let currentArray: any[];

    for (let i = 0; i < numberOfSubArrays; i++) {
      if (i == 0) {
        currentArray = originalArray.slice(0, maxLength);
      } else {
        currentArray = originalArray.slice(maxLength * i, maxLength * (i + 1));
      }
      arrayOfArrays.push(currentArray);
    }
    return arrayOfArrays;
  }

  miliSecondsToTime(mSecs: string): string {
    let minutes = Math.floor(parseInt(mSecs) / (60 * 1000));
    let divisor_for_seconds = parseInt(mSecs) % (60 * 1000);
    let seconds = Math.floor(divisor_for_seconds / 1000);

    return (minutes < 10 ? "0" + minutes : minutes.toString())
      + ":"
      + (seconds < 10 ? "0" + seconds : seconds.toString());
  }
}
