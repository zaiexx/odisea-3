
const MapsCEPAL_getHtmlCode = ( options, path, debugMsg = null ) => (
`<!DOCTYPE html>
<html lang="en">
   <head>
      <title>Mapas CEPAL</title>
      <meta charset="UTF-8">
      <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>  <script src="https://kit.fontawesome.com/b86184394b.js"></script> 
      <link rel="stylesheet" href="${path}/www.807e0869.css">
   </head>
   <body>
      ` + (debugMsg ? `<div style="font-size:10px;">${debugMsg}</div>` : ``) + `
      <div style="height:100%;position:relative;">
         <div id="sidebar" class="sidebar collapsed">
            <div class="sidebar-tabs">
               <ul role="tablist" id="sidebar-tablist">
                  <li id="tab-mobility" class="module_tab"><a href="#mobility" role="tab"><i class="fas fa-car-side"></i></a></li>
                  <li id="tab-migration" class="module_tab"><a href="#migration" role="tab"><i class="fas fa-walking"></i></a></li>
                  <li id="tab-tablelist" class="module_tab"><a href="#tablelist" role="tab"><i class="fas fa-chart-bar"></i></a></li>
                  <li id="tab-segregation" class="module_tab"><a href="#segregation" role="tab"><i class="fas fa-street-view"></i></a></li>
                  <li id="tab-database" class="module_tab"><a href="#redatam-generic" role="tab"><i class="fas fa-drafting-compass"></i></a></li>
                  <li><a href="#customization" role="tab"><i class="fa fa-palette"></i></a></li>
                  <li><a href="#feature-info" role="tab"><i class="fa fa-info"></i></a></li>
               </ul>
               <ul role="tablist">
                  <li><a href="#help" role="tab"><i class="fa fa-question"></i></a></li>
                  <li><a href="#settings" role="tab"><i class="fa fa-gear"></i></a></li>
               </ul>
            </div>
            <div class="sidebar-content">
               <div class="sidebar-pane" id="tablelist">
                  <h1 class="sidebar-header"><span data-phrase-id="tablelist">tablelist</span><span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>
                  <div id="sidebar-p-tablelist" class="sidebar-p-content">
                     <dl>
                        <dt data-phrase-id="tablelist-select1">Select one</dt>
                        <dd> <select id="tablelist-select1"></select> </dd>
                     </dl>
                  </div>
               </div>
               <div class="sidebar-pane" id="mobility">
                  <h1 class="sidebar-header"><span data-phrase-id="mobility">mobility</span><span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>
                  <div id="sidebar-p-mobility" class="sidebar-p-content">
                     <dl>
                        <dt data-phrase-id="mobility-type">Select one</dt>
                        <dd> <select id="mobility-select-type"></select> </dd>
                        <dt data-phrase-id="mobility-pivot">Select one/many</dt>
                        <dd> <select id="mobility-select-area" multiple=""></select> </dd>
                     </dl>
                  </div>
               </div>
               <div class="sidebar-pane" id="migration">
                  <h1 class="sidebar-header"><span data-phrase-id="migration">migration</span><span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>
                  <div id="sidebar-p-migration" class="sidebar-p-content">
                     <dl>
                        <dt data-phrase-id="migration-type">Select one</dt>
                        <dd> <select id="migration-select-type"></select> </dd>
                        <dt data-phrase-id="migration-pivot">Select one/many</dt>
                        <dd> <select id="migration-select-area" multiple=""></select> </dd>
                     </dl>
                  </div>
               </div>
               <div class="sidebar-pane" id="segregation">
                  <h1 class="sidebar-header"><span data-phrase-id="segregation">segregation</span><span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>
                  <div id="sidebar-p-segregation" class="sidebar-p-content">
                     <dl>
                        <dt data-phrase-id="segregation-area">Select district</dt>
                        <dd> <select id="segregation-select-area" multiple=""></select> </dd>
                        <dt data-phrase-id="segregation-variables">Select variables</dt>
                        <dd> <select id="app1-select2" multiple=""></select> </dd>
                        <dt data-phrase-id="segregation-tomap">Variable to map</dt>
                        <dd> <select id="app1-select3"></select> </dd>
                        <dt data-phrase-id="segregation-indices">Indices</dt>
                        <dd>
                           <div id="segregation-indices" data-phrase-id="segregation-indices-placeholder">Select a value to map first</div>
                        </dd>
                     </dl>
                  </div>
               </div>
               <div class="sidebar-pane" id="redatam-generic">
                  <h1 class="sidebar-header"><span data-phrase-id="database">redatam</span><span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>
                  <div id="sidebar-p-database" class="sidebar-p-content">
                     <dl>
                        <dt data-phrase-id="select-group">Select one category</dt>
                        <dd> <select id="database-select-category"></select> </dd>
                        <dt id="database-select-variable-label" data-phrase-id="select-subgroup">Select one variable</dt>
                        <dd> <select id="database-select-variable" multiple=""></select> </dd>
                     </dl>
                  </div>
               </div>
               <div class="sidebar-pane" id="customization">
                  <h1 class="sidebar-header"><span data-phrase-id="customization">Customization</span><span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>
                  <div id="sidebar-p-customization" class="sidebar-p-content">
                     <dl>
                        <dt data-phrase-id="layers">layers</dt>
                        <dd>
                           <div id="sidebar-p-layers"></div>
                        </dd>
                        <dt data-phrase-id="customization-basemap">Change base map</dt>
                        <dd>
                           <div id="customization-basemapsel">
                            <img src="${path}/basemap0.fb6a7d86.png" alt="Option 1" class="img-thumbnail img-basemap selected">
                            <img src="${path}/basemap1.f46d62b8.png" alt="Option 2" class="img-thumbnail img-basemap">
                            <img src="${path}/basemap2.457b4643.png" alt="Option 3" class="img-thumbnail img-basemap">
                            <img src="${path}/basemap3.babf17a0.png" alt="Option 4" class="img-thumbnail img-basemap">
                           </div>
                        </dd>
                        <dt data-phrase-id="customization-representation">Change representation</dt>
                        <dd>
                           <div id="customization-representation">
                            <img src="${path}/representation0.cb2c667b.png" alt="Option 1" class="img-thumbnail img-basemap selected">
                            <img src="${path}/representation1.586c3504.png" alt="Option 2" class="img-thumbnail img-basemap">
                           </div>
                        </dd>
                        <dt data-phrase-id="customization-strokewidth">Stroke width</dt>
                        <dd>
                           <select id="customization-strokewidth" class="form-control">
                              <option value="3">3</option>
                              <option value="2">2</option>
                              <option value="1" selected="">1</option>
                              <option value="0.5">0.5</option>
                              <option value="0">0</option>
                           </select>
                        </dd>
                        <dt data-phrase-id="customization-pointSize">Point size</dt>
                        <dd>
                           <select id="customization-pointSize" class="form-control">
                              <option value="400">400%</option>
                              <option value="300">300%</option>
                              <option value="200">120%</option>
                              <option value="150">150%</option>
                              <option value="100" selected="">100%</option>
                              <option value="80">80%</option>
                              <option value="50">50%</option>
                              <option value="25">25%</option>
                              <option value="20">20%</option>
                              <option value="10">10%</option>
                           </select>
                        </dd>
                        <dt data-phrase-id="customization-fontsize">Font size</dt>
                        <dd>
                           <select id="customization-fontsize" class="form-control">
                              <option value="200">200%</option>
                              <option value="180">180%</option>
                              <option value="140">140%</option>
                              <option value="120">120%</option>
                              <option value="110">110%</option>
                              <option value="100" selected="">100%</option>
                              <option value="90">90%</option>
                              <option value="80">80%</option>
                              <option value="70">70%</option>
                              <option value="60">60%</option>
                              <option value="50">50%</option>
                           </select>
                        </dd>
                     </dl>
                  </div>
               </div>
               <div class="sidebar-pane" id="feature-info">
                  <h1 class="sidebar-header"><span data-phrase-id="feature-info">feature-info</span><span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>
                  <div id="sidebar-p-feature-info" class="sidebar-p-content"></div>
               </div>
               <div class="sidebar-pane" id="help">
                  <h1 class="sidebar-header"><span data-phrase-id="help">help</span><span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>
                  <div id="sidebar-p-help" class="sidebar-p-content"></div>
               </div>
               <div class="sidebar-pane" id="settings">
                  <h1 class="sidebar-header"><span data-phrase-id="settings">settings</span><span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>
                  <div id="sidebar-p-settings" class="sidebar-p-content">
                     <dl>
                        <dt data-phrase-id="settings-language">lang</dt>
                        <dd> <select id="settings-language" class="form-control"> </select> </dd>
                        <dt data-phrase-id="settings-units">units</dt>
                        <dd>
                           <select id="settings-units" class="form-control">
                              <option value="degrees" data-phrase-id="units-degrees">degrees</option>
                              <option value="imperial" data-phrase-id="units-impinch">imperial inch</option>
                              <option value="us" data-phrase-id="units-usinch">us inch</option>
                              <option value="nautical" data-phrase-id="units-nauticmile">nautical mile</option>
                              <option value="metric" data-phrase-id="units-metric" selected="">metric</option>
                           </select>
                        </dd>
                     </dl>
                  </div>
               </div>
            </div>
         </div>
         <div id="map" class="map sidebar-map">
            <div id="tooltip">
               <div id="tooltipContainer"></div>
            </div>
            <div class="legend_container">
               <button id="container-legend-button" class="legend_button">L</button> 
               <dl id="container-legend-content" class="legend-content legend-active">
                  <dt id="container-legend-title" data-phrase-id="legend-title">Legend</dt>
                  <dd>
                     <div id="legend-aux"></div>
                     <div id="legend"></div>
                  </dd>
               </dl>
            </div>
         </div>
      </div>
      <script charset="utf-8">
        window.onload = function() {
            new window.mapasCEPAL(${options})
        };
      </script>
      <script src="${path}/www.d49eb36c.js"></script> 
   </body>
</html>`
);

export default MapsCEPAL_getHtmlCode;
