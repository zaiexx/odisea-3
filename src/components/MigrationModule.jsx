import React, {useState} from 'react'
import MigrationModuleForm from './MigrationModuleForm'
import NavBar from './NavBar'
import {Accordion} from "react-bootstrap";

export default function MigrationModule() {

  const title = '';
  const description = 'Todos los censos de la región incluyen preguntas para captar la migración interna, porque, en general, no hay fuentes alternativas para captar estos desplazamientos. Las dos preguntas más usadas para captar esta migración en los censos refieren al lugar de nacimiento y al lugar de residencia en una fecha fija anterior (normalmente 5 años). Ambas preguntas entregan distintas estimaciones de la migración con diferente utilidad para análisis y políticas (CELADE-PROLAP,1997, Demografía I, México, D.F., PROLAP, UNAM); Rodríguez, J. (2009). La captación de la migración interna mediante censos de población: la experiencia de la ronda de 2000 y sus lecciones para la ronda de 2010 en América Latina y el Caribe, LC/G.2409-P, Notas de Población No 88, Santiago de Chile, págs. 63-95; Cabella, W. D. Macadar, M. Ruiz y J. Rodriguez (2014), Los datos demográficos Alcances, limitaciones y métodos de evaluación, CEPAL, Santiago, <a href="https://repositorio.cepal.org/bitstream/handle/11362/37145/1/S1420555_es.pdf" target="_blank">Serie Manuales, No. 82 </a>, pp. 143-167;). Con ambas preguntas se generan matrices de migración (origen-destino) que captan migrantes (un solo movimiento) y que son el principal instrumento para la cuantificación y análisis de la migración. Entonces, ODISEA genera estas matrices (totales y con filtros seleccionados) y luego permite su manipulación versatil y fluida para obtener indicadores estándares y novedosos, los que, además, representa de manera dinámica en mapas y gráficos. Se llama la atención sobre funcionalidades novedosas como: el intercambio bilateral, la selección de jerarquías de entidades según el intercambio con la entidad de referencia, y la selección de agrupaciones de DAM y DAME para definir orígenes y destino aglutinados, lo que facilita, por ejemplo, la generación de datos migratorios de áreas metropolitanas u otras áreas de inter;e mediante la agrupación de las DAMEs que las componen, y su representación cartográfica y gráfica.';

  return (
    <>
    <NavBar />
    <div class="odisea-page-content odisea-page-content-flex">
      <div class="odisea-page-content-form">
        <MigrationModuleForm />
      </div>
    </div>

    <div class="odisea-page-content odisea-page-content-flex">
      <div class="odisea-page-content-more">
        <h3>Migración</h3>
        <div class="odisea-parent">
          <div class="odisea-child1">
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item className="odisea-form-accordion-item" eventKey="2">
              <Accordion.Header className="odisea-form-accordion-header">Más información*</Accordion.Header>
              <Accordion.Body>
                <h3>{title}</h3>
                <p><div dangerouslySetInnerHTML={{__html: description}} /></p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          </div>
        </div>
        </div>
      </div>
    </>
  )

  return (
    <>
    <NavBar />
    <div className="l-main">
      <div className="l-content" role="main">
        <div id="section-top" className="section-top">
          <div className="radix-layouts-top panel-panel">
            <div className="container">
              <div className="panel-panel-inner">
                <div className="panel-pane pane-entity-field pane-taxonomy-term-description-field">
                  <div className="row">
                    <div className="col-md-6">
                      <MigrationModuleForm />
                    </div>
                    <div className="col-md-6">
                      <div id="sidebar" className="column sidebar">
                        <div className="region region-sidebar">
                          <div id="block-contenidomigracion" className="block block-block-content block-block-contenta476b266-5531-48b0-a4a7-5eb8e5f3e2b2">
                            <div className="clearfix text-formatted field field--name-body field--type-text-with-summary field--label-hidden field__item">
                              <h3>{title}</h3>
                              <div style={{"textAlign":"justify"}}>{description}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
