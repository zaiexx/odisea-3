import React, { useState } from "react";
import MapsCEPAL_GetHtmlCode from "./maps.html.js";

function MapsCEPAL(props) {
    const { options, path, style, debugMsg } = props;
    
    return (
        <iframe
            title="Maps content"
            width="800"
            height="600"
            style={style}
            // srcDoc={'<h1>React Iframe</h1>'}
            srcDoc={
                MapsCEPAL_GetHtmlCode(
                    JSON.stringify(options),
                    path,
                    debugMsg
                )
            }
        >
        </iframe>
    );
};

export default MapsCEPAL;
