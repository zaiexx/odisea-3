

export default ( props ) => {
    const { partials } = props;
    const fd = props.formData;
    const addSelection = partials.addSelection(fd);
    const addOutput = partials.addOutput(fd);
    const addUniverse = partials.addUniverse(fd);
    const addAreabreak = partials.addAreabreak(fd);
    const addTabletitle = partials.addTabletitle(fd);
    const addFilters = partials.addFilters(fd);
    
    return (
        `
        RUNDEF Job
        ${addSelection}
        ${addUniverse}
        
        TABLE Tstats
            AS STATS
            OF ${fd['ROW_ONE'].fVal.value}
            DECIMALS 2
            ${addFilters}
            ${addAreabreak}
            ${addTabletitle}
        
        ${addOutput}
        `
    );
};
