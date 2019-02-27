import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaders(): Observable<Leader[]> {
    // return LEADERS;
    // return new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(LEADERS), 2000);
    // });
    return of(LEADERS).pipe(delay(2000));
  }

  getFeaturedLeader(): Observable<Leader> {
    // return LEADERS.filter((leader) => leader.featured)[0];
    // return  new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(LEADERS.filter((Leader) => Leader.featured)[0]), 2000);
    // });
    return of(LEADERS.filter( (leader)=> (leader.featured))[0]).pipe(delay(2000));
  }

  constructor() { }
}
