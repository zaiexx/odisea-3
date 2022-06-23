const { ENDPOINT_API } = window.config;

export const isLoggedIn = ( callback ) => {
    var requestOptions = {
        method: 'POST',
        credentials: 'include',
        origin: true,
        headers: {
            // "Content-Type": "application/json",
            'Accept':       'application/json'
        },
        redirect: 'follow'
    };

    fetch( ENDPOINT_API + '/isloggedin', requestOptions)
    .then( response => response.text() )
    .then( callback )
    .catch(error => console.log('error', error));
}

export const login = ( user, pass, callback ) => {
    var requestOptions = {
        method: 'POST',
        credentials: 'include',
        // origin: true,
        // headers: {
        //     // "Content-Type": "text/plain",
        //     'Accept':       'application/json'
        // },
        body: JSON.stringify({
            user: user,
            pass: pass
        }),
        redirect: 'follow'
    };

    fetch( ENDPOINT_API + '/login', requestOptions)
    .then( response => response.text() )
    .then( callback )
    .catch(error => console.log('error', error));
}

export const logout = ( callback ) => {
    var requestOptions = {
        method: 'GET',
        credentials: 'include',
        origin: true,
        headers: {
            // "Content-Type": "text/plain",
            'Accept':       'application/json'
        },
        redirect: 'follow'
    };

    fetch( ENDPOINT_API + '/logout', requestOptions)
    .then( response => response.text() )
    .then( callback )
    .catch(error => console.log('error', error));
}

export const updatePass = ( old_pass, new_pass, callback ) => {
    fetch( ENDPOINT_API + '/update-password', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            old_password: old_pass,
            new_password: new_pass
        }),
        redirect: 'follow'
    })
    .then( response => response.text() )
    .then( callback )
    .catch(error => console.log('error', error));
}

