import React from 'react'
import { Link } from 'react-router-dom';

export default function Banner() {

  const staticUrls = [
    {name: 'Naciones Unidas', url: 'http://www.un.org'},
    {name: 'CEPAL', url: 'https://www.cepal.org/'},
    {name: 'GIZ', url: 'https://www.giz.de/'},
    {name: 'REDATAM', url: 'https://www.cepal.org/en/topics/redatam'},
  ];

  const staticImages = {
      rightBanner: '/odisea/img/banner-derecha.png',
      leftBanner: '/odisea/img/banner-izquierda.png'
  };

  const titleText = {
      title: 'Portal ODISEA',
      subtitle: 'Desplazamiento Interno de la Población en ALC',
      subsubtitle: 'Migración, movilidad y segregación residencial'
  };

  return (
    <>
    <div class="odisea-page-related-links">
      <ul>
        { staticUrls.map ((url) => <li><a key = {url.url} href={url.url}> {url.name} </a></li>)}
      </ul>
    </div>
    <div class="odisea-page-header odisea-page-header-flex">
      <div class="odisea-page-header-logo1">
        <Link to="/" className='site-logo' rel='home' title='Portal Odisea'>
          <img src={staticImages.leftBanner} alt="Inicio" />
        </ Link>
      </div>
      <div class="odisea-page-header-title">
        <h1>{ titleText.title } </h1>
        <h2>{ titleText.subtitle }</h2>
        <h3>{ titleText.subsubtitle }</h3>
      </div>
      <div class="odisea-page-header-logo2">
        <img src={staticImages.rightBanner} alt="Inicio" />
      </div>
    </div>

    </>
  )
}
