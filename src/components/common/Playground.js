import React, { useState } from 'react'
import HttpIconText from './HttpIconText'
import PlaygroundResponse from './PlaygroundResponse'
import List from './List'
import BodyParam from './BodyParam'

const styles = {
    param: {
        marginBottom: '10px'
        // height: '32px',
        // float: 'left',
        // paddingLeft: '12px'
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
    paramType:{
        paddingLeft: '5px'
    }
}

// route { op, url, host, schemes }
const Playground = ({ route, operation, definitionMap, theme }) => {
    const getParamShema = (param) => {
        const s = param.schema.$ref;
        if(s){
            const name = s.replace('#/definitions/', '');
            return definitionMap[name];
        }else{
            return null;
        }
    }
    const getDefaultBody = (param) => {
        const d = getParamShema(param);
        if(d && d.type === 'object'){
            const obj = {};
            Object.keys(d.properties).forEach(pk => {
                if(d.properties[pk].type === 'integer'){
                    obj[pk] = 0;
                }else if(d.properties[pk].type === 'string'){
                    obj[pk] = 'string';
                }else if(d.properties[pk].type === 'boolean'){
                    obj[pk] = false;
                }else if(d.properties[pk].type === 'array'){
                    obj[pk] = [];
                }else{

                }
            });
            return obj;
        }else{
            return '';
        }
    }

    const getParams = () => {
        const ps = {};
        operation.parameters.forEach(p => {
            if(p.in === "array"){
                ps[p.name] = {...p, value: p.items.default};
            }else if(p.in === "body"){
                ps[p.name] = {...p, value: getDefaultBody(p)}
            }else{    
                ps[p.name] = {...p, value:''};
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
        const paramMap = {...params};
        paramMap[name].value = val ? JSON.parse(val) : null;
        setParams(paramMap);
    }

    const handleSelectParam = (name, value) => {
        const paramMap = {...params};
        paramMap[name].value = value;
        setParams(paramMap);
    }

    const handleParamChange = (event) => {
        const { param } = event.target.dataset;

        const paramMap = {...params};
        paramMap[param].value = event.target.value;
        setParams(paramMap);
    }

    const getPathParam = () => {
        const ps = [];
        Object.keys(params).forEach(k => {
            if(params[k].in === 'path'){
                ps.push(params[k]);
            }
        })
        if(ps && ps.length >0){
            return {name: ps[0].name, val: ps[0].value};
        }else{
            return null;
        }
    }

    const getBodyParma = () => {
        const ps = [];
        Object.keys(params).forEach(k => {
            if(params[k].in === 'body'){
                ps.push(params[k]);
            }
        })
        if(ps && ps.length >0){
            return ps[0].value;
        }else{
            return null;
        }
    }

    const getUrlWithPathParam = (url, param) => {
        const t = `{${param.name}}`;
        return url.replace(t, param.val);
    }

    const getQueryParamStr= () => {
        const ps = [];
        Object.keys(params).forEach(k => {
            if(params[k].in === 'query'){
                ps.push(params[k]);
            }
        })
        if(ps && ps.length >0){
            const a = ps.map(p => `${p.name}=${p.value}`);
            return a.join('&');
        }else{
            return null;
        }
    }



    const renderParam = (p) => {

        if( p.in === 'array' ){
            return <List
                name={p.name} 
                items={p.items}
                onSelect={handleSelectParam}
            />
        }else if(p.in === 'body'){
            return <BodyParam
                val={params[p.name].value} 
                param={p}
                schema={getParamShema(p)}
                onChange={handleBodyChange}
                />
            
        }else{
            return <input
                data-param={p.name}
                style={styles.input}
                placeholder={p.description}
                onChange={handleParamChange}
            />
        }
    }

    const handleExecute = (event) => {
        event.preventDefault();
        if(route && route.operationKey){
            
            const p = getPathParam();
            const url = p ? `${route.schemes[0]}://${route.host}${route.basePath}${getUrlWithPathParam(route.url, p)}`:
            `${route.schemes[0]}://${route.host}${route.basePath}${route.url}`;

            const q = getQueryParamStr();
            const qUrl = q ? `${url}?${q}` : url; 

            const option = {
                mode:'cors',
                method: route.operationKey.toUpperCase(),
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                cache: 'no-cache',
                // redirect: 'follow', // manual, *follow, error
                // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                // body: JSON.stringify(data) // body data type must match "Content-Type" header
            }

            const opt = route.operationKey.toUpperCase() === 'POST' ?
                {...option, body: getBodyParma()}
                : option;

            window.fetch(qUrl, opt)
            .then( r => { //rsp => rsp.json())
                r.json().then( d => {
                    setResponse({status: r.status, statusText: r.statusText, value: d});
                // setMode('try');
                });
            }).catch(e => {
                console.log(e);
            })
        }
    }

    return <div style={styles.container}>
        <HttpIconText route={route} />

        <div style={styles.btnRow}>
            {
                mode === 'view' &&
                <button onClick={handleTry} style={styles.btn} >Try it out</button>
            }
        </div>
        <form>
            {
                operation.parameters && operation.parameters.length > 0 &&
                <div style={styles.params}>
                    {
                        operation.parameters.map(p => <div key={p.name} style={styles.param}>
                            <div>
                                {p.name}
                                <span style={styles.paramType}>{getParamType(p)}</span>
                                {
                                    p.required &&
                                    <span style={styles.required}> *required</span>
                                }
                            </div>
                            {
                                renderParam(p)
                                // p.type === 'array' ?
                                // <List
                                //     name={p.name} 
                                //     items={p.items}
                                //     onSelect={handleSelectParam}
                                // />
                                // :
                                // (p.type === 'body' ?

                                // <BodyParam param={p} onChange={handleBodyChange}/>
                                // :
                                // <input
                                // data-param={p.name}
                                // style={styles.input}
                                // placeholder={p.description}
                                // onChange={handleParamChange}
                                // />
                                // )
                            }
                        </div>)
                    }
                </div>
            }
            {
                mode === 'try' &&
                <div style={styles.btnRow}>
                    <button onClick={handleExecute}>Execute</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            }
        </form>
            {
                mode === 'try' && rsp &&
                <div style={styles.response}>
                    <div>Server Response:</div>
                    <PlaygroundResponse rsp={rsp} />
                </div>
            }
    </div>
}

export default Playground;