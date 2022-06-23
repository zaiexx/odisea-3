

const frequency = ( props ) => {
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
            fd['ROW'].fVal.map( ( row, i ) => (
                `
                TABLE T${i}
                    AS FREQUENCY
                    OF ${row.value} DECIMALS 2
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

export default frequency;