import React, {useState} from 'react'
import SegregationModuleForm from './SegregationModuleForm'
import NavBar from './NavBar'

export default function SegregationModule() {

  const title = 'Desigualdad territorial y Segregación residencial';
  const description = 'América Latina es la región más desigual del mundo y esta desigualdad tiene diversas facetas. Entre ellas está la desigualdad territorial. Esta opera a diferentes escalas territoriales. La escala más agregada suele ser la de DAM (División Administrativa Mayor), aunque en algunos países puede existir entidades geográficas más agregadas incluso, como grandes áreas ecológicas constituidas por más de una DAM. Luego suele ser la DAME (División Administrativa Menor) y a continuación hay varias entidades más desagregadas que pueden llegar hasta el nivel de manzana o incluso coordenada geográfica. La desigualdad territorial va en desmedro de quienes residen en las zonas más desaventajas, vulnerables, desprovistas y postergadas. La falta de recursos y oportunidades en ellas limita el ejercicio de derechos y tiene a reproducir las desventajas, pobreza y desigualdad. Por ello, es necesario conocerla y medirla para poder actuar con el objetivo de reducirla. Con ODISEA es posible calcular tres indicadores de desigualdad territorial que se desarrollaron, principalmente, para el estudio de la segregación residencial, una modalidad de desigualdad territorial relacionada con la separación geográfica de grupos socioeconómico en ciudades. Esta separación típicamente beneficia a los grupos acomodados y perjudica a los grupos desaventajados (<a href=" https://www.cepal.org/es/publicaciones/37626-panorama-social-america-latina-2014" target="_blank">CEPAL, 2014, Panorama Social de América Latina </a> (LC/G.2635-P), Santiago de Chile,). No obstante su uso principal para la medición de la segregación residencial, estos indicadores también son útiles para la medición de la desigualdad territorial en general, desde la perspectiva de la similitud/diferencia entre la distribución geográfica de un grupo de referencia y el resto de la población y las probabilidades de que una persona promedio de un grupo comparta la geografía (DAM, DAME, barrio, manzana) con personas del mismo grupo y del resto de la población. Cabe destacar que hay muchos más indicadores para medir la segregación residencial y la desigualdad territorial y que en esta versión de ODISEA la escala territorial más desagregada a la que se llega es la DAME, que es más bien agregada para los análisis estándares. Estos últimos suelen realizarse a escala de barrios y manzanas, pero la falta de cartografía censal digital a esa escala impidió llegar a tal nivel de desagregación.';

  return (
    <>
    <NavBar />
    <div class="odisea-page-content odisea-page-content-flex">
      <div class="odisea-page-content-form">
        <SegregationModuleForm />
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
                      <SegregationModuleForm />
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
