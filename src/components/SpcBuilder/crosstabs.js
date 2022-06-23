
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
        
        TABLE Tavg
            AS CROSSTABS
            OF ${fd['ROW'].fVal[0].value}
            ${partials.addIfExists('COL', v => 'BY ' + v.value )}
            ${partials.addIfExists('CTRL', v => 'BY ' + v.value )}
            DECIMALS 2
            ${addFilters}
            ${addAreabreak}
            ${addTabletitle}
        
        ${addOutput}
        `
    );
};
