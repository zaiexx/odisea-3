import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

export default function Home() {

  const textContent = "En el marco del proyecto <strong>“Ciudades inclusivas, sostenibles e inteligentes como parte de la Agenda 2030 para el Desarrollo Sostenible en América Latina y el Caribe”</strong> el CELADE- División de Población de la CEPAL, implementó éste sitio con apoyo de la <em>Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) GmbH</em>, tendiente a mejorar y potenciar el uso de datos censales sobre desigualdad territorial y segregación residencial, migración interna y movilidad cotidiana para trabajar o estudiar de la población, para diagnósticos, políticas, programas, toma de decisiones, evaluaciones, investigación y usos de la comunidad en general, relativos a la gestión y planificación urbana y metropolitana en países y ciudades de la región." + "<br /><br /> En el presente sitio, los visitantes y usuarios podrán generar resultados e indicadores sobre los temas antes indicados a partir de microdatos censales disponibles para los países mencionados. Estos resultados e indicadores podrán visualizarse de manera rápida, precisa e interactiva, en tablas, gráficos y mapas. Esto aumentará la rapidez de los procesamientos, pues ya estarán habilitadas y estandarizadas las variables más complejas necesarias para ello. También expandirá la versatilidad y ductilidad de la manipulación de tablas (en particular de matrices de origen y destino) para producir indicadores novedosos y útiles. Asimismo, ofrecerá una visión espacial y cartográfica que permitirá situar los análisis a escala territorial de forma detallada y comunicativa. Y, finalmente, posibilitará el despliegue gráfico de datos, que siempre contribuye a la descripción e interpretación de los fenómenos estudiados.";

  return (
    <div className="odisea-page-home odisea-page-home-flex">
      <div className="odisea-page-home-content">
        <p><div dangerouslySetInnerHTML={{__html: textContent}} /></p>
      </div>
      <div className="odisea-page-home-links">
        <div className="odisea-page-home-links-title">
          Consulta los distintos módulos del Portal ODISEA
        </div>
        <div className="odisea-page-home-links-buttons">
          <Link to="/migration" className="">
            <Button variant="primary" className="odisea-page-home-links-buttons-button">
              Migración
            </Button>
          </Link>
          <Link to="/mobility" className="">
            <Button variant="primary" className="odisea-page-home-links-buttons-button">
              Movilidad
            </Button>
          </Link>
          <Link to="/segregation" className="">
            <Button variant="primary" className="odisea-page-home-links-buttons-button">
              Segregación
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <>
    <div className="l-content" role="main">
      <div className="home-content">
        <div className="l-home">
          <div className="region region-content">
            <article data-history-node-id="4" role="article" about="/odisea/home" typeof="schema:WebPage" className="node node--type-page node--view-mode-full">
              <span property="schema:name" content="Bienvenidos a Desplazamiento Interno de la Población en ALC" className="rdf-meta hidden"></span>
              <div className="node__content">
                <div property="schema:text" className="clearfix text-formatted field field--name-body field--type-text-with-summary field--label-hidden field__item">
                  <p>
                    <br />En el marco del proyecto <strong>“Ciudades inclusivas, sostenibles e inteligentes como parte de la Agenda 2030 para el Desarrollo Sostenible en América Latina y el Caribe”</strong> el CELADE- División de Población de la CEPAL, implementó éste sitio con apoyo de la <em>Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) GmbH</em>, tendiente a mejorar y potenciar el uso de datos censales sobre desigualdad territorial y segregación residencial, migración interna y movilidad cotidiana para trabajar o estudiar de la población, para diagnósticos, políticas, programas, toma de decisiones, evaluaciones, investigación y usos de la comunidad en general, relativos a la gestión y planificación urbana y metropolitana en países y ciudades de la región. <br />
                    <br /> En el presente sitio, los visitantes y usuarios podrán generar resultados e indicadores sobre los temas antes indicados a partir de microdatos censales disponibles para los países mencionados. Estos resultados e indicadores podrán visualizarse de manera rápida, precisa e interactiva, en tablas, gráficos y mapas. Esto aumentará la rapidez de los procesamientos, pues ya estarán habilitadas y estandarizadas las variables más complejas necesarias para ello. También expandirá la versatilidad y ductilidad de la manipulación de tablas (en particular de matrices de origen y destino) para producir indicadores novedosos y útiles. Asimismo, ofrecerá una visión espacial y cartográfica que permitirá situar los análisis a escala territorial de forma detallada y comunicativa. Y, finalmente, posibilitará el despliegue gráfico de datos, que siempre contribuye a la descripción e interpretación de los fenómenos estudiados.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
    <div className=" l-home">
      <div className="l-content">
        <div className="home-content-title">
          <h2>Consulta los distintos módulos del Portal ODISEA</h2>
        </div>
        <div className="home-content-buttons">
          <Link to="/migration" className="link--button">Migración</Link>
          <Link to="/mobility" className="link--button">Movilidad </Link>
          <Link to="/segregation" className="link--button">Segregación </Link>
        </div>
      </div>
    </div>
    </>
  )
}
