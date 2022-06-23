import React from 'react'

export default function VisualizationsNavBar() {
  return (
    <div class="visores">
      <ul>
        <li style={{float:"right"}}><a href="/odisea/graficos/movilidad ">Gráficos</a></li>
        <li style={{float:"right"}} class="active"><a href="/odisea/mapas/movilidad/623d6bd32c70e/mcot-mb-dame.json ">Mapas</a></li>
        <li style={{float:"right"}}> <a href="/odisea/tablas/movilidad/623d6bd32c70e/mcot-mb-dame.json "> Tablas</a></li>
        <li style={{float:"left"}}><a href="/odisea/movilidad"> Volver</a></li>
      </ul>
    </div>
  )
}
