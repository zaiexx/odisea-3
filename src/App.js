import Banner from './components/Banner';
import Footer from './components/Footer';
import FooterBottom from './components/FooterBottom';
import Home from './components/Home';
import MigrationModule from './components/MigrationModule';
import SegregationModule from './components/SegregationModule';
import MobilityModule from './components/MobilityModule';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Visualizations from './components/Visualizations';
import { useState, createContext, useContext } from "react";
import { JSONContext } from './Store'

function App() {

  const [responseJSON, setResponseJSON] = useState([]);
  const [firstResponseJSON, setFirstResponseJSON] = useState({});
  const [textSPC, setTextSPC] = useState('');
  const [formTypeQuery, setFormTypeQuery] = useState('');
  const [selectedDA, setSelectedDA] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});

  return (
    <>
    <JSONContext.Provider value={{
      responseJSON, setResponseJSON,
      firstResponseJSON, setFirstResponseJSON,
      textSPC, setTextSPC,
      formTypeQuery, setFormTypeQuery,
      selectedDA, setSelectedDA,
      isLoading, setIsLoading,
      formData, setFormData
    }}>
    <BrowserRouter basename="/odisea/">
    <body>
        <div class="odisea-page-layout">
          <Banner />
          <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/visualizations" element={<Visualizations />} />
                <Route path="/migration" element={<MigrationModule />} />
                <Route path="/segregation" element={<SegregationModule />} />
                <Route path="/mobility" element={<MobilityModule />} />
              </Routes>
            <Footer />
          <FooterBottom />
        </div>
      </body>
      </BrowserRouter>
      </JSONContext.Provider>
    </>      
    
  );

  return (
    <>
      <JSONContext.Provider value={{
        responseJSON, setResponseJSON,
        firstResponseJSON, setFirstResponseJSON,
        textSPC, setTextSPC,
        formTypeQuery, setFormTypeQuery,
        selectedDA, setSelectedDA,
        isLoading, setIsLoading,
        formData, setFormData
      }}>
      <BrowserRouter>
      <head>
        <title>Bienvenidos a Desplazamiento Interno de la Población en ALC | Portal Odisea</title>
      </head>
      <body className="path-frontpage page-node-type-page">
        <div className="l-page">
          <header id="header" className="l-header" role="banner">
            <Banner />
          </header>
          <div className="l-page">
            
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/visualizations" element={<Visualizations />} />
                <Route path="/migration" element={<MigrationModule />} />
                <Route path="/segregation" element={<SegregationModule />} />
                <Route path="/mobility" element={<MobilityModule />} />
              </Routes>
            <Footer />
            <FooterBottom />
          </div>
        </div>
      </body>
      </BrowserRouter>
      </JSONContext.Provider>
    </>      
    
  );
}

export default App;
