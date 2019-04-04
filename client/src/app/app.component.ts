import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import {MOCK_DATA}  from  '../transaction-graph';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'My App';

  columnDefs = [
    { headerName: 'Make', field: 'make', sortable: true, filter: true },
    { headerName: 'Model', field: 'model', sortable: true, filter: true },
    { headerName: 'Price', field: 'price', sortable: true, filter: true }
  ];

  rowData: any;

  constructor(private http: HttpClient) {
  // console.log(MOCK_DATA)
  }

  ngOnInit() {
    this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
  }

  // rowData = [
  //   { make: 'Toyota', model: 'Celica', price: 35000, sortable: true },
  //   { make: 'Ford', model: 'Mondeo', price: 32000, sortable: true },
  //   { make: 'Porsche', model: 'Boxter', price: 72000, sortable: true },
  //   { make: 'Honda', model: 'Accord', price: 52000, sortable: true },
  //   { make: 'Mel', model: 'Camry', price: 92000, sortable: true },
  //   { make: 'Kola', model: 'Lexus', price: 62000, sortable: true },
  //   { make: 'Ralph', model: 'Xender', price: 57000, sortable: true },
  //   { make: 'Annie', model: 'Gotcha', price: 42000, sortable: true },
  //   { make: 'Annel', model: 'Venza', price: 70000, sortable: true },
  //   { make: 'Benz', model: 'Cent', price: 77000, sortable: true },
  //   { make: 'MayBach', model: 'Cruise', price: 88000, sortable: true },
  // ];
}

