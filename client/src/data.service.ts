import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const LOCAL_URL = 'http://localhost:5000';
const TRANSACTION_URL = `${LOCAL_URL}/api/transactions`;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {}

  fetchTransactions() {
    return this.http.get(TRANSACTION_URL, httpOptions);
  }

}
