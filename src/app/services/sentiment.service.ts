import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  constructor(private http: HttpClient) { }

  getSentiment(text: string): Observable<any> {
    return this.http.post(API_URL + 'sentiment', { 
      text 
    }, httpOptions);
  }
}
