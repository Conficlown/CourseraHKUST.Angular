import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  
  getPromotions(): Observable<Promotion[]> {
    // return new Promise(resolve=>{
    //   setTimeout(() => resolve(PROMOTIONS), 2000);
    // })
    // return PROMOTIONS;
    return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: string): Observable<Promotion> {
    // return PROMOTIONS.filter((promo) => (promo.id === id))[0];
    // return new Promise(resolve=>{
    //   setTimeout(()=>{
    //     resolve(PROMOTIONS.filter((Promotion)=>(Promotion.id===id))[0])
    //   }, 2000);
    // })
    return of(PROMOTIONS.filter( (Promotion) => (Promotion.id===id))[0]).pipe(delay(2000));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    // return PROMOTIONS.filter((promotion) => promotion.featured)[0];
    // return new Promise(resolve=>{
    //   setTimeout(()=>resolve(PROMOTIONS.filter((Promotion)=>Promotion.featured)[0]), 2000)
    // })
    return of(PROMOTIONS.filter( (Promotion) => (Promotion.featured))[0]).pipe(delay(2000));
  }
  constructor() { }
}
