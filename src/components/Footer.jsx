import React from 'react'

export default function Footer() {

  return (
    <div class="odisea-page-footer">
      <div class="odisea-page-footer-text">
        <h2> Síguenos en nuestras redes sociales </h2>
      </div>
      <div className="odisea-page-footer-rrss">
        <ul>
          <li>
              <a href="https://facebook.com/cepal.onu" target="_blank">
                <span class="fa-stack fa-lg">
                  <i className="fa fa-circle fa-stack-2x odisea-page-footer-rrss-circle"></i>
                  <i className="fa fa-facebook fa-stack-1x fa odisea-page-footer-rrss-logo"></i>
                </span>
              </a>
          </li>
          <li>
              <a href="https://twitter.com/cepal_onu" target="_blank">
                <span className="fa-stack fa-lg">
                  <i className="fa fa-circle fa-stack-2x odisea-page-footer-rrss-circle"></i>
                  <i className="fa fa-twitter fa-stack-1x fa odisea-page-footer-rrss-logo"></i>
                </span>
              </a>
          </li>
          <li>
              <a href="https://www.youtube.com/user/CEPALONU" target="_blank">
                <span className="fa-stack fa-lg">
                  <i className="fa fa-circle fa-stack-2x odisea-page-footer-rrss-circle"></i>
                  <i className="fa fa-youtube fa-stack-1x fa odisea-page-footer-rrss-logo"></i>
                </span>
              </a>
          </li>
          <li>
              <a href="https://www.flickr.com/photos/cepal" target="_blank">
                <span className="fa-stack fa-lg">
                  <i className="fa fa-circle fa-stack-2x odisea-page-footer-rrss-circle"></i>
                  <i className="fa fa-flickr fa-stack-1x fa odisea-page-footer-rrss-logo"></i>
                </span>
              </a>
          </li>
        </ul>
      </div>
    </div>
  )
  
  return (
    <footer role="contentinfo" className="l-footer">
      <div className="l-footer-container">
      <div className="site-footer__top clearfix">
          <div className="region region-footer-first">
          <div id="block-cepal-social-social-links" className="block block--cepal-social block--cepal-social-social-links">
              <div className="block__content">
              <div className="clearfix text-formatted field field--name-body field--type-text-with-summary field--label-hidden field__item">
                  <h2> Síguenos en nuestras redes sociales </h2>
                  <ul className=" social-links">
                  <li>
                      <a href="https://facebook.com/cepal.onu" target="_blank">
                      <i className="fa fa-facebook"></i>
                      </a>
                  </li>
                  <li>
                      <a href="https://twitter.com/cepal_onu" target="_blank">
                      <i className="fa fa-twitter"></i>
                      </a>
                  </li>
                  <li>
                      <a href="https://www.youtube.com/user/CEPALONU" target="_blank">
                      <i className="fa fa-youtube"></i>
                      </a>
                  </li>
                  <li>
                      <a href="https://www.flickr.com/photos/cepal" target="_blank">
                      <i className="fa fa-flickr"></i>
                      </a>
                  </li>
                  </ul>
              </div>
              </div>
          </div>
          </div>
      </div>
      </div>
    </footer>
  )
}
