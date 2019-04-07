import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DataService } from '../data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  tempData: any;
  rowData: any;
  errorMsg: Boolean;

  appForm = new FormGroup({
    transactionId: new FormControl(''),
    confidenceLevel: new FormControl('')
  });

  columns = [
    { name: 'S/N' },
    { name: 'Name' },
    { name: 'Email' },
    { name: 'Phone' },
    { name: 'Age' },
    { name: 'Transaction ID' },
    { name: 'Connection Type' },
    { name: 'Confidence Level' }
  ];

  constructor(private dataService: DataService) {}

  // flatten the data set
  flatten(items) {
    let flat = [];
    items.forEach((el) => {
      if (el.childrens === undefined || el.childrens.length === 0) {
        return flat.push(el);
      }
      // flat.push(el); // TODO: Only add this if we need the root data
      flat = flat.concat(this.flatten(el.childrens));
    });
    return flat;
  }

  searchBy() {
    const { transactionId, confidenceLevel } = this.appForm.value;

    if (this.appForm.invalid) {
      this.errorMsg = true;
      return null;
    }

    // filter by user input
    this.rowData = this.tempData
      .filter(data => {
        if (data.connectionInfo) {
          // match both transaction id and confidence level
          if (transactionId && confidenceLevel) {
            if (data.id === transactionId && data.connectionInfo.confidence > Number(confidenceLevel)) {
              return data;
            }
          }
          // match only the transaction id
          if (transactionId && !confidenceLevel && data.id === transactionId) {
            return data;
          }
        }
      });
    this.errorMsg = false;
  }

  reset(event) {
    event.preventDefault();
    this.appForm.reset();
    this.errorMsg = false;
    this.rowData = this.tempData;
  }

  ngOnInit() {
    this.dataService.fetchTransactions()
      .subscribe(data => {
        const transactionData = this.flatten(data);
        this.rowData = transactionData;
        // Store temp data for client-side search
        // TODO: Remove and move search to Server-side.
        this.tempData = transactionData;
      }, error => console.error(error));
  }

}
