import React, { StrictMode, useState, useMemo, useRef, useEffect } from 'react';
import {
  CRow,
  CButton,
} from '@coreui/react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import PersonFloatingFilter from './personFloatingFilter.jsx';
import PersonFilter from './personFilter.jsx';

const MyCellComponent = p => {
  return <>
    <CButton color='primary' size="sm" onClick={() => window.alert(p.value)}>{p.value}</CButton>
  </>;
};

const GridExample = () => {
  const gridRef = useRef();

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { file_ref: "KW6/00001", file_part: "I", premises_address: 'Shop 1, 3/F, 123 Nathan Road', active_case: 0 },
    { file_ref: "KW2/00002", file_part: "II", premises_address: 'Shop 2, 3/F, 750 Canton Road', active_case: 1 },
    { file_ref: "KW13/00003", file_part: "15", premises_address: 'Shop 3, 3/F, 99 Tai Tsun Road', active_case: 2 },
  ]);
  
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "file_ref",
      headerName: "File No.",
      cellRenderer: MyCellComponent,
      editable: false
    },  
    { field: "file_part",
      headerName: "File Part"
    },
    { field: "premises_address",
      valueGetter: d => d.data.premises_address,
      flex:5,
      filter: PersonFilter,
      floatingFilter: true,
      floatingFilterComponent: PersonFloatingFilter
    },
    { field: "active_case",
      valueFormatter: d => d.value.toLocaleString() + " case(s)"
     }
  ]);

  const defaultColDef = useMemo( () => {
    return {
      flex:1,
      filter: true,
      floatingFilter: true,
      editable: true,
      suppressFloatingFilterButton: true
    }
  });

  return (
    // wrapping container with theme & size
    <div
     className="ag-theme-quartz" // applying the Data Grid theme
     style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
          reactiveCustomComponents
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination = {true}
          paginationPageSize = {50}
      />
    </div>
   )
 }

const Maintaincase = () => {
  return (
    <CRow>
      <GridExample/>
    </CRow>
  )
}

export default Maintaincase
