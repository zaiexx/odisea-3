/*
export * from "./utilsDictionary";
export * from "./spcBuilder";
export * from "./formWebBuilder";
export * from "./apiForms";
export * from "./apiApplications";
export * from "./apiSelections";
export * from "./apiLists";
export * from "./apiUser";
export * from "./apiUniverses";
export * from "./apiPages";
export * from "./apiLinks";
export * from "./apiConfiguration";
export * from "./apiDatabases";
export * from "./apiStats";
*/
const {
    ENDPOINT_API,
    ENDPOINT_DEPOT
} = window.config;

export const execSPC = (operation, dbname, value, callback) => {
    var raw = "{\"alias\": \"" + dbname + "\",\r\n\"display\": false,\r\n\"spc\": \"" + value + "\" }";

    fetch(ENDPOINT_API + '/proxy/' + operation, {
        method: 'POST',
        credentials: 'same-origin',
        // credentials: 'include',
        origin: true,
        headers: { "Content-Type": "text/plain" },
        body: raw,
        redirect: 'follow'
    })
        .then( response => response.text() )
        .then( callback )
        .catch(error => console.log('error', error));
}

export const loadJsonFile = (url, callback) => {
    fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
        redirect: 'follow'
    })
        .then( response => response.text() )
        .then( callback )
        .catch(error => console.log('error', error));
}

export async function loadJson (id, file, callback) {
    const requestOptions = {
        method: 'GET',
        credentials: 'same-origin',
        origin: true,
        redirect: 'follow'
    };

    await fetch(ENDPOINT_DEPOT + '/tempo/' + id + '/' + file, requestOptions)
        .then( response => response.text() )
        .then( callback )
        .catch(error => console.log('error', error));
}

export const loadDictionary = (dbname, callback) => {
    fetch(ENDPOINT_API + '/getdictionary', {
        method: 'POST',
        credentials: 'same-origin',
        origin: true,
        body: JSON.stringify({dbname: dbname}),
        redirect: 'follow'
    })
        .then( response => response.text() )
        .then( callback )
        .catch(error => console.log('error', error));
}

export const strToSeoFriendly = ( s ) => {
    return s.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

export const isObject = ( _var ) => {
    return (
        typeof _var === 'object' &&
        !Array.isArray(_var) &&
        _var !== null
    );
}

export const objectMap = (obj, fn) => {
    return (
        Object.fromEntries(
            Object.entries(obj).map(
                ([k, v], i) => [k, fn(v, k, i)]
            )
        )
    );
};

