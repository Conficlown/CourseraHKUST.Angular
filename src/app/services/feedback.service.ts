import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL } from '../shared/baseurl';

import { Feedback } from '../shared/feedback';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getFeedbacks (): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(BaseURL + 'feedback')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  submitFeedback( feedback : Feedback) : Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<Feedback>(BaseURL + 'feedback/', feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
