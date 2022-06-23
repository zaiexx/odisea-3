import React, { useState, createContext, useContext, useEffect } from 'react';
import { Accordion, Button, Form, InputGroup } from 'react-bootstrap';
import { execSPC, loadJson } from '../utils/utils';
import { Link, useNavigate } from 'react-router-dom';
import { JSONContext } from '../Store';
import structureSample from '../tempData/structureSample.json';
import formSample from '../tempData/formSample.json';
import SpcBuilder from './SpcBuilder';
import { indexesMobilityTemplate } from './indexesTemplates';
import censusVariablesConfig from './censusVariablesConfig'


export default function MobilityModuleForm() {

  const {
    setResponseJSON,
    setTextSPC,
    setFormTypeQuery,
    setIsLoading,
    formData,
    setFormData,
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
    formValuesJSON[0] = 'Matriz origen-destino, según tipo de conmutación';
    formValuesJSON[1][0].label = censusVariablesConfig[formData.selectedCensus]['labels']['DAME']['residence'];
    formValuesJSON[1][0].value = censusVariablesConfig[formData.selectedCensus]['variables']['DAME']['residence'];
    formValuesJSON[2].label = censusVariablesConfig[formData.selectedCensus]['labels']['DAME']['commuting'];
    formValuesJSON[2].value = censusVariablesConfig[formData.selectedCensus]['variables']['DAME']['commuting'];
    formValuesJSON[7] = `${censusVariablesConfig[formData.selectedCensus]['variables']['DAME']['residence']} > 0 \
      AND ${censusVariablesConfig[formData.selectedCensus]['variables']['DAME']['commuting']} > 0`;

    let formValuesJSONList = [];
    
    // derived tables
    if (formData?.selectedDerivedClasses && formData.selectedDerivedClasses.length > 0) {
      formData.selectedDerivedClasses.map((item, itemIndex) => {
        formValuesJSONList[itemIndex] = {...formValuesJSON};
        formValuesJSONList[itemIndex][7] = `${formValuesJSONList[itemIndex][7]} AND \
          ${censusVariablesConfig[formData.selectedCensus]['derivedVariables'][formData.selectedDerivedFeature]['variableName']} = ${item}`;
        formValuesJSONList[itemIndex][0] = `${formValuesJSONList[itemIndex][0]} (${censusVariablesConfig[formData.selectedCensus]['derivedVariables'][formData.selectedDerivedFeature]['variableName']} = ${item})`;
      });
    } else {
      formValuesJSONList[0] = formValuesJSON;
    }
    
    return (formValuesJSONList);

    //return (formValuesJSON);

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

  const submitForm = () => {

    setFormData({
      ...formData,
      selectedDA: 'DAME'
    })

    setFormTypeQuery('mobility');
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
        newSpc = newSpc + '\n' + indexesMobilityTemplate(
          itemIndex,
          `(${formValuesJSON[7]})`,
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
    <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item className="odisea-form-accordion-item" eventKey="0">
        <Accordion.Header className="odisea-form-accordion-header">Datos obligatorios*</Accordion.Header>
        <Accordion.Body>
          <Form.Group className="odisea-form-group">
            <Form.Label className={ 'odisea-form-label' } htmlFor="edit-filters">{ censusListFormSet.label }</Form.Label>
            <Form.Select
              id={ censusListFormSet.name }
              name={ censusListFormSet.name }
              className="form-select"
              aria-required="true"
              required
              /* isInvalid */
              onChange={ (e) => {
              setFormData({
              ...formData,
              selectedCensus: e.target.value
              })
              } }
            >
              <option value="" defaultValue="selected">{ emptySelectText }</option>
              { censusListFormSet.items.map((item) => <option key={ item.id } value={ item.value }>{ item.label }</option>) }
            </Form.Select>
          </Form.Group>
          <Form.Group className="odisea-form-group">
            <Form.Label className={ 'odisea-form-label' } htmlFor="">{ resultTypeFormSet.label }</Form.Label>
            { resultTypeFormSet.items.map((item) => 
            <Form.Check
            className={ 'odisea-form-check' }
            required 
            type={ resultTypeFormSet.controlType }
            id= { item.id }
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
            }}
            />
            )}  
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>
    <Accordion.Item className="odisea-form-accordion-item" eventKey="1">
      <Accordion.Header className="odisea-form-accordion-header">Filtros opcionales</Accordion.Header>
        <Accordion.Body>
          <Form.Group className="odisea-form-group">
            <Form.Label className={ 'odisea-form-label' } htmlFor="edit-filters">{ derivedFormSet.label }</Form.Label>
            <Form.Select
              id="edit-alias"
              name="alias"
              className="form-select"
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
          <Form.Group className="odisea-form-group">
            <Form.Label className={ 'odisea-form-label' } htmlFor="edit-filters">{ derivedCheckboxes.label }</Form.Label>
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
          <Form.Group className="odisea-form-group">
            <Form.Label className={ 'odisea-form-label' } htmlFor="edit-filters">{ filterFormSet.label }</Form.Label>
            <Form.Select
              id="edit-alias"
              name="alias"
              className="form-select"
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
          <Form.Group className="odisea-form-group">
            <Form.Label className={ 'odisea-form-label' } htmlFor="edit-filters">{ filterCheckboxes.label }</Form.Label>
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
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    {/*
    <Form.Group>
      <Form.Label htmlFor="edit-filters">¿Cómo desea visualizar los resultados?</Form.Label>
      <input data-drupal-selector="edit-visors-visores" type="radio" id="edit-visors-visores" name="visors" value="visores" defaultChecked="checked" className="form-radio"/>
      <Form.Label htmlFor="edit-visors-visores" className="option">Gráficos, Mapas, Tablas</Form.Label>
      <input data-drupal-selector="edit-visors-query" type="radio" id="edit-visors-query" name="visors" value="query" className="form-radio"/>
      <Form.Label htmlFor="edit-visors-query" className="option">Solo Query Redatam</Form.Label>
    </Form.Group>
    */}
    <Form.Group className="odisea-form-group odisea-form-group-button">
      <Button type="submit" className="odisea-form-button-submit" onClick={() => {submitForm(); navigate('/visualizations');}}>{submitText}</Button>
    </Form.Group>
    </Form>
    </>
    )
}
