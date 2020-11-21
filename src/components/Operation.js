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

function Operation({ operation, route, theme }) {
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
                route &&
                <div style={styles.path}>
                    <HttpIconText route={route} />
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
<<<<<<< HEAD
            <Playground route={route} operation={operation}/>
=======
            <Playground path={path} operation={operation}/>
>>>>>>> 5fcc17ce3fb6860f13ff7e74ccd9cf28f67674a5
        </div>
    );
}

export default Operation;