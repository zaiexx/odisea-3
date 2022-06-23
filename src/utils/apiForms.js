const { ENDPOINT_API } = window.config;

export const getForms = ( applicationid, callback ) => {
    fetch( ENDPOINT_API + '/formweb/list/'+applicationid, {
      method: 'GET',
      credentials: 'same-origin',
      origin: true,
    })
    .then( response => response.text() )
    .then( callback )
    .catch( error => console.log('error', error) );
}

export const getForm = ( applicationid, formId, callback ) => {
    fetch( ENDPOINT_API + '/formweb/get/'+applicationid + '/' + formId, {
      method: 'GET',
      credentials: 'same-origin',
      origin: true,
    })
    .then( response => response.text() )
    .then( callback )
    .catch( error => console.log('error', error) );
}

export const addForm = ( applicationid, value, callback ) => {
    fetch( ENDPOINT_API + '/formweb/add/'+applicationid, {
      method: 'POST',
      credentials: 'include',
      origin: true,
      body: value,
      redirect: 'follow'
  } )
    .then( response => response.text() )
    .then( callback )
    .catch(error => console.log('error', error));
}

export const deleteForm = ( formid, callback ) => {
    fetch( ENDPOINT_API + '/formweb/delete/'+formid, {
      method: 'POST',
      credentials: 'include',
      origin: true,
      redirect: 'follow'
  } )
    .then( response => response.text() )
    .then( callback )
    .catch(error => console.log('error', error));
}

