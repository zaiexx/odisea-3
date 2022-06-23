const { ENDPOINT_API } = window.config;


export const getApplications = ( callback ) => {
  fetch( ENDPOINT_API + '/applications/list', {
    method: 'GET',
    credentials: 'same-origin',
    origin: true,
  })
    .then( response => response.text() )
    .then( callback )
    .catch( error => console.log('error', error) );
};

export const getApplication = ( id, callback ) => {
  fetch( ENDPOINT_API + '/applications/' + id, {
    method: 'GET',
    credentials: 'same-origin',
    origin: true,
  })
    .then( response => response.text() )
    .then( callback )
    .catch( error => console.log('error', error) );
};

export const addApplication = ( payload, callback ) => {
  fetch( ENDPOINT_API + '/applications/add', {
    method: 'POST',
    credentials: 'same-origin',
    body: payload,
    origin: true,
  })
    .then( response => response.text() )
    .then( callback )
    .catch( error => console.log('error', error) );
};

export const updateApplication = ( id, payload, callback ) => {
  fetch( ENDPOINT_API + '/applications/update/' + id, {
    method: 'POST',
    credentials: 'same-origin',
    body: payload,
    origin: true,
    headers: { "Content-Type": "text/plain" }
  })
    .then( response => response.text() )
    .then( callback )
    .catch( error => console.log('error', error) );
};

export const updateApplicationName = ( id, payload, callback ) => {
  fetch( ENDPOINT_API + '/applications/updatename/' + id, {
    method: 'POST',
    credentials: 'include',
    body: payload,
    origin: true
  })
    .then( response => response.text() )
    .then( callback )
    .catch( error => console.log('error', error) );
};

export const updateApplicationHomepage = ( id, payload, callback ) => {
  fetch( ENDPOINT_API + '/applications/updatehomepage/' + id, {
    method: 'POST',
    credentials: 'include',
    body: payload,
    origin: true
  })
    .then( response => response.text() )
    .then( callback )
    .catch( error => console.log('error', error) );
};

export const updateApplicationDb = ( id, payload, callback ) => {
  fetch( ENDPOINT_API + '/applications/updatedb/' + id, {
    method: 'POST',
    credentials: 'include',
    body: payload,
    origin: true
  })
    .then( response => response.text() )
    .then( callback )
    .catch( error => console.log('error', error) );
};

export const deleteApplication = ( id, callback ) => {
  fetch( ENDPOINT_API + '/applications/delete/' + id, {
    method: 'POST',
    credentials: 'include',
    origin: true
  })
    .then( response => response.text() )
    .then( callback )
    .catch( error => console.log('error', error) );
};

