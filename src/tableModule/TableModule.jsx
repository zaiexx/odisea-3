import React from 'react';
import MaterialTable from "material-table";
import parseDataTable from './parseDataTable';

export default function TableModule({ JSONData }) {

  const processedData = parseDataTable(JSONData);

  return (
    <>
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        columns={ processedData.columns }
        data={ processedData.data }
        title={ processedData.title }
        options={{
          exportButton: true,
          pageSize: 10,
          pageSizeOptions: [10, 50, 100],
          headerStyle: {color: '#000', fontWeight: 'bold'}
        }}
      />
    </div>
    </>
  )
}
