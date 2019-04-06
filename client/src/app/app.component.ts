import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { AgGridNg2 } from 'ag-grid-angular';
// import { IconDefinition } from '@fortawesome/fontawesome-common-types'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import DATA from '../transaction-graph';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  title = 'My App';
  searchValue: any;
  rowData: any;
  // faCoffee: IconDefinition = faCoffee;

  appForm = new FormGroup({
    transactionId: new FormControl(''),
    confidenceLevel: new FormControl('')
  });

  columnDefs = [
    { headerName: 'S/N', width: 50,
      cellRenderer: function(params) {
        return params.rowIndex + 1;
      }
    },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Phone', field: 'phone' },
    { headerName: 'Age', field: 'age', width: 80 },
    { headerName: 'Transaction ID', field: 'id' },
    { headerName: 'Connection Type',
      cellRenderer: function(params) {
        if (params.data.connectionInfo) {
          return params.data.connectionInfo.type;
        }
        return '';
      }
    },
    { headerName: 'Confidence Level', filter: 'agNumberColumnFilter',
      cellRenderer: function(params) {
        if (params.data.connectionInfo) {
          return params.data.connectionInfo.confidence;
        }
        return '';
      }
    },
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
      event.api.sizeColumnsToFit();
    },
    // isExternalFilterPresent: this.isExternalFilterPresent,
    // doesExternalFilterPass: this.doesExternalFilterPass,
  };


  isExternalFilterPresent() {
    // if searchValue is not empty, then we are filtering
    return this.searchValue !== '';
  }

  doesExternalFilterPass(node) {
    console.log('node', node);
    // const { transactionId, confidenceLevel } = this.searchValue;
    // console.log()
    return true;

    // switch (this.searchValue) {
    //   case 'below30': return node.data.age < 30;
    //   case 'between30and50': return node.data.age >= 30 && node.data.age <= 50;
    //   case 'above50': return node.data.age > 50;
    //   default: return true;
    // }
  }

  constructor(private http: HttpClient) { }

  // Flatten the data set
  flatten(items) {
    let flat = [];
    items.forEach((el) => {
      if (el.childrens === undefined || el.childrens.length === 0) {
        return flat.push(el);
      }
      // flat.push(el)
      flat = flat.concat(this.flatten(el.childrens));
    });
    return flat;
  }

  externalFilterChanged() {
    this.searchValue = this.appForm.value;
    console.log(this.searchValue);
    this.agGrid.api.onFilterChanged();
    // this.agGrid.api.setQuickFilter(`${transactionId} ${confidenceLevel}`);
  }

  onSearch() {
    this.searchValue = this.appForm.value;
    console.log(this.searchValue);
    this.agGrid.api.onFilterChanged();
    // this.agGrid.api.setQuickFilter(`${transactionId} ${confidenceLevel}`);
  }

  ngOnInit() {
    // this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
    // this.rowData = DATA;
    this.rowData = this.flatten(DATA);
    console.log(DATA);
  }

}

