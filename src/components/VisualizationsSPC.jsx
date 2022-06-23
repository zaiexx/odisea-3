import React from 'react';
import { Card } from 'react-bootstrap';

export default function VisualizationsSPC({ textSourceCodeSPC }) {

  const formatSPCText = (SPCText) => {
    let formatedText = SPCText;
    const keyWords = [
      'SELECTION ',
      'TABLE ',
      'TABLE ',
      'TITLE ',
      'CROSSTABS ',
      ' FOR ',
      'OUTPUTFILE ',
      'FILTER ',
      'FREQ '
    ]
    
    keyWords.map((word) => {
      formatedText = formatedText.replaceAll(word.toLowerCase(), '<br>' + word.toLowerCase());
      formatedText = formatedText.replaceAll(word.toUpperCase(), '<br>' + word.toUpperCase());
    });

    formatedText = formatedText.replaceAll('\\"', '"')

    return (formatedText);

  };

  return (
    <div className="odisea-page-visualizations-spc-layout-flex">
      <Card className="odisea-page-visualizations-spc-card">
        <Card.Body><div dangerouslySetInnerHTML={{__html: formatSPCText(textSourceCodeSPC)}} /></Card.Body>
      </Card>
    </div>
  )
}
