const { ENDPOINT_API } = window.config;

export const getConfiguration = ( callback ) => {
    fetch(ENDPOINT_API + '/configuration', {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

export const updateConfiguration = ( value, callback ) => {
    fetch(ENDPOINT_API + '/configuration/update', {
        method: 'POST',
        credentials: 'same-origin',
        origin: true,
        body: value,
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

export const updateImage = ( payload, callback ) => {
    fetch( ENDPOINT_API + '/configuration/updateimage', {
        method: 'POST',
        credentials: 'same-origin',
        origin: true,
        body: payload,
    })
    .then( response => response.text() )
    .then( callback )
    .catch(error => console.log('error', error));
}


