
/*
* return a list of entities from a dictionary
*/
export const getEntitiesFromDic = (obj, entities = []) => {
    if (typeof obj !== 'object' || obj === null) return ({ 'error': true });
    
    if ( obj.hasOwnProperty('entityCode') ) {
        entities.push( {
            'name': obj['name'],
            'label': obj['label'],
            'entityCode': obj['entityCode'],
            'entityLabel': obj['entityLabel'],
            'value': obj['name'],
        } );
    }

    if ( obj.hasOwnProperty('entities') ) {
        obj['entities'].forEach((entity) => {
            getEntitiesFromDic(entity, entities)
        })
    };
    return entities;
};

/*
* return a list of variables from a dictionary
*/
export const getVariablesFromDic = (obj, variables = []) => {
    if (typeof obj !== 'object' || obj === null) return ({ 'error': true });

    if (obj.hasOwnProperty('variables')) {
        Object.entries(obj['variables']).forEach(([key, value]) => {
            const new_value = Object.assign( {}, value );
            new_value['value'] = obj['name'] + '.' + value['name'];
            new_value['label'] = obj['name'] + ' - ' + value['label'];
            variables.push(new_value);
        });
    }

    if (obj.hasOwnProperty('entities')) {
        obj['entities'].forEach((entity) => {
            getVariablesFromDic(entity, variables)
        })
    };
    return variables;
};

/*
* return a list of variables tree from a dictionary
*/
export const getVariablesTreeFromDic = (obj, variables = []) => {
    if (typeof obj !== 'object' || obj === null) return ({ 'error': true });
    
    variables.push({
        name: obj['label'],
        value: obj['name'],
        variables: []
    });
    const newIndex = variables.length - 1;

    if (obj.hasOwnProperty('variables')) {
        Object.entries(obj['variables']).forEach(([key, value]) => {
            const new_value = Object.assign( {}, value );
            new_value['value'] = obj['name'] + '.' + value['name'];
            new_value['label'] = value['label'];
            // new_value['label'] = obj['name'] + ' - ' + value['label'];
            // variables.push(new_value);
            variables[newIndex].variables.push( new_value );
        });
    }

    if (obj.hasOwnProperty('entities')) {
        obj['entities'].forEach((entity) => {
            getVariablesTreeFromDic(entity, variables)
        })
    };
    return variables;
};

