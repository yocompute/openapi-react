import React, { useState, useEffect } from 'react'
import Parameter from './ParameterOld';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    group: {
        padding: '10px',
        width: '100%',
        height: 'auto'
    },
    groupName:{
        color: '#aaa',
        width: '100%',
        paddingBottom: '20px'
    },
});

// route { op, url, host, schemes }
const Parameters = ({ route, operation, definitionMap, theme }) => {
    const classes = useStyles();
    const [grpMap, setGroupMap] = useState();

    const getShemaName = (schema) => {
        if(schema){
            const s = schema.$ref;
            if(s){
                return s.replace('#/definitions/', '');
            }else{
                return null;
            }
        }else{
            return null;
        }
    }

    // const getParamShema = (param) => {
    //     const s = param.schema.$ref;
    //     if (s) {
    //         const name = s.replace('#/definitions/', '');
    //         return definitionMap[name];
    //     } else {
    //         return null;
    //     }
    // }
    // const getDefaultBody = (param) => {
    //     const d = getParamShema(param);
    //     if (d && d.type === 'object') {
    //         const obj = {};
    //         Object.keys(d.properties).forEach(pk => {
    //             if (d.properties[pk].type === 'integer') {
    //                 obj[pk] = 0;
    //             } else if (d.properties[pk].type === 'string') {
    //                 obj[pk] = 'string';
    //             } else if (d.properties[pk].type === 'boolean') {
    //                 obj[pk] = false;
    //             } else if (d.properties[pk].type === 'array') {
    //                 obj[pk] = [];
    //             } else {

    //             }
    //         });
    //         return obj;
    //     } else {
    //         return '';
    //     }
    // }

    // const getParams = () => {
    //     const ps = {};
    //     operation.parameters.forEach(p => {
    //         if (p.in === "array") {
    //             ps[p.name] = { ...p, value: p.items.default };
    //         } else if (p.in === "body") {
    //             ps[p.name] = { ...p, value: getDefaultBody(p) }
    //         } else {
    //             ps[p.name] = { ...p, value: '' };
    //         }
    //     });
    //     return ps;
    // }

    // const [mode, setMode] = useState('view');
    // const [params, setParams] = useState(getParams());
    // const [rsp, setResponse] = useState();

    // const handleTry = () => {
    //     setMode('try');
    // }

    // const getParamType = (param) => {
    //     if(param.type){
    //         return param.type === "array" ? `${param.type}[${param.items.type}]` : param.type;
    //     }else{
    //         return 'object'
    //     }
    // }

    // const handleCancel = () => {
    //     setMode('view');
    // }

    // const handleBodyChange = (name, val) => {
    //     const paramMap = { ...params };
    //     paramMap[name].value = val ? JSON.parse(val) : null;
    //     setParams(paramMap);
    // }

    // const handleSelectParam = (name, value) => {
    //     const paramMap = { ...params };
    //     paramMap[name].value = value;
    //     setParams(paramMap);
    // }

    // const handleParamChange = (event) => {
    //     const { param } = event.target.dataset;

    //     const paramMap = { ...params };
    //     paramMap[param].value = event.target.value;
    //     setParams(paramMap);
    // }

    // const getPathParam = () => {
    //     const ps = [];
    //     Object.keys(params).forEach(k => {
    //         if (params[k].in === 'path') {
    //             ps.push(params[k]);
    //         }
    //     })
    //     if (ps && ps.length > 0) {
    //         return { name: ps[0].name, val: ps[0].value };
    //     } else {
    //         return null;
    //     }
    // }

    // const getBodyParma = () => {
    //     const ps = [];
    //     Object.keys(params).forEach(k => {
    //         if (params[k].in === 'body') {
    //             ps.push(params[k]);
    //         }
    //     })
    //     if (ps && ps.length > 0) {
    //         return ps[0].value;
    //     } else {
    //         return null;
    //     }
    // }

    // const getUrlWithPathParam = (url, param) => {
    //     const t = `{${param.name}}`;
    //     return url.replace(t, param.val);
    // }

    // const getQueryParamStr = () => {
    //     const ps = [];
    //     Object.keys(params).forEach(k => {
    //         if (params[k].in === 'query') {
    //             ps.push(params[k]);
    //         }
    //     })
    //     if (ps && ps.length > 0) {
    //         const a = ps.map(p => `${p.name}=${p.value}`);
    //         return a.join('&');
    //     } else {
    //         return null;
    //     }
    // }

    const groupParams = (params) => {
        const paramMap = {
            path: [],
            header: [],
            query: [],
            formData: [],
            body: []
        };

        params.forEach(p => {
            if(paramMap.hasOwnProperty(p.in)){
                paramMap[p.in].push(p);
            }
        });
        return paramMap;
    }

    useEffect(() => {
        const gm = groupParams(operation.parameters);
        setGroupMap(gm);
    }, []);

    return <div className={classes.root}>
        {
            grpMap && Object.keys(grpMap) &&
            Object.keys(grpMap).map(k => 
                grpMap[k].length > 0 &&
                <div key={k} className={classes.group}>
                    <div className={classes.groupName}>{`${k} parameters:`.toUpperCase()}</div>
                    {  
                        // grpMap[k].map(p => <Parameter key={p.name} param={p} definitionMap={definitionMap} />)
                        grpMap[k].map(p => <Parameter param={p} schemaName={getShemaName(p.schema)} definitionMap={definitionMap}/>)
                    }
                </div>
            )
        }
    </div>
}

export default Parameters;