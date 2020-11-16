import React from 'react';
import Parameter from './Parameter';
import Response from './Response';
import HttpIconText from './common/HttpIconText';
import Playground from './common/Playground';

const styles = {
    block: {
        padding: '10px'
    },
    summary: {
        fontSize: '20px'
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

function Operation({ operation, path, theme }) {
    return (
        <div style={styles.block}>
            {
                operation.summary &&
                <div style={styles.summary}>{operation.summary}</div>
            }
            {
                operation.description &&

                <div style={styles.description}>{operation.description}</div>
            }
            {
                path &&
                <div style={styles.path}>
                    <HttpIconText path={path} />
                </div>
            }
            {
                operation.parameters && operation.parameters.length > 0 &&
                <div style={styles.params}>
                    {
                        operation.parameters.map(p => <Parameter key={p.name} param={p} />)
                    }
                </div>
            }

            {
                operation.responses &&
                <div style={styles.responses}>
                    {
                        Object.keys(operation.responses).map(code => <Response key={code} rsp={operation.responses[code]} />)
                    }
                </div>
            }
            <Playground path={path} operation={operation}/>
        </div>
    );
}

export default Operation;