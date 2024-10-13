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
    <CButton color='primary' size="sm" onClick={() => window.alert('Hi')}>{p.value}</CButton>
  </>;
};

const GridExample = () => {
  const gridRef = useRef();

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Ysd", price: 64950, electric: true },
    { make: "Ford", model: "F-Series F-Series F-Series F-Series F-Series F-Series F-Series ", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);
  
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "make",
      cellRenderer: MyCellComponent,
      editable: false
    },
    { headerName: "Model",
      valueGetter: d => d.data.model,
      flex:3,
      filter: PersonFilter,
      floatingFilter: true,
      floatingFilterComponent: PersonFloatingFilter},
    { field: "price",
      valueFormatter: d => "HK$" + d.value.toLocaleString()
    },
    { field: "electric" }
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
