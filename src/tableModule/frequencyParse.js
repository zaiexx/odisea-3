//import React from 'react'


export default function frequencyParse(data_json) {
  //console.log(data_json);
  
  const title = data_json.metadata.title;

  const totalRows = data_json.metadata.dimensions[0].total;
  const variableLabel = data_json.metadata.dimensions[0].label;

  let fieldList = [];
  let rowList = [];

  if (data_json.metadata.areabreak) {

    const areaLabel = data_json.metadata.areabreak.entity; //.label

    fieldList = [{
        title: areaLabel,
        field: areaLabel
      }, {
        title: variableLabel,
        field: variableLabel
      }, {
        title: 'Casos',
        field: 'Casos'
      }, {
        title: '%',
        field: '%'
      }, {
        title: 'Acumulado %',
        field: 'Acumulado %'
      }
    ];

    for (let areaId = 0; areaId < data_json.metadata.areas.length; areaId++) {

      const areaName = data_json.metadata.areas[areaId].label;
      const variableTotal = data_json.data[areaId].reduce((a, b) => a + b, 0)
      let cumulatedSum = 0;
      
      for (let i = 0; i < totalRows; i++) {
        //console.log(i);
        cumulatedSum = cumulatedSum + (100*data_json.data[areaId][i]/variableTotal)
        rowList.push({
          [areaLabel]: areaName,
          [variableLabel]: data_json.metadata.dimensions[0].labels[i],
          'Casos': data_json.data[areaId][i],
          '%': (100*data_json.data[areaId][i]/variableTotal).toFixed(2),
          'Acumulado %': cumulatedSum.toFixed(2),
        });
      }
    }
  } else {
    fieldList = [{
        title: variableLabel,
        field: variableLabel
      }, {
        title: 'Casos',
        field: 'Casos'
      }, {
        title: '%',
        field: '%'
      }, {
        title: 'Acumulado %',
        field: 'Acumulado %'
      }
    ];

    const variableTotal = data_json.data[0].reduce((a, b) => a + b, 0)
    let cumulatedSum = 0;
    for (let i = 0; i < totalRows; i++) {
      cumulatedSum = cumulatedSum + (100*data_json.data[0][i]/variableTotal)
      rowList.push({
        [variableLabel]: data_json.metadata.dimensions[0].labels[i],
        'Casos': data_json.data[0][i],
        '%': (100*data_json.data[0][i]/variableTotal).toFixed(2),
        'Acumulado %': cumulatedSum.toFixed(2),
      });
    }
  }

  return ({
    title: title,
    columns: fieldList,
    data: rowList
  });
}
