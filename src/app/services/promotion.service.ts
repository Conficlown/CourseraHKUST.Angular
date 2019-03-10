import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Promotion } from '../shared/promotion';
// import { PROMOTIONS } from '../shared/promotions';

import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  
  getPromotions(): Observable<Promotion[]> {
    // return new Promise(resolve=>{
    //   setTimeout(() => resolve(PROMOTIONS), 2000);
    // })
    // return PROMOTIONS;
    // return of(PROMOTIONS).pipe(delay(2000));
    return this.http.get<Promotion[]>(BaseURL + 'promotions')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    // return PROMOTIONS.filter((promo) => (promo.id === id))[0];
    // return new Promise(resolve=>{
    //   setTimeout(()=>{
    //     resolve(PROMOTIONS.filter((Promotion)=>(Promotion.id===id))[0])
    //   }, 2000);
    // })
    // return of(PROMOTIONS.filter( (Promotion) => (Promotion.id===id))[0]).pipe(delay(2000));
    return this.http.get<Promotion>(BaseURL + 'promotions/' + id).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    // return PROMOTIONS.filter((promotion) => promotion.featured)[0];
    // return new Promise(resolve=>{
    //   setTimeout(()=>resolve(PROMOTIONS.filter((Promotion)=>Promotion.featured)[0]), 2000)
    // })
    // return of(PROMOTIONS.filter( (Promotion) => (Promotion.featured))[0]).pipe(delay(2000));
    return this.http.get<Promotion[]>(BaseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
}
