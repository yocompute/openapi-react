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

// path { op, url }
const Playground = ({ path, operation, theme }) => {
    const [mode, setMode] = useState('view');
    const handleTry = () => {
        setMode('try');
    }
    const handleCancel = () => {
        setMode('view');
    }
    const handleExecute = () => {
        setMode('try');
    }
    return <div style={styles.container}>
        <HttpIconText path={path} />

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
                            <input style={styles.input} placeholder={p.description} />
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