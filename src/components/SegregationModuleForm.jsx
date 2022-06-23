import React, { useState, createContext, useContext, useEffect } from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';
import { execSPC, loadJson } from '../utils/utils';
import { Link, useNavigate } from 'react-router-dom';
import { JSONContext } from '../Store';
import structureSample from '../tempData/structureSegregationTemplate.json';
import formSample from '../tempData/formSegregationTemplate.json';
import SpcBuilder from './SpcBuilder';
import censusVariablesConfig from './censusVariablesConfig';


export default function SegregationModuleForm() {

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

  const [segregationFormSet, setSegregationFormSet] = useState({
      label: 'Variable segregadora :',
      controlType: "select",
      controlClassName: "form-select",
      name: "segregation",
      items: []
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
  
  useEffect(() => {
    formData?.selectedCensus && setSegregationFormSet({
      ...segregationFormSet,
      items: censusVariablesConfig[formData.selectedCensus]['segregationVariables'].map((item, itemIndex) => {
        return ({id:item.formId, value: itemIndex, label: item.label})
      })
    });

    formData?.selectedCensus && setFilterFormSet({
      ...filterFormSet,
      items: censusVariablesConfig[formData.selectedCensus]['filterVariables'].map((item, itemIndex) => {
        return ({id: 'selector-' + item.variableName + itemIndex, value: itemIndex, label: item.selectLabel})
      })
    });
  }, [formData]);

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

    formValuesJSON[3] = {
      "name": censusVariablesConfig[formData.selectedCensus]['variables'][formData.selectedDA]["var2"],
      "label": censusVariablesConfig[formData.selectedCensus]['variables'][formData.selectedDA]["var2"],
      "entityCode": censusVariablesConfig[formData.selectedCensus]['variables'][formData.selectedDA]["entityCode"],
      "entityLabel": censusVariablesConfig[formData.selectedCensus]['variables'][formData.selectedDA]["entityLabel"],
      "value": censusVariablesConfig[formData.selectedCensus]['variables'][formData.selectedDA]["var2"]
    };

    formValuesJSON[0] = censusVariablesConfig[formData.selectedCensus]['segregationVariables'][formData.selectedSegregationFeature]['label'];
    formValuesJSON[1][0].value = censusVariablesConfig[formData.selectedCensus]['segregationVariables'][formData.selectedSegregationFeature]['name'];

    // it creates a list because so it's compatible with the other modules (which also return a list)
    let formValuesJSONList = [formValuesJSON];

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

  const submitForm = () => {

    setFormData({
      ...formData,
      selectedResultType: ['indicators']
    })

    setFormTypeQuery('segregation');
    let formValuesJSONList = buildQuery(formSample);
    let newSpc = '';

    formValuesJSONList.map((formValuesJSON, itemIndex) => {
      newSpc = newSpc + '\n' + SpcBuilder(structureSample, formValuesJSON);
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
    <h3>Seleccione Parámetros </h3>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item className="odisea-form-accordion-item" eventKey="0">
          <Accordion.Header className="odisea-form-accordion-header">Datos obligatorios*</Accordion.Header>
          <Accordion.Body>
          <Form.Group className="odisea-form-group">
            <Form.Label className="odisea-form-label" htmlFor="edit-filters">{ censusListFormSet.label }</Form.Label>
            <Form.Select
                id={ censusListFormSet.name }
                name={ censusListFormSet.name }
                className="form-select required"
                required="required"
                aria-required="true"
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
          <Form.Label className={ 'odisea-form-label' } htmlFor="edit-filters">{ DATypeFormSet.label }</Form.Label>
            { DATypeFormSet.items.map((item) => 
              <Form.Check 
                required
                type={ DATypeFormSet.controlType }
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
          <Form.Group className="odisea-form-group">
            <Form.Label className="odisea-form-label" htmlFor="edit-alias">{ segregationFormSet.label }</Form.Label>
            <Form.Select
              id="edit-alias"
              name="alias"
              className="form-select"
              required
              onChange={ (e) => {
                setFormData({
                  ...formData,
                  selectedSegregationFeature: e.target.value
                })
              } }
            >
              <option value="" defaultValue="selected">{ emptySelectText }</option>
              { segregationFormSet.items.map((item) => <option key={ item.id } value={ item.value }>{ item.label }</option>) }
            </Form.Select>
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="odisea-form-accordion-item" eventKey="1">
        <Accordion.Header className="odisea-form-accordion-header">Filtros opcionales</Accordion.Header>
        <Accordion.Body>
          <Form.Group className="odisea-form-group">
            <Form.Label className="odisea-form-label" htmlFor="edit-filters">{ filterFormSet.label }</Form.Label>
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
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <Form.Group className="odisea-form-group odisea-form-group-button">
      <Button type="submit" className="odisea-form-button-submit" onClick={() => {submitForm(); navigate('/visualizations');}}>{submitText}</Button>
    </Form.Group>
  </Form>
  </>
  )
}
