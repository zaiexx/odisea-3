
let fd;

export const setFd = ( formData ) => {
    fd = formData;
}

export const addIfExists = ( key, buildExpression ) => {
    // ADD fd !!!!!!!!!
    console.log(fd)
    console.log(key)
    if ( fd[key].exists ) {
        return buildExpression( fd[key].fVal )
    }
    return '';
}

export const addSelection = ( fd ) => {
    return ( `SELECTION ` + ( fd['SEL'].exists ? fd['SEL'].fVal.value : 'ALL' ) );
};

export const addFilters = ( formData ) => {
    return addIfExists( 'FIL', v => 'FOR ' + v );
};

export const addAreabreak = ( formData ) => {
    return addIfExists( 'ABK', v => 'AREABREAK ' + v.name );
};

export const addTabletitle = ( formData ) => {
    // return addIfExists( 'TABLETITLE', v => `TITLE \\"${v}\\"` );
    const title = formData['TABLETITLE'].fVal ?? 'Output';
    return `TITLE \\"${title}\\"`;
};

export const addTabletitleSuffix = ( suffix ) => {
    // return addIfExists( 'TABLETITLE', v => `TITLE \\"${v}\\"` );
    const title = fd['TABLETITLE'].fVal ?? 'Output';
    return `TITLE \\"${title} - ${suffix}\\"`;
};

export const addTotal = ( formData ) => {
    return fd['TOT'].fVal.includes("totcol") ? 'TOTAL' : '';
};

export const addUniverse = ( formData ) => {
    return addIfExists( 'UNIV', v => 'UNIVERSE ' + v.value );
};

export const addOutput = ( formData ) => {
    return ( `outputfile json \\"out.json\\" overwrite` );
};
