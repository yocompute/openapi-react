import React, {useRef} from 'react';
import Parameter from './Parameter';
import Response from './Response';
import HttpIconText from './common/HttpIconText';
import Playground from './common/Playground';
import Parameters from './Parameters';

const styles = {
    block: {
        padding: '10px'
    },
    summary: {
        fontSize: '24px'
    },
    description: {
        color: '#333',
        padding: '5px 0px'
    },
    path: {
        color: '#333',
        padding: '5px 0px'
    },
    params: {
        color: '#333',
        padding: '5px 0px'
    },
    responses: {
        color: '#333',
        padding: '5px 0px'
    },
};

function Operation({ operation, route, definitionMap, theme }) {
    const myRef = useRef();
    
    return (
        <div ref={myRef} style={styles.block}>
            {
                operation.summary &&
                <div style={styles.summary}>{operation.summary}</div>
            }
            {
                operation.description &&

                <div style={styles.description}>{operation.description}</div>
            }
            {
                route &&
                <div style={styles.path}>
                    <HttpIconText route={route} />
                </div>
            }
            {/* {
                operation.parameters && operation.parameters.length > 0 &&
                <div style={styles.params}>
                    {
                        operation.parameters.map(p => <Parameter key={p.name} param={p} />)
                    }
                </div>
            } */}
            <Parameters route={route} operation={operation} definitionMap={definitionMap} />
            {
                operation.responses &&
                <div style={styles.responses}>
                    {
                        Object.keys(operation.responses).map(code => <Response key={code} rsp={operation.responses[code]} />)
                    }
                </div>
            }
            <Playground route={route} operation={operation} definitionMap={definitionMap}/>
        </div>
    );
}

export default Operation;
