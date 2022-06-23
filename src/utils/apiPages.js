const { ENDPOINT_API } = window.config;

export const getPages = (callback) => {
    fetch(ENDPOINT_API + '/pages/list', {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

export const getPagesByApp = (applicationid, callback) => {
    fetch(ENDPOINT_API + '/pages/' + applicationid + '/list', {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

export const getPagesByLang = (lang, callback) => {
    fetch(ENDPOINT_API + '/pages/list/' + lang, {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

export const getPagesByAppAndLang = (applicationid, lang, callback) => {
    fetch(ENDPOINT_API + '/pages/' + applicationid + '/list/' + lang, {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

export const getPageByCodeAndLang = (code, lang, callback) => {
    fetch(ENDPOINT_API + '/pages/' + code + '/' + lang, {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

export const getPageByCode = (code, callback) => {
    fetch(ENDPOINT_API + '/pages/' + code, {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

export const addPages = (value, callback) => {
    fetch(ENDPOINT_API + '/pages/add', {
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

export const updatePages = (value, callback) => {
    fetch(ENDPOINT_API + '/pages/update', {
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

export const deletePage = (code, callback) => {
    fetch(ENDPOINT_API + '/pages/delete/' + code, {
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

