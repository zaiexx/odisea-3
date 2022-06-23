const { ENDPOINT_API } = window.config;

export const getLinks = (callback) => {
    fetch(ENDPOINT_API + '/links/list', {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

export const getLinksByLang = (lang, callback) => {
    fetch(ENDPOINT_API + '/links/list/' + lang, {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

export const getLinksByAppAndLang = ( lang, callback) => {
    fetch(ENDPOINT_API + '/links/list/' + lang, {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

export const getLinkByCodeAndLang = (code, lang, callback) => {
    fetch(ENDPOINT_API + '/links/' + code + '/' + lang, {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

export const getLinkByCode = (code, callback) => {
    fetch(ENDPOINT_API + '/links/' + code, {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

export const addLinks = (value, callback) => {
    fetch(ENDPOINT_API + '/links/add', {
        method: 'POST',
        credentials: 'same-origin',
        origin: true,
        headers: { "Content-Type": "text/plain" },
        body: value,
        redirect: 'follow'
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

export const updateLinks = (value, callback) => {
    fetch(ENDPOINT_API + '/links/update', {
        method: 'POST',
        credentials: 'same-origin',
        origin: true,
        headers: { "Content-Type": "text/plain" },
        body: value,
        redirect: 'follow'
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

export const deleteLink = (code, callback) => {
    fetch(ENDPOINT_API + '/links/delete/' + code, {
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

