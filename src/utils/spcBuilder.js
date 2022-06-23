

export const buildSpc = ( json, values ) => {
    console.log('=========buildSpc');
    console.log('json');
    console.log(json);
    console.log('values');
    console.log(values);
    
    const getIndex = ( type ) => {
        let index = json.options.findIndex( e => e.type == type );
        const valueUndefined = ( values?.[index] ?? true );
        if ( valueUndefined === true ) {
            return -1;
        }
        if ( values[index].length == 0 ) {
            return -1;
        }
        return index;
    }
    
    const rowIndex = getIndex( 'ROW' );
    const titleIndex = getIndex( 'TABLETITLE' );
    const filterIndex = getIndex( 'FIL' );
    const abkIndex = getIndex( 'ABK' );
    const univIndex = getIndex( 'UNIV' );
    const selIndex = getIndex( 'SEL' );


    let spc = `
    RUNDEF Job
    SELECTION ` + ( selIndex != -1 ? values[selIndex][0] : 'ALL' ) + `
    `;

    if ( univIndex != -1 ) {
        spc += `UNIVERSE ` + values[univIndex][0];
    }

    if ( json.operation == 'frequency' ) {
        const rows = values[rowIndex] ?? [];
        rows.map( ( row, i ) => {
            spc += `
            TABLE T${i}
                AS FREQUENCY
                OF ${row.value} DECIMALS 2
                ` + ( filterIndex != -1 ? 'FOR ' + values[filterIndex][i] : '' ) + `
                ` + ( abkIndex != -1 ? 'AREABREAK ' + values[abkIndex].name : '' ) + `
                TITLE \\"${values[titleIndex]}\\"
            `;
        });
    }
    if ( json.operation == 'count' ) {
        const rows = values[rowIndex] ?? [];
        const out = values[getIndex( 'OUT' )] ?? [];
        const tot = values[getIndex( 'TOT' )] ?? [];
        let ofItems = '';

        const i = 0;
        spc += `
        TABLE T${i}
            AS AREALIST
            OF ${out.value}, ${out.value}.REDLABEL, ${rows.map( e => e.value ).join(', ')}
            ` + ( tot.includes("totcol") ? 'TOTAL' : '' ) + `
            DECIMALS 2
            ` + ( filterIndex != -1 ? 'FOR ' + values[filterIndex][i] : '' ) + `
            ` + ( abkIndex != -1 ? 'AREABREAK ' + values[abkIndex].name : '' ) + `
            TITLE \\"${values[titleIndex]}\\"
        `;
        
        // rows.map( ( row, i ) => {
        //     ofItems += (ofItems==''?'':', ') + `${out.value}.N${i+1}`;
        //     spc += `
        //     DEFINE ${out.value}.N${i+1}
        //         AS COUNT ${(row.value.split('.')[0])}
        //         TYPE INTEGER
        //         VARLABEL \\"${row.label}\\"
        //     `;
        // });

        // spc += `
        // TABLE T${i}
        //     AS AREALIST
        //     OF ${out.value}, ${out.value}.REDLABEL, ${ofItems}
        //     ` + ( tot.includes("totcol") ? 'TOTAL' : '' ) + `
        //     DECIMALS 2
        //     ` + ( filterIndex != -1 ? 'FOR ' + values[filterIndex][i] : '' ) + `
        //     ` + ( abkIndex != -1 ? 'AREABREAK ' + values[abkIndex][i] : '' ) + `
        //     TITLE \\"${values[titleIndex]}\\"
        // `;
    }

    spc += `outputfile json \\"out.json\\" overwrite`;

    return spc;
};

