
export const buildFormWeb = ( title, jsonAdmin, valuesForm ) => {
    const jsonFormWeb = {};
    jsonFormWeb.version = 1.0;
    jsonFormWeb.name = title;
    jsonFormWeb.operation = jsonAdmin.name;
    jsonFormWeb.options = [];
    jsonAdmin.options.map( (e, i) => {
        let new_option = {};
        new_option.type = e;
        if ( typeof valuesForm[i] === 'object' && valuesForm[i] !== null ) {
            if ( valuesForm[i].hasOwnProperty('type') ) {
                new_option = valuesForm[i];
            }
        }
        // if ( e == 'FORMNAME' ) {
        //     new_option.options = 'WHITELIST';
        //     new_option.values = valuesForm[i].map( (e2) => e2.name);
        // }
        // if ( e == 'ABK_T' ) {
        //     new_option.options = 'WHITELIST';
        //     new_option.values = valuesForm[i].map( (e2) => e2.name);
        // }
        jsonFormWeb.options.push( new_option );
    });
    return jsonFormWeb;
};

