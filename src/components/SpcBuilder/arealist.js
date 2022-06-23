
const counts = ( props ) => {
    const { partials } = props;
    const fd = props.formData;
    const addSelection = partials.addSelection(fd);
    const addOutput = partials.addOutput(fd);
    const addUniverse = partials.addUniverse(fd);
    const addTabletitle = partials.addTabletitle(fd);
    const addFilters = partials.addFilters(fd);
    
    return (
        `
        RUNDEF Job
        ${addSelection}
        ${addUniverse}
        
        TABLE T0
            AS AREALIST
            OF ${fd['OUT'].fVal.value}, ${fd['OUT'].fVal.value}.REDLABEL, ${fd['ROW'].fVal.map( e => e.value ).join(', ')}
            ${fd['TOT'].fVal.includes("totcol") ? 'TOTAL' : ''}
            DECIMALS 2
            ${addFilters}
            ${addTabletitle}
            
        ${addOutput}
        `
    );
};

export default counts;