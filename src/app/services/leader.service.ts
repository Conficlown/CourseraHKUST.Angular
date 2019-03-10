import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// import { LEADERS } from '../shared/leaders';

import { Leader } from '../shared/leader';

import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

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
    // return of(LEADERS).pipe(delay(2000));
    return this.http.get<Leader[]>(BaseURL + 'leadership').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    // return LEADERS.filter((leader) => leader.featured)[0];
    // return  new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(LEADERS.filter((Leader) => Leader.featured)[0]), 2000);
    // });
    // return of(LEADERS.filter( (leader)=> (leader.featured))[0]).pipe(delay(2000));
    return this.http.get<Leader[]>(BaseURL + 'leadership?featured=true').pipe(map(l => l[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
}
