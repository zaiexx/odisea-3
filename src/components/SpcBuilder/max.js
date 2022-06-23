

export default ( props ) => {
    const { partials } = props;
    const fd = props.formData;
    const addSelection = partials.addSelection(fd);
    const addOutput = partials.addOutput(fd);
    const addUniverse = partials.addUniverse(fd);
    const addAreabreak = partials.addAreabreak(fd);
    const addTabletitle = partials.addTabletitle(fd);
    const addFilters = partials.addFilters(fd);
    const { addTabletitleSuffix } = partials;
    
    return (
        `
        RUNDEF Job
            ${addSelection}
            ${addUniverse}
        
        ${
            fd['MAX'].fVal.map( ( row, i ) => (
                `
                TABLE T${i}
                    AS MAXIMUM
                    OF ${row.value}
                    ${partials.addIfExists('ROW_ONE', v => 'BY ' + v.value )}
                    ${partials.addIfExists('COL', v => 'BY ' + v.value )}
                    ${partials.addIfExists('CTRL', v => 'BY ' + v.value )}
                    DECIMALS 2
                    ${addFilters}
                    ${addAreabreak}
                    ${addTabletitleSuffix(row.label)}
                    outputfile json \\"out_t${i}.json\\" overwrite
                `
            ) ).join(' ')
        }
        
        `
    );
};
