import React, { useState, createContext, useContext, useEffect } from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';
import { execSPC, loadJson } from '../utils/utils';
import { Link, useNavigate } from 'react-router-dom';
import { JSONContext } from '../Store';
import structureSample from '../tempData/structureSample.json';
import formSample from '../tempData/formSample.json';
import SpcBuilder from './SpcBuilder';
import { indexesMigrationTemplate } from './indexesTemplates';
import censusVariablesConfig from './censusVariablesConfig';


export default function MigrationModuleForm() {

  const {
    setResponseJSON,
    setTextSPC,
    setFormTypeQuery,
    formData,
    setFormData,
    setIsLoading,
    setFirstResponseJSON
  } = useContext(JSONContext);

  const [validated, setValidated] = useState(false);

  const [derivedFormSet, setDerivedFormSet] = useState({
    label: 'Derivada por:',
    controlType: "select",
    controlClassName: "form-select",
    name: "derived",
    items: []
  });

  const [derivedCheckboxes, setDerivedCheckboxes] = useState({
    //label: 'Tipo de resultado',
    label: '',
    controlType: "checkbox",
    controlClassName: "form-checkbox",
    name: "derived-checkboxes",
    items: [
      //{id: "edit-output-matrix", value: "matrix", label: "Matriz básica"},
      //{id: "edit-output-indicators", value: "indicators", label: "Indicadores"}
    ]
  });

  const [filterFormSet, setFilterFormSet] = useState({
    label: 'Filtrado por:',
    controlType: "select",
    controlClassName: "form-select",
    name: "filter",
    items: []
  });

  const [filterCheckboxes, setFilterCheckboxes] = useState({
    //label: 'Tipo de resultado',
    label: '',
    controlType: "checkbox",
    controlClassName: "form-checkbox",
    name: "filter-checkboxes",
    items: [
      //{id: "edit-output-matrix", value: "matrix", label: "Matriz básica"},
      //{id: "edit-output-indicators", value: "indicators", label: "Indicadores"}
    ]
  });

  const navigate = useNavigate();

  // reset form values when page loads
  useEffect(() => setFormData({}), []);

  // it controls derived selector
  useEffect(() => {
    formData?.selectedCensus && setDerivedFormSet({
      ...derivedFormSet,
      items: censusVariablesConfig[formData.selectedCensus]['derivedVariables'].map((item, itemIndex) => {
        return ({id: 'selector-' + item.variableName + itemIndex, value: itemIndex, label: item.selectLabel})
      })
    });

    formData?.selectedCensus && setFilterFormSet({
      ...filterFormSet,
      items: censusVariablesConfig[formData.selectedCensus]['filterVariables'].map((item, itemIndex) => {
        return ({id: 'selector-' + item.variableName + itemIndex, value: itemIndex, label: item.selectLabel})
      })
    });
  }, [formData]);

  // it controls derived checkboxes
  useEffect(() => {
    formData?.selectedCensus && formData?.selectedDerivedFeature && setDerivedCheckboxes({
      ...derivedCheckboxes,
      label: censusVariablesConfig[formData.selectedCensus]['derivedVariables'][formData.selectedDerivedFeature]['checkGroupLabel'],
      name: 'checkboxes-' + censusVariablesConfig[formData.selectedCensus]['derivedVariables'][formData.selectedDerivedFeature]['variableName'],
      items: censusVariablesConfig[formData.selectedCensus]['derivedVariables'][formData.selectedDerivedFeature]['checkItems'].map((item, itemIndex) => {
        return ({
          id: 'check-' + censusVariablesConfig[formData.selectedCensus]['derivedVariables'][formData.selectedDerivedFeature]['variableName'] + '-' + item.variableValue,
          value: item.variableValue,
          label: item.label
        })
      })
    });
  }, [derivedFormSet]);

  // it controls filter checkboxes
  useEffect(() => {
    formData?.selectedCensus && formData?.selectedFilterFeature && setFilterCheckboxes({
      ...filterCheckboxes,
      label: censusVariablesConfig[formData.selectedCensus]['filterVariables'][formData.selectedFilterFeature]['checkGroupLabel'],
      name: 'checkboxes-' + censusVariablesConfig[formData.selectedCensus]['filterVariables'][formData.selectedFilterFeature]['variableName'],
      items: censusVariablesConfig[formData.selectedCensus]['filterVariables'][formData.selectedFilterFeature]['checkItems'].map((item, itemIndex) => {
        return ({
          id: 'check-' + censusVariablesConfig[formData.selectedCensus]['filterVariables'][formData.selectedFilterFeature]['variableName'] + '-' + item.variableValue,
          value: item.variableValue,
          label: item.label
        })
      })
    });
  }, [filterFormSet]);

  const buildQuery = (formValuesJSON) => {

    // set titles as appropiate
    const titleLabels = {
      DAM: {
        'rec-pop': 'Matriz migración reciente | DAM',
        'nac-pop': 'Matriz migración toda la Vida | DAM'
      },
      DAME: {
        'rec-pop': 'Matriz migración reciente | DAME',
        'nac-pop': 'Matriz migración toda la Vida | DAME'
      }
    }

    // set title
    formValuesJSON[0] = titleLabels[formData.selectedDA][formData.selectedMigration];

    // set both variables for crossjoin
    formValuesJSON[1][0].value = censusVariablesConfig[formData.selectedCensus]['variables'][formData.selectedDA]['residence'];
    formValuesJSON[2].value = censusVariablesConfig[formData.selectedCensus]['variables'][formData.selectedDA][formData.selectedMigration];
    // set empty filter
    formValuesJSON[7] = '';

    let formValuesJSONList = [];

    // derived tables
    if (formData?.selectedDerivedClasses && formData.selectedDerivedClasses.length > 0) {
      formData.selectedDerivedClasses.map((item, itemIndex) => {
        formValuesJSONList[itemIndex] = {...formValuesJSON};
        formValuesJSONList[itemIndex][7] = `${censusVariablesConfig[formData.selectedCensus]['derivedVariables'][formData.selectedDerivedFeature]['variableName']} = ${item}`;
        formValuesJSONList[itemIndex][0] = `${formValuesJSONList[itemIndex][0]} (${censusVariablesConfig[formData.selectedCensus]['derivedVariables'][formData.selectedDerivedFeature]['variableName']} = ${item})`;
      });
    } else {
      formValuesJSONList[0] = formValuesJSON;
    }
    
    return (formValuesJSONList);

  }

  const applyFilters = (spcText) => {
    let newSpcText = spcText;
    if (formData?.selectedFilterClasses && formData.selectedFilterClasses.length > 0) {
      let fullNewFilterList = []
      formData.selectedFilterClasses.map((item) => {
        fullNewFilterList.push(`${censusVariablesConfig[formData.selectedCensus]['filterVariables'][formData.selectedFilterFeature]['variableName']} = ${item}`);
      });

      newSpcText = spcText.replace(/SELECTION ALL/gi, `filter ${fullNewFilterList.join(' OR ')}`)
    }

    return (newSpcText);
  };

  const cleanAndAddParameters = (spcText) => {
    spcText = spcText.replace(/RUNDEF Job/gi, '');
    spcText = spcText.replace(/SELECTION ALL/gi, '');

    spcText = '\nRUNDEF Job\nSELECTION ALL' + spcText;

    spcText = applyFilters(spcText);

    return(spcText);
  }

  const buildIndexSpc = (indexNumber, filterText, outputNameJSON) => {

    // set titles as appropiate
    const titleLabels = {
      DAM: {
        'rec-pop': 'Indicadores Totales para migración interna reciente | DAM',
        'nac-pop': 'Indicadores Totales para migración interna toda la Vida | DAM',
      },
      DAME: {
        'rec-pop': 'Indicadores Totales para migración interna reciente | DAME',
        'nac-pop': 'Indicadores Totales para migración interna toda la Vida | DAME',
      }
    }

    // Build query
    const formatedQuery = indexesMigrationTemplate(
      censusVariablesConfig[formData.selectedCensus]['variables'][formData.selectedDA][formData.selectedMigration],
      censusVariablesConfig[formData.selectedCensus]['variables'][formData.selectedDA]['residence'],
      censusVariablesConfig[formData.selectedCensus]['variables']['age'],
      titleLabels[formData.selectedDA][formData.selectedMigration],
      indexNumber,
      filterText,
      outputNameJSON
    );

    return (formatedQuery);
  }


  const submitForm = () => {
    setFormTypeQuery('migration');
    let formValuesJSONList = buildQuery(formSample);
    let newSpc = '';

    // iterate for derived tables
    formValuesJSONList.map((formValuesJSON, itemIndex) => {
      if (formData.selectedResultType.includes('matrix')) {
        newSpc = newSpc + '\n' + SpcBuilder(structureSample, formValuesJSON);
        // replace is temporal while I find a method to change file names.
        newSpc = newSpc.replace('out.json', `matrix-${itemIndex}.json`);
        newSpc = newSpc.replace('TABLE Tavg', `TABLE matrix${itemIndex}`);
      } else {
        newSpc = newSpc + 'RUNDEF Job SELECTION ALL'
      }
  
      if (formData.selectedResultType.includes('indicators')) {
        newSpc = newSpc + '\n' + buildIndexSpc(
          itemIndex,
          `${formValuesJSON[7]}`,
          `index-${itemIndex}.json` // fix this
        );
        // replace is temporal while I find a method to change file names.
        newSpc = newSpc.replace('TABLE Tavg', `TABLE index${itemIndex}`);
      }    
    });
    
    newSpc = cleanAndAddParameters(newSpc);

    setTextSPC(newSpc);
    setIsLoading(true);

    execSPC('frequency', censusVariablesConfig[formData.selectedCensus]["databaseAlias"], newSpc, (resp) => {
      //setResponseJSON(resp);
      //console.log(resp);
      const result = JSON.parse(resp);

      setFirstResponseJSON(result); // first response

      // set responses to empty
      setResponseJSON([]);

      // call the API for each result
      const requests = result.outputs.map(async (outputItem) => {
        let responses = {
          path: '',
          data: ''
        }

        await loadJson(result.id, outputItem.file, (jsonResult) => {
          responses.path = outputItem.file;
          responses.data = jsonResult;
        });
        
        return responses;
      })
      
      // when API finishes loading, set statuses
      Promise.all(requests).then((requests) => {
        setResponseJSON(requests);
        setIsLoading(false);
      });
    });
  }

  const censusListFormSet = {
    label: 'Países y censos disponibles:',
    //controlType: "checkbox",
    //controlClassName: "form-select",
    name: "census-list",
    items: censusVariablesConfig.map ((item, itemId) => { return({id: itemId, value: itemId, label: item.censusLabel}) })
  };

  const DATypeFormSet = {
    label: 'División Administrativa:',
    controlType: "radio",
    controlClassName: "form-radio",
    name: "damedam",
    items: [
      {id: "edit-damedam-dam", value: "DAM", label: "División Administrativa Mayor - DAM"},
      {id: "edit-damedam-dame", value: "DAME", label: "División Administrativa Menor - DAME"},
    ]
  };

  const migrationTypeFormSet = {
    label: 'Tipo de Migración:',
    controlType: "radio",
    controlClassName: "form-radio",
    name: "population",
    items: [
      {id: "edit-population-rec-pop", value: "rec-pop", label: "Fecha fija (Reciente)"},
      {id: "edit-population-nac-pop", value: "nac-pop", label: "Toda la vida"}
    ]
  };

  const resultTypeFormSet = {
    label: 'Tipo de resultado',
    controlType: "checkbox",
    controlClassName: "form-checkbox",
    name: "output[matrix-indicators]",
    items: [
      {id: "edit-output-matrix", value: "matrix", label: "Matriz básica"},
      {id: "edit-output-indicators", value: "indicators", label: "Indicadores"}
    ]
  };

  // validate submit form  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const submitText = 'Ejecutar';
  const emptySelectText = '- Seleccionar -';

  return (
    <>
    <h3> Seleccione Parámetros </h3>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <div className="odisea-parent">
        <div className="odisea-child1">
          <Accordion defaultActiveKey={['0']} alwaysOpen>
              <Accordion.Item className="odisea-form-accordion-item" eventKey="0">
                <Accordion.Header className="odisea-form-accordion-header">Datos obligatorios*</Accordion.Header>
                <Accordion.Body>
                  <div className="test">
                  <Form.Group className="odisea-form-group">
                    <Form.Label className="odisea-form-label" htmlFor="edit-filters">{ censusListFormSet.label }</Form.Label>
                    <Form.Select
                        id={ censusListFormSet.name }
                        name={ censusListFormSet.name }
                        required
                        aria-required="true"
                        onChange={ (e) => {
                          setFormData({
                            ...formData,
                            selectedCensus: e.target.value
                          })
                        } }
                      >
                        <option value="" defaultValue="selected">{ emptySelectText }</option>
                        { censusListFormSet.items.map((item, itemIndex) => <option key={ itemIndex } value={ item.value }>{ item.label }</option>) }
                    </Form.Select>
                  </Form.Group>
                  </div>
                  <div className="test">
                  <Form.Group className="odisea-form-group">
                    <Form.Label className="odisea-form-label" htmlFor="edit-filters">{ DATypeFormSet.label }</Form.Label>
                    { DATypeFormSet.items.map((item, itemIndex) =>
                      <Form.Check
                        required
                        type={ DATypeFormSet.controlType }
                        key = { itemIndex }
                        id={ item.id }
                        label={ item.label }
                        name={ DATypeFormSet.name }
                        value={ item.value }
                        onChange={ (e) => {
                          if (e.target.checked){
                            setFormData({
                              ...formData,
                              selectedDA: e.target.value
                            });
                          }
                        } }
                      />
                    )}
                  </Form.Group>
                  </div>
                  <div className="test">
                    <Form.Group className="odisea-form-group">
                    <Form.Label className="odisea-form-label" htmlFor="edit-filters">{ migrationTypeFormSet.label }</Form.Label>
                    { migrationTypeFormSet.items.map((item, itemIndex) =>
                      <Form.Check
                        required
                        key={ itemIndex }
                        type={ migrationTypeFormSet.controlType }
                        id={ item.id }
                        label={ item.label }
                        name={ migrationTypeFormSet.name }
                        value={ item.value }
                        onChange={ (e) => {
                          if (e.target.checked){
                            setFormData({
                              ...formData,
                              selectedMigration: e.target.value
                            });
                          }
                        } }
                      />
                    )}
                  </Form.Group>
                    </div>
                  <div className="test">
                      <Form.Group className="odisea-form-group">
                  <Form.Label className="odisea-form-label" htmlFor="edit-filters">{ resultTypeFormSet.label }</Form.Label>
                  { resultTypeFormSet.items.map((item, itemIndex) =>
                    <Form.Check
                      required
                      key = { itemIndex }
                      type={ resultTypeFormSet.controlType }
                      id={ item.id }
                      label={ item.label }
                      name={ resultTypeFormSet.name }
                      value={ item.value }
                      onChange={ (e) => {
                        let selectedResultTypeList = []
                        if (formData.hasOwnProperty('selectedResultType')) {
                          selectedResultTypeList = formData.selectedResultType;
                        }
                        if (e.target.checked){
                          setFormData({
                            ...formData,
                            selectedResultType: [...selectedResultTypeList, e.target.value]
                          });
                        } else {
                          setFormData({
                            ...formData,
                            selectedResultType: selectedResultTypeList.filter(item => item !== e.target.value)
                          });
                        }
                      } }
                    />
                  )}
                </Form.Group>
                      </div>
                </Accordion.Body>
              </Accordion.Item>
          </Accordion>
        </div>
        <div className="odisea-child2">
          <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item className="odisea-form-accordion-item" eventKey="0">
              <Accordion.Header className="odisea-form-accordion-header">Filtros opcionales</Accordion.Header>
              <Accordion.Body>
                <div className="test">
                  <Form.Group className="odisea-form-group">
                  <Form.Label className="odisea-form-label" htmlFor="edit-filters">{ derivedFormSet.label }</Form.Label>
                  <Form.Select
                    id="edit-alias"
                    name="alias"
                    onChange={ (e) => {
                      setFormData({
                        ...formData,
                        selectedDerivedFeature: e.target.value,
                        selectedDerivedClasses: []
                      });
                    } }
                  >
                    <option value="" defaultValue="selected">{ emptySelectText }</option>
                    { derivedFormSet.items.map((item) => <option key={ item.id } value={ item.value }>{ item.label }</option>) }
                  </Form.Select>
                </Form.Group>
                </div>
                <div className="test">
                  <Form.Group className="odisea-form-group">
                  <Form.Label className="odisea-form-label" htmlFor="edit-filters">{ derivedCheckboxes.label }</Form.Label>
                    { derivedCheckboxes.items.map((item) =>
                      <Form.Check
                        type={ derivedCheckboxes.controlType }
                        id={ item.id }
                        label={ item.label }
                        name={ derivedCheckboxes.name }
                        value={ item.value }
                        onChange={ (e) => {
                          let selectedDerivedClasses = []
                          if (formData.hasOwnProperty('selectedDerivedClasses')) {
                            selectedDerivedClasses = formData.selectedDerivedClasses;
                          }
                          if (e.target.checked){
                            setFormData({
                              ...formData,
                              selectedDerivedClasses: [...selectedDerivedClasses, e.target.value]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              selectedDerivedClasses: selectedDerivedClasses.filter(item => item !== e.target.value)
                            });
                          }
                        } }
                      />
                    )}
                </Form.Group>
                </div>
                <div className="test">
                  <Form.Group className="odisea-form-group">
                  <Form.Label className="odisea-form-label" htmlFor="edit-filters">{ filterFormSet.label }</Form.Label>
                  <Form.Select
                      id="edit-alias"
                      name="alias"
                      onChange={ (e) => {
                        setFormData({
                          ...formData,
                          selectedFilterFeature: e.target.value,
                          selectedFilterClasses: []
                        });
                      } }
                    >
                      <option value="" defaultValue="selected">{ emptySelectText }</option>
                      { filterFormSet.items.map((item) => <option key={ item.id } value={ item.value }>{ item.label }</option>) }
                  </Form.Select>
                </Form.Group>
                </div>
                <div className="test">
                  <Form.Group className="odisea-form-group">
                  <Form.Label className="odisea-form-label" htmlFor="edit-filters">{ filterCheckboxes.label }</Form.Label>
                    { filterCheckboxes.items.map((item) =>
                      <Form.Check
                        type={ filterCheckboxes.controlType }
                        id={ item.id }
                        label={ item.label }
                        name={ filterCheckboxes.name }
                        value={ item.value }
                        onChange={ (e) => {
                          let selectedFilterClasses = []
                          if (formData.hasOwnProperty('selectedFilterClasses')) {
                            selectedFilterClasses = formData.selectedFilterClasses;
                          }
                          if (e.target.checked){
                            setFormData({
                              ...formData,
                              selectedFilterClasses: [...selectedFilterClasses, e.target.value]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              selectedFilterClasses: selectedFilterClasses.filter(item => item !== e.target.value)
                            });
                          }
                        } }
                      />
                    )}
                </Form.Group>
                </div>
              </Accordion.Body>
          </Accordion.Item>
        </Accordion>
          <Form.Group className="odisea-form-group odisea-form-group-button">
            <Button type="submit" className="odisea-form-button-submit" onClick={() => {submitForm(); navigate('/visualizations');}}>{submitText}</Button>
          </Form.Group>
        </div>
      </div>
  </Form>

    </>
  )
}
