import React, { useState } from 'react'
import HttpIconText from './HttpIconText'

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
    }
}

// route { op, url, host, schemes }
const Playground = ({ route, operation, theme }) => {
    const getParams = () => {
        const ps = {};
        operation.parameters.forEach(p => {
            ps[p.name] = {...p, value:''};
        });
        return ps;
    }

    const [mode, setMode] = useState('view');
    const [params, setParams] = useState(getParams());
    const handleTry = () => {
        setMode('try');
    }

    const handleCancel = () => {
        setMode('view');
    }

    const handleParamChange = (event) => {
        const { param } = event.target.dataset;

        const paramMap = {...params};
        paramMap[param].value = event.target.value;
        setParams(paramMap);
    }

    const getPathParamValue = () => {
        const ps = [];
        Object.keys(params).forEach(k => {
            if(params[k].in === 'path'){
                ps.push(params[k]);
            }
        })
        if(ps && ps.length >0){
            return ps[0].value;
        }else{
            return null;
        }
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

    const handleExecute = (event) => {
        event.preventDefault();
        if(route && route.op){
            
            const v = getPathParamValue();
            const url = v ? `${route.schemes[0]}://${route.host}${route.basePath}${route.url}/${v}`:
            `${route.schemes[0]}://${route.host}${route.basePath}${route.url}`;

            const q = getQueryParamStr();
            const qUrl = q ? `${url}?${q}` : url; 

            window.fetch(qUrl, {
                mode:'cors',
                method: route.op.toUpperCase(),
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                cache: 'no-cache',
                // redirect: 'follow', // manual, *follow, error
                // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                // body: JSON.stringify(data) // body data type must match "Content-Type" header
            })
            .then(rsp => rsp.json())
            .then( d => {
                const t = d;
                console.log(d);
                // setMode('try');
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
                            <div>{p.name}</div>
                            <input
                                data-param={p.name}
                                style={styles.input}
                                placeholder={p.description}
                                onChange={handleParamChange}
                            />
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
    </div>
}

export default Playground;