import React, { useState, createContext, useContext, useEffect } from 'react';
import { JSONContext } from '../Store';
import VisualizationsNavBar from './VisualizationsNavBar';
import { useNavigate } from "react-router-dom";

//import TableModule from '../tableModule/TableModule';
//import TableModule from 'odisea_tablas';
import MapsCEPAL from '../visualization_modules/maps/maps.react.js';
import VisualizationsSPC from './VisualizationsSPC';
import NavBar from './NavBar';

import censusVariablesConfig from './censusVariablesConfig';
import { Tabs, Tab, Spinner, Form, Row, Col } from 'react-bootstrap';
import { Buffer } from 'buffer';

export default function Visualizations(props) {

  const { ENDPOINT_DEPOT } = window.config;
  
  const {responseJSON, firstResponseJSON, textSPC, formTypeQuery, formData, isLoading} = useContext(JSONContext);

  // to reload map tab when it's selected, to avoid selector conflicts between maps and table sources
  const [key, setKey] = useState('maps');

  const dataset64 = Buffer.from(
    JSON.stringify({...firstResponseJSON, 'path': ENDPOINT_DEPOT + '/tempo/'}),
    'utf8'
  ).toString('base64');
  //const dataset64 = 'pending';
  //const dataset64 = btoa(responseJSON);

  // <Nav.Link eventKey="disabled" disabled> for disabled tabs

  //const navigate = useNavigate();

  //if (formTypeQuery === '') {navigate('/')};
  
  const [mapOptions, setMapOptions] = useState({});
  const [selectedTableSource, setSelectedTableSource] = useState(0);

  useEffect(() => {

    // add indexes and matrix options to maps

    // set a temporary variable, inside the function
    let configMapOptions = {
      options: {
        'geoJSON': ENDPOINT_DEPOT + censusVariablesConfig[formData.selectedCensus]['DAPaths'][formData.selectedDA]['geoJSON'],
        'centroids': ENDPOINT_DEPOT + censusVariablesConfig[formData.selectedCensus]['DAPaths'][formData.selectedDA]['centroids'],
        'codeFeature': censusVariablesConfig[formData.selectedCensus]['DAPaths'][formData.selectedDA]['codeFeature'],
        'codeFeatureNum': censusVariablesConfig[formData.selectedCensus]['DAPaths'][formData.selectedDA]['codeFeatureNum'],
        languageFolder: "visualization_modules/maps/lang/"
      },
      modules: []
    }

    let matrixJSONPath = '';
    let indicatorsJSONPath = '';

    //responseJSON.map((responseJSONItem) => {
    if (responseJSON[selectedTableSource]?.path) {
      const parsedData = JSON.parse(responseJSON[selectedTableSource].data); // REVIEW!!!!!!!!!
      if (parsedData?.type) {
        switch (parsedData.type) {
          case 'CROSSTABS':
            matrixJSONPath = ENDPOINT_DEPOT + '/tempo/123456/' + responseJSON[selectedTableSource].path;
            break;
          case 'AREALIST':
            indicatorsJSONPath = ENDPOINT_DEPOT + '/tempo/123456/' + responseJSON[selectedTableSource].path;
            break;
          default:
            break;
        }
      }
    }
    //});

    if (formData.selectedResultType.includes('matrix') & matrixJSONPath !== '') {
      switch (formTypeQuery) {
        case 'migration':
          configMapOptions = {
            ...configMapOptions,
            modules: [
              ...configMapOptions.modules, {
                module: 'migration',
                active: true,
                options: {
                  dataJSON: matrixJSONPath //outJsonPath
                }
              }
            ]
          };
          break;
        case 'mobility':
          configMapOptions = {
            ...configMapOptions,
            modules: [
              ...configMapOptions.modules, {
                module: 'mobility',
                active: true,
                options: {
                  dataJSON: matrixJSONPath //outJsonPath
                }
              }
            ]
          };
          break;
        default:
          break;
      }
    }
  
    // Indexes for maps:
    if (formData.selectedResultType.includes('indicators') & indicatorsJSONPath !== '') {
      switch (formTypeQuery) {
        case 'segregation':
          configMapOptions = {
            ...configMapOptions,
            modules: [
              ...configMapOptions.modules, {
                module: 'segregation',
                active: true,
                options: {
                segregationJSON: indicatorsJSONPath
                }
              }
            ]
          };
          break;
        default:
          configMapOptions = {
            ...configMapOptions,
            modules: [
              ...configMapOptions.modules, {
                module: 'tablelist',
                options: {
                  tablelistJSON: indicatorsJSONPath
                }
              }
            ]
          };
          break;
      }
    }

    setMapOptions(configMapOptions);

  }, [selectedTableSource, responseJSON]);

  const selectSource = (
    <Form className="odisea-page-visualizations-source-selector">
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={3}>Resultado: </Form.Label>
        <Col sm={9}>
          <Form.Select
            id={ 'table-source-selector' }
            name={ 'table-source-selector' }
            className="form-select required"
            required="required"
            aria-required="true"
            value={ selectedTableSource }
            onChange={ (e) => {
              setSelectedTableSource(e.target.value)
            } }
          >
            {
              responseJSON.map((data, responseId) => 
                <option key={ responseId } value={ responseId.toString() }>{JSON.parse(data.data)?.metadata?.title && JSON.parse(data.data).metadata.title }</option>
              )
            }
          </Form.Select>
        </Col>
      </Form.Group>
    </Form>
  )

  const renderVisualizations = (
    <>
    <div className="odisea-page-visualizations">
    <NavBar />
    <Tabs onSelect={(k) => setKey(k)} defaultActiveKey="maps" id="tabs-visualization-modules" className="mb-3 justify-content-end">
      <Tab eventKey="maps" title="Mapas">
        {selectSource}
        {!isLoading && key==="maps" && <MapsCEPAL
        //key={spcOutKey}
        path={'visualization_modules/maps'}
        options={mapOptions}
        style={{
          height: '80vh',
          minHeight: '600px',
          width: '100%'
        }}
        />
        }
      </Tab>
      <Tab eventKey="graphs" title="Gráficos">
        <iframe
          key={14645156488461} //</Tab>{spcOutKey}
          src={`visualization_modules/charts/index.html?datasets=${dataset64}`}
          width="100%"
          height="800px"
          style={{
            height: '80vh',
            minHeight: '600px',
            width: '100%'
          }}
        ></iframe>
      </Tab>
      <Tab eventKey="tables" title="Listas">
        {selectSource}
        {/*!isLoading && <TableModule JSONData={ JSON.parse(responseJSON[selectedTableSource].data) } />*/}
      </Tab>
      <Tab eventKey="spcCode" title="Programa">
        <VisualizationsSPC textSourceCodeSPC={ textSPC }/>
      </Tab>
    </Tabs>
    </div>
    </>
  )

  return (
    <>
    {isLoading ? <Spinner animation="border" /> : renderVisualizations}
    </>
  )
}
