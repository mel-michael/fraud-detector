import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { AgGridNg2 } from 'ag-grid-angular';

import DATA from '../transaction-graph';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild('agGrid')agGrid: AgGridNg2;
  tempData: any;
  rowData: any;

  appForm = new FormGroup({
    transactionId: new FormControl(''),
    confidenceLevel: new FormControl('')
  });

  columnDefs = [
    {
      headerName: 'S/N',
      width: 50,
      cellRenderer: function (params) {
        return params.rowIndex + 1;
      }
    }, {
      headerName: 'Name',
      field: 'name'
    }, {
      headerName: 'Email',
      field: 'email'
    }, {
      headerName: 'Phone',
      field: 'phone'
    }, {
      headerName: 'Age',
      field: 'age',
      width: 80
    }, {
      headerName: 'Transaction ID',
      field: 'id'
    }, {
      headerName: 'Connection Type',
      cellRenderer: function (params) {
        if (params.data.connectionInfo) {
          return params.data.connectionInfo.type;
        }
        return '';
      }
    }, {
      headerName: 'Confidence Level',
      filter: 'agNumberColumnFilter',
      cellRenderer: function (params) {
        if (params.data.connectionInfo) {
          return params.data.connectionInfo.confidence;
        }
        return '';
      }
    }
  ];

  gridOptions = {
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true
    },
    columnDefs: this.columnDefs,
    colWidth: 100,
    rowSelection: 'single',
    onGridReady: function (event) {
      event
        .api
        .sizeColumnsToFit();
    }, // TODO: Use this if Ag-Grid is activated
    // isExternalFilterPresent: this.isExternalFilterPresent,
    // doesExternalFilterPass: this.doesExternalFilterPass,
  };

  constructor(private http: HttpClient) {}

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
    const {transactionId, confidenceLevel} = this.appForm.value;

    if (transactionId === '' && confidenceLevel === '') {
      this.rowData = this.tempData;
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
          // match only confidence level
          if (confidenceLevel && !transactionId && data.connectionInfo.confidence > Number(confidenceLevel)) {
            return data;
          }
        }
        // match only transaction data that doesn't have a confidence level
        if (data.id === transactionId) {
          return data;
        }
      });
  }

  reset(event) {
    event.preventDefault();
    this.appForm.reset();
    this.rowData = this.tempData;
  }

  ngOnInit() {
    const transactionData = this.flatten(DATA);
    this.rowData = transactionData;
    this.tempData = transactionData; // Sort temp data for client-side filtering
  }

}
