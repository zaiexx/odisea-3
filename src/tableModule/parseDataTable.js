import frequencyParse from './frequencyParse';
import crossParse from './crossParse';
import areaListParse from './areaListParse';

export default function parseDataTable(dataJSON) {
  
  let processedData = {};

  if (dataJSON.type === 'AREALIST') {
    processedData = areaListParse(dataJSON);
  } else if (dataJSON.type === 'CROSSTABS') {
    if (dataJSON.metadata.dimensions.length === 1) {
      processedData = frequencyParse(dataJSON);
    } else if (dataJSON.metadata.dimensions.length === 2) {
      processedData = crossParse(dataJSON);
    }
  }

    return (processedData);
  }
  
  