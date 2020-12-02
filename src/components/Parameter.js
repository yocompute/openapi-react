import React from 'react';
import marked from 'marked';
import Schema from './Schema';

const styles = {
    required: {
        fontSize: '13px',
        color: 'red',
        lineHeight: '20px',
        paddingLeft: '5px'
    },
    type: {
        paddingLeft: '5px'
    },
    name: {
        paddingLeft: '5px'
    },
    group: {
        padding: '10px',
    },
    in: {
        padding: '3px 0px',
        fontSize: '20px'
    },
    description: {
        paddingLeft: '20px',
        color: '#666',
        fontSize: '12px'
    }
};

function Parameter({param, definitionMap}) {

    const getParamType = (param) => {
        if(param && param.type){
            return param.type === "array" ? `${param.type}[${param.items.type}]` : param.type;
        }else{
            return 'object'
        }
    }

    const getShemaName = (schema) => {
        const s = schema.$ref;
        if(s){
            return s.replace('#/definitions/', '');
        }else{
            return null;
        }
    }

    return (
        <div>
            {
                param &&
                <span style={styles.name}>{param.name}</span>
            }
            <span style={styles.type}>{`[${getParamType(param)}]`}</span>
            {
                param && param.required &&
                <span style={styles.required}> *required</span>
            }
            {
                param && param.description &&
                <span style={styles.description} dangerouslySetInnerHTML={{ __html: marked(param.description) }} />
            }
            {
                param && param.schema &&
                <Schema name={getShemaName(param.schema)} definitionMap={definitionMap}/>
            }
        </div>
    );
}

export default Parameter;