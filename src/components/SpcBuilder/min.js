import {addTabletitleSuffix} from './partials';

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
        
        ${
            fd['MIN'].fVal.map( ( row, i ) => (
                `
                TABLE T${i}
                    AS MINIMUM
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
