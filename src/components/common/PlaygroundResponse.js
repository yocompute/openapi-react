import React from 'react'
import HttpMethodIcon from './HttpMethodIcon'



// path { op, url }
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
        textarea:{
            width: '99.4%',
            height: '280px'
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
                <textarea readOnly
                    style={styles.textarea}
                    value={rsp ? rsp.value : ''}
                />
            </div>
        }
        {/* <div style={styles.icon} >
            <HttpMethodIcon httpMethod={{text: route.op}} />
        </div>
        <div style={styles.path}>{route.url}</div> */}
    </div>
}

export default PlaygroundResponse;