import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { AgGridNg2 } from 'ag-grid-angular';

import { DATA } from '../graph';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  title = 'My App';
  result: any;
  rowData: any;

  appForm = new FormGroup({
    transactionId: new FormControl(''),
    confidenceInfo: new FormControl('')
  });

  columnDefs = [
    { headerName: 'S/N', width: 80,
      cellRenderer: function(params) { 
        return params.rowIndex + 1;
      } 
    },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Phone', field: 'phone' },
    { headerName: 'Age', field: 'age', width: 80 },
    { headerName: 'TransactionId', field: 'id' },
    { headerName: 'Connection Type',
      cellRenderer: function(params) { 
        console.log('parms', params)
        if(params.data.connectionInfo)
          return params.data.connectionInfo.type
        return '';
      } 
    },
    { headerName: 'Confidence Level',
      cellRenderer: function(params) { 
        console.log('parms', params)
        if(params.data.connectionInfo)
          return params.data.connectionInfo.confidence
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
    }
  };

  constructor(private http: HttpClient) { }

  // Flatten the data set
  flatten(items) {
    let flat = [];
    items.forEach((el) => {
      if (el.childrens === undefined || el.childrens.length === 0) {
        return flat.push(el)
      }
      // flat.push(el)
      flat = flat.concat(this.flatten(el.childrens));
    })
    return flat;
  }

  onQuickFilterChanged() {
    const name = this.appForm.value.transactionId;
    this.agGrid.api.setQuickFilter(name)
  }

  ngOnInit() {
    // this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
    // this.rowData = DATA;
    this.rowData = this.flatten(DATA);
  }

}

