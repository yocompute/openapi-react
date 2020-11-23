import React from 'react'

const styles = {
    textarea:{
        width: '480px',
        height: '180px',
        padding: '10px'
    }
}

// path { op, url }
const BodyParam = ({param, schema, onChange, val, theme}) => {

    const handleChange = (event) => {
        const { param } = event.target.dataset;
        // setParams(paramMap);
        onChange(param, event.target.value);
    }

    // const getDefaultBodyStr = (d) => {

    //     // const d = getParamShema(param);
    //     if(d && d.type === 'object'){
    //         const obj = {};
    //         Object.keys(d.properties).forEach(pk => {
    //             if(d.properties[pk].type === 'integer'){
    //                 obj[pk] = 0;
    //             }else if(d.properties[pk].type === 'string'){
    //                 obj[pk] = 'string';
    //             }else if(d.properties[pk].type === 'boolean'){
    //                 obj[pk] = false;
    //             }else if(d.properties[pk].type === 'array'){
    //                 obj[pk] = [];
    //             }else{

    //             }
    //         });
    //         return JSON.stringify(obj, undefined, 2);
    //     }else{
    //         return '';
    //     }
    // }

    return <div style={styles.row}>
                <textarea
                data-param={param.name}
                style={styles.textarea}
                placeholder={param.description}
                onChange={handleChange}
                value={val ? JSON.stringify(val, undefined, 2) : ''}
                />
    </div>
}

export default BodyParam;