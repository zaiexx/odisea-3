const { ENDPOINT_API } = window.config;

export const getUniverses = ( callback ) => {
    fetch( ENDPOINT_API + '/universes/list', {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
        headers: { "Content-Type": "text/plain" }
    } )
    .then( response => response.text() )
    .then( callback )
    .catch(error => console.log('error', error));
};

export const addUniverse = ( payload, callback ) => {
    fetch( ENDPOINT_API + '/universes/add', {
        method: 'POST',
        credentials: 'same-origin',
        origin: true,
        body: payload,
        headers: { "Content-Type": "text/plain" }
    } )
    .then( response => response.text() )
    .then( callback )
    .catch(error => console.log('error', error));
};


