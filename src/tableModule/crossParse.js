//import React from 'react'


export default function crossParse(data_cross) {
  //console.log(data_cross);
  
  const title = data_cross.metadata.title;

  const variablesLabel = `${data_cross.metadata.dimensions[0].label} / ${data_cross.metadata.dimensions[1].label}`;
  
  const totalFields = data_cross.metadata.dimensions[0].values.length;
  const totalRows = data_cross.metadata.dimensions[1].values.length;

  let fieldList = [];
  let rowList = [];

  if (data_cross.metadata.areabreak) {
    const areaLabel = data_cross.metadata.areabreak.entity; //.label

    // Build fields list
    for (let fieldId = 0; fieldId < totalFields; fieldId++) {
      fieldList.push({
        title: data_cross.metadata.dimensions[0].labels[fieldId].trim(),
        field: data_cross.metadata.dimensions[0].values[fieldId]
      });
    }

    // Add first field with areabreakd and labels of crossing variables
    fieldList = [
      {
        title: areaLabel,
        field: areaLabel
      },
      {
        title: variablesLabel,
        field: 'crossJoinId'
      },
      ...fieldList
    ]

    // Loop over every area
    for (let areaId = 0; areaId < data_cross.metadata.areas.length; areaId++) {

      const areaName = data_cross.metadata.areas[areaId].label;

      // Build rows list
      for (let rowId = 0; rowId < totalRows; rowId++) {
        let row = {};
        for (let fieldId = 0; fieldId < totalFields; fieldId++) {
          row = {
            ...row,
            [data_cross.metadata.dimensions[0].values[fieldId]]: data_cross.data[areaId][rowId*totalFields + fieldId],
          }
        }

        // Add first value of the row, with the name of the row variable
        row = {
          [areaLabel]: areaName,
          'crossJoinId': data_cross.metadata.dimensions[1].labels[rowId],
          ...row,
        }

        // Add the row to the list of rows
        rowList.push(row);
      }
    }
    

  } else {
    // Build fields list
    for (let fieldId = 0; fieldId < totalFields; fieldId++) {
      fieldList.push({
        title: data_cross.metadata.dimensions[0].labels[fieldId].trim(),
        field: data_cross.metadata.dimensions[0].values[fieldId]
      });
    }  

    // Add first field with labels of crossing variables
    fieldList = [
      {
        title: variablesLabel,
        field: 'crossJoinId'
      },
      ...fieldList
    ]

    // Build rows list
    for (let rowId = 0; rowId < totalRows; rowId++) {
      let row = {};
      for (let fieldId = 0; fieldId < totalFields; fieldId++) {
        row = {
          ...row,
          [data_cross.metadata.dimensions[0].values[fieldId]]: data_cross.data[0][rowId*totalFields + fieldId],
        }
      }

      // Add first value of the row, with the name of the row variable
      row = {
        'crossJoinId': data_cross.metadata.dimensions[1].labels[rowId],
        ...row,
      }

      // Add the row to the list of rows
      rowList.push(row);
    }
  
  }

  return ({
    title: title,
    columns: fieldList,
    data: rowList
  });
}
