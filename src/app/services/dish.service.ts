import { Injectable } from '@angular/core';

// import { of, Observable } from 'rxjs';
import { Observable } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL } from '../shared/baseurl';

import { Dish } from '../shared/dish';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
// import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  // getDishes(): Promise<Dish[]> {
  getDishes(): Observable<Dish[]> {
    // return Promise.resolve(DISHES);
    // return new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES), 2000);
    // });
    // return of(DISHES).pipe(delay(2000)).toPromise();
    // return of(DISHES).pipe(delay(2000));
    return this.http.get<Dish[]>(BaseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // getDish(id: string): Promise<Dish> {
    getDish(id: string): Observable<Dish> {
    // return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
    // return new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    // });
    // return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();
    // return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
    return this.http.get<Dish>(BaseURL + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // getFeaturedDish(): Promise<Dish> {
  getFeaturedDish(): Observable<Dish> {
    // return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
    // return  new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    // });
    // return of(DISHES.filter((dish)=> (dish.featured))[0]).pipe(delay(2000)).toPromise();
    // return of(DISHES.filter((dish)=> (dish.featured))[0]).pipe(delay(2000));
    return this.http.get<Dish[]>(BaseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<string[] | any> {
    // return of(DISHES.map(dish => dish.id ));
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error => error));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Dish>(BaseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
}
