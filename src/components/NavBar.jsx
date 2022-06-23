import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar as reactNavbar, Container, Nav} from 'react-bootstrap';
import { useLocation } from 'react-router-dom'

export default function NavBar() {

  const currentLocation = useLocation();

  return (
    <>
    <div class="odisea-page-navbar">
    <reactNavbar bg="dark" variant="dark">
      <Nav className="odisea-page-navbar">
        <Link to='/'>Home</Link>
        <Link to='/migration' className={currentLocation.pathname === '/migration' && 'active'}>Migración</Link>
        <Link to="/mobility" className={currentLocation.pathname === '/mobility' && 'active'}>Movilidad</Link>
        <Link to='/segregation' className={currentLocation.pathname === '/segregation' && 'active'}>Segregación</Link>
      </Nav>
    </reactNavbar>
    </div>
    </>
  )
  return (
    <>
    <div className="region region-navigation">
      <div id="block-conf-blocks-mobile-menu" className="block block--conf-blocks block--conf-blocks-mobile-menu">
        <h2 className="block__title">Menú</h2>
        <div className="block__content">
          <div className="mobile-menu">
            <ul className="menu">
              <li className="first leaf">
                <Link to='/'>Home</Link>
              </li>
              <li className="active-trail leaf">
                <Link to='/migration' className="active active-trail is-active">Migración</Link>
              </li>
              <li className="leaf">
                <Link to="/mobility" className="">Movilidad</Link>
              </li>
              <li className="last leaf">
                <Link to='/segregation' className="is-active">Segregación</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <nav role="navigation" aria-labelledby="block-cepal-main-menu-menu" id="block-cepal-main-menu" className="block block--system block--menu navigation block--system-main-menu">
        <ul className="menu">
          <li className="first leaf">
          <Link to='/'>Home</Link>
          </li>
          <li className="active-trail leaf">
            <Link to='/migration' className="active active-trail is-active">Migración</Link>
          </li>
          <li className="leaf">
            <Link to="/mobility" className="">Movilidad</Link>
          </li>
          <li className="last leaf">
            <Link to='/segregation' className="is-active">Segregación</Link>
          </li>
        </ul>
      </nav>
    </div>
    </>
  )
}
