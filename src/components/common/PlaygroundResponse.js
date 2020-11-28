import React from 'react'

const PlaygroundResponse = ({rsp, theme}) => {

    const styles = {
        path: {
            height: '32px',
            float: 'left',
            paddingLeft: '12px'
        },
        icon: {
            float: 'left'
        },
        response:{
            height: '280px',
            border: '1px solid black',
            overflowY: 'auto',
            overflowX: 'auto',
            padding: '10px'
        },
        status: {
            padding: '10px',
            backgroundColor: rsp && rsp.status === 200 ? 'green' : 'orange'
        }
    }

    return <div style={styles.wrapper}>
        {
            rsp &&
            <div>
                <div style={styles.status}>Code: {rsp.status}</div>
                <pre style={styles.response}>
                    {rsp ? JSON.stringify(rsp.value, undefined, 2) : ''}
                </pre>
            </div>
        }
        {/* <div style={styles.icon} >
            <HttpMethodIcon httpMethod={{text: route.op}} />
        </div>
        <div style={styles.path}>{route.url}</div> */}
    </div>
}

export default PlaygroundResponse;