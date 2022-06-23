const { ENDPOINT_API } = window.config;

export const getSelections = (code, callback) => {
    fetch(ENDPOINT_API + '/databases/' + code + '/selections/list', {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
        headers: { "Content-Type": "text/plain" },
    })
        .then(response => response.text())
        .then(callback)
        .catch(error => console.log('error', error));
}

export const addSelection = (code, payload, callback) => {
    fetch(ENDPOINT_API + '/databases/' + code + '/selections/add', {
        method: 'POST',
        credentials: 'same-origin',
        origin: true,
        body: payload,
    })
        .then(response => response.text())
        .then(callback)
        .catch(error => console.log('error', error));
}

export const deleteSelection = (code_db, code_sel, callback) => {
    fetch(ENDPOINT_API + '/databases/' + code_db + '/selections/' + code_sel + '/delete', {
        method: 'POST',
        credentials: 'same-origin',
        origin: true,
        headers: { "Content-Type": "text/plain" },
        redirect: 'follow'
    })
        .then(response => response.text())
        .then(callback)
        .catch(error => console.log('error', error));
}

