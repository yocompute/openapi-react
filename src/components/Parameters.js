import React, { useState, useEffect } from 'react'
// import HttpIconText from './HttpIconText'
// import PlaygroundResponse from './PlaygroundResponse'
// import List from './List'
// import BodyParam from './BodyParam'

const styles = {
    param: {
        padding: '3px 0px'
    },
    btnRow: {
        width: '100%',
        height: '30px'
    },
    btn: {
        float: 'right',
    },
    input: {
        width: '600px'
    },
    container: {
        width: '780px',
        padding: '15px',
        backgroundColor: '#555',
        color: 'white'
    },
    required: {
        fontSize: '13px',
        color: 'red',
        lineHeight: '20px',
        paddingLeft: '5px'
    },
    paramType: {
        paddingLeft: '5px'
    },
    paramName: {
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
}

// route { op, url, host, schemes }
const Parameters = ({ route, operation, definitionMap, theme }) => {

    const [grpMap, setGroupMap] = useState();

    const getParamShema = (param) => {
        const s = param.schema.$ref;
        if (s) {
            const name = s.replace('#/definitions/', '');
            return definitionMap[name];
        } else {
            return null;
        }
    }
    const getDefaultBody = (param) => {
        const d = getParamShema(param);
        if (d && d.type === 'object') {
            const obj = {};
            Object.keys(d.properties).forEach(pk => {
                if (d.properties[pk].type === 'integer') {
                    obj[pk] = 0;
                } else if (d.properties[pk].type === 'string') {
                    obj[pk] = 'string';
                } else if (d.properties[pk].type === 'boolean') {
                    obj[pk] = false;
                } else if (d.properties[pk].type === 'array') {
                    obj[pk] = [];
                } else {

                }
            });
            return obj;
        } else {
            return '';
        }
    }

    const getParams = () => {
        const ps = {};
        operation.parameters.forEach(p => {
            if (p.in === "array") {
                ps[p.name] = { ...p, value: p.items.default };
            } else if (p.in === "body") {
                ps[p.name] = { ...p, value: getDefaultBody(p) }
            } else {
                ps[p.name] = { ...p, value: '' };
            }
        });
        return ps;
    }

    const [mode, setMode] = useState('view');
    const [params, setParams] = useState(getParams());
    const [rsp, setResponse] = useState();

    const handleTry = () => {
        setMode('try');
    }

    const getParamType = (param) => {
        return param.type === "array" ? `${param.type}[${param.items.type}]` : param.type;
    }

    const handleCancel = () => {
        setMode('view');
    }

    const handleBodyChange = (name, val) => {
        const paramMap = { ...params };
        paramMap[name].value = val ? JSON.parse(val) : null;
        setParams(paramMap);
    }

    const handleSelectParam = (name, value) => {
        const paramMap = { ...params };
        paramMap[name].value = value;
        setParams(paramMap);
    }

    const handleParamChange = (event) => {
        const { param } = event.target.dataset;

        const paramMap = { ...params };
        paramMap[param].value = event.target.value;
        setParams(paramMap);
    }

    const getPathParam = () => {
        const ps = [];
        Object.keys(params).forEach(k => {
            if (params[k].in === 'path') {
                ps.push(params[k]);
            }
        })
        if (ps && ps.length > 0) {
            return { name: ps[0].name, val: ps[0].value };
        } else {
            return null;
        }
    }

    const getBodyParma = () => {
        const ps = [];
        Object.keys(params).forEach(k => {
            if (params[k].in === 'body') {
                ps.push(params[k]);
            }
        })
        if (ps && ps.length > 0) {
            return ps[0].value;
        } else {
            return null;
        }
    }

    const getUrlWithPathParam = (url, param) => {
        const t = `{${param.name}}`;
        return url.replace(t, param.val);
    }

    const getQueryParamStr = () => {
        const ps = [];
        Object.keys(params).forEach(k => {
            if (params[k].in === 'query') {
                ps.push(params[k]);
            }
        })
        if (ps && ps.length > 0) {
            const a = ps.map(p => `${p.name}=${p.value}`);
            return a.join('&');
        } else {
            return null;
        }
    }



    // const renderParam = (p) => {
    //     if (p.in === 'body') {
    //         return <BodyParam
    //             val={params[p.name].value}
    //             param={p}
    //             schema={getParamShema(p)}
    //             onChange={handleBodyChange}
    //         />

    //     } else if (p.type === 'array') {
    //         return <List
    //             name={p.name}
    //             items={p.items}
    //             onSelect={handleSelectParam}
    //         />
    //     } else {
    //         return <input
    //             data-param={p.name}
    //             style={styles.input}
    //             placeholder={p.description}
    //             onChange={handleParamChange}
    //         />
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

    return <div>
        {
            grpMap && Object.keys(grpMap) &&
            Object.keys(grpMap).map(k => <div key={k} >
                {
                    grpMap[k].length > 0 &&
                    <div style={styles.group}>
                        <div style={styles.in}>{`${k} parameters:`}</div>
                        {
                            grpMap[k].map(p => <div key={p.name} style={styles.param}>
                                <span style={styles.paramName}>{p.name}</span>
                                <span style={styles.paramType}>{`[${getParamType(p)}]`}</span>
                                {
                                    p.required &&
                                    <span style={styles.required}> *required</span>
                                }
                                <span style={styles.description}>{p.description}</span>
                            </div>
                            )
                        }
                    </div>
                }
            </div>)
        }
    </div>
}

export default Parameters;