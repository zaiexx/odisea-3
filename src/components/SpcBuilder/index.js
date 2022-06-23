

import * as partials from "./partials";
import frequency from './frequency';
import average from './average';
import max from './max';
import min from './min';
import median from './median';
import basicStats from './basicStats';
import count from './count';
import arealist from './arealist';
import crosstabs from "./crosstabs";


export default (json, values) => {
    const formData = {};
    json.options.forEach((e, i) => {
        formData[e.type] = {
            ...e,
            fVal: values[i],
            exists: Boolean(values[i])
        }
    });
    partials.setFd(formData);
    console.log(formData);

    const props = {
        structure: json,
        values: values,
        formData: formData,
        partials: partials
    }

    // check the process
    switch (json.operation) {
        case 'frequency':
            return frequency(props);
        case 'average':
            return average(props);
        case 'basicStats':
            return basicStats(props);
        case 'max':
            return max(props);
        case 'min':
            return min(props);
        case 'median':
            return median(props);
        case 'count':
            return count(props);
        case 'arealist':
            return arealist(props);
        case 'crosstabs':
            return crosstabs(props);
        default:
            break;
    };
};
