
export default ( props ) => {
    const { partials } = props;
    const fd = props.formData;
    const addSelection = partials.addSelection(fd);
    const addOutput = partials.addOutput(fd);
    const addUniverse = partials.addUniverse(fd);
    const addTabletitle = partials.addTabletitle(fd);
    const addFilters = partials.addFilters(fd);
    const addTotal = partials.addTotal(fd);
    
    return (
        `
        RUNDEF Job
        ${addSelection}
        ${addUniverse}
        
        ${
            fd['ROW'].fVal.map( ( row, i ) => (
                `
                DEFINE ${fd['OUT'].fVal.value}.N${i+1}
                    AS COUNT ${(row.value.split('.')[0])}
                    TYPE INTEGER
                    VARLABEL \\"${row.label}\\"
                `
            )).join(' ')
        }
        TABLE T0
            AS AREALIST
            OF ${fd['OUT'].fVal.value}, ${fd['OUT'].fVal.value}.REDLABEL, ${fd['ROW'].fVal.map( (e,i) => (fd['OUT'].fVal.value+'.N'+(i+1)) ).join(', ')}
            ${addTotal}
            DECIMALS 2
            ${addFilters}
            ${addTabletitle}
            
        ${addOutput}
        `
    );
    // OF ${fd['OUT'].fVal.value}, ${fd['OUT'].fVal.value}.REDLABEL, ${fd['ROW'].fVal.map( (e,i) => (fd['OUT'].fVal.value+'.N'+(i+1)) ).join(', ')}
    // OF ${fd['OUT'].fVal.value}, ${fd['OUT'].fVal.value}.REDLABEL, ${fd['ROW'].fVal.map( e => e.value ).join(', ')}
};
