//import React from 'react'

export default function areaListParse(data_cross) {
  //console.log(data_cross);
  
  const title = data_cross.metadata.title;

  //const variablesLabel = `${data_cross.metadata.dimensions[0].label} / ${data_cross.metadata.dimensions[1].label}`;
  
  const totalFields = data_cross.metadata.columns.length;
  const totalRows = data_cross.data.length;

  let fieldList = [];
  let rowList = [];

  // Build fields list
  for (let fieldId = 0; fieldId < totalFields; fieldId++) {
    fieldList.push({
      title: data_cross.metadata.columns[fieldId].label.trim(),
      field: data_cross.metadata.columns[fieldId].name
    });
  }

  // Build rows list
  for (let rowId = 0; rowId < totalRows; rowId++) {
    
    let row = {}
    for (let fieldId = 0; fieldId < totalFields; fieldId++) {
      row = {
        ...row,
        [data_cross.metadata.columns[fieldId].name]: data_cross.data[rowId].values[fieldId]
      }
    }

    // Add the row to the list of rows
    rowList.push(row);
  }


  return ({
    title: title,
    columns: fieldList,
    data: rowList
  });
}

