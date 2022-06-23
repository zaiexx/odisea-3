const { ENDPOINT_API } = window.config;

export const getLists = ( component, callback ) => {
    var requestOptions = {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
        headers: { "Content-Type": "text/plain" },
        redirect: 'follow'
    };

    fetch( ENDPOINT_API + '/lists/get/'+component, requestOptions )
    .then( response => response.text() )
    .then( callback )
    .catch(error => console.log('error', error));
}

export const addList = ( json, callback ) => {
    var requestOptions = {
        method: 'POST',
        credentials: 'same-origin',
        origin: true,
        headers: { "Content-Type": "text/plain" },
        body: json,
        redirect: 'follow'
    };

    fetch( ENDPOINT_API + '/lists/add', requestOptions )
    .then( response => response.text() )
    .then( callback )
    .catch(error => console.log('error', error));
}
