import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

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
    return of(DISHES).pipe(delay(2000));
  }

  // getDish(id: string): Promise<Dish> {
    getDish(id: string): Observable<Dish> {
    // return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
    // return new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    // });
    // return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  }

  // getFeaturedDish(): Promise<Dish> {
  getFeaturedDish(): Observable<Dish> {
    // return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
    // return  new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    // });
    // return of(DISHES.filter((dish)=> (dish.featured))[0]).pipe(delay(2000)).toPromise();
    return of(DISHES.filter((dish)=> (dish.featured))[0]).pipe(delay(2000));
  }

  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map(dish => dish.id ));
  }

  constructor() { }
}
