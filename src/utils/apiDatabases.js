const { ENDPOINT_API } = window.config;

export const getDatabases = (callback) => {
    fetch(ENDPOINT_API + '/databases/list', {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

export const addDatabase = (value, callback) => {
    fetch(ENDPOINT_API + '/databases/add', {
        method: 'POST',
        credentials: 'same-origin',
        origin: true,
        body: value
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

export const deleteDatabase = (code, callback) => {
    fetch(ENDPOINT_API + '/databases/delete/' + code, {
        method: 'POST',
        credentials: 'same-origin',
        origin: true,
        headers: { "Content-Type": "text/plain" },
        redirect: 'follow'
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

