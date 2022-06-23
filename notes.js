// app/screens/public_site/SiteForm.js
<RedatamForm
    onSubmit={(values, operation) => {
        console.log('Values form');
        console.log(values);
        submitForm(jsonTest, values);
        // submitForm(jsonTest, values, (result, spc) => {
        // 	setResponse("==== SPC ====\n" + spc + "\n\n==== JSON Output ====\n" + result);
        // })
}}/>

submitForm(jsonTest, values)
// definition: submitForm(json, values, callback)
//  - json
//  - values
//  - callback

onSubmit(values, structureState, json);


/*
app/screens/public_site/SiteForm.js
    - calls: RedatamForm (component from app/components/Form/RedatamForm.js)
    - and pass the function: submitForm (from the same file), that get (json, values, callback) as input parameters.
        json is state jsonTest, that gets data value, that comes from function getForm (from app/utils/apiForms.js), that
        get data from the API REST.
        - that call inside: SpcBuilder (component from app/components/SpcBuilder/index.js) and get (json, values)
        
*/


/*
- parametro modulo de mapas
*/ 


/*
https://www.elitmus.com/blog/technology/creating-an-npm-package-from-my-react-component/


redrest -> lista variables
	-> lista opciones por variable
selecciones geograficas (en segregacion)
*/