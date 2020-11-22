import React from 'react'
import HttpMethodIcon from './HttpMethodIcon'

const styles = {
    path: {
        height: '32px',
        float: 'left',
        paddingLeft: '12px'
    },
    icon: {
        float: 'left'
    },
    row:{
        height: '40px'
    }
}

// path { op, url }
const HttpIconText = ({route, theme}) => {
    return <div style={styles.row}>
        <div style={styles.icon} >
            <HttpMethodIcon httpMethod={{text: route.operationKey}} />
        </div>
        <div style={styles.path}>{route.url}</div>
    </div>
}

export default HttpIconText;