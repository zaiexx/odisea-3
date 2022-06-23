const { ENDPOINT_API } = window.config;

export const getLastDays = (days, callback) => {
    fetch(ENDPOINT_API + '/stats/query/getdays/' + days, {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}

export const getTotalQueries = (callback) => {
    fetch(ENDPOINT_API + '/stats/query/gettotal', {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
    })
        .then( response => response.text() )
        .then( callback )
        .catch( error => console.log('error', error) );
}
