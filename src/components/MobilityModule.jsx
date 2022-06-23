import React, {useState} from 'react'
import MobilityModuleForm from './MobilityModuleForm'
import NavBar from './NavBar'

export default function MobilityModule() {

  const title = 'Movilidad Cotidiana';
  const description = 'Varios censos de la región incluyen una o más consultas sobre este tema en la década de 2010 (CEPAL, 2019, Aspectos conceptuales de los censos de población y vivienda: desafíos para la definición de contenidos incluyentes en la ronda 2020, <a href="https://www.cepal.org/es/publicaciones/44944-aspectos-conceptuales-censos-poblacion-vivienda-desafios-la-definicion" target="_blank"> Seminarios y Conferencias, N° 94 </a> (LC/TS.2019/67), Santiago, pp. 409-472.). ODISEA replica las funcionalidades desarrolladas para el tema de migración en materia de manipulación de la matriz de origen-destino y representación gráfica y cartográfica para los flujos e indicadores de movilidad cotidiana para trabajar y/o estudiar. Pese a sus similitudes, hay diferencias esenciales entre ambos desplazamientos, por lo que sus indicadores difieren así como la interpretación de los flujos de las matrices, por lo cual se alerta a los usuarios al respecto.<br>Actualmente el Módulo de Movilidad se encuentra disponible para la <b>División Administrativa Menor</b> y para el tipo de población <b> total ocupada</b>.';

  return (
    <>
    <NavBar />
    <div class="odisea-page-content odisea-page-content-flex">
      <div class="odisea-page-content-form">
        <MobilityModuleForm />
      </div>
      <div class="odisea-page-content-right-text">
        <h3>{title}</h3>
        <p><div dangerouslySetInnerHTML={{__html: description}} /></p>
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
                      <MobilityModuleForm />
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
