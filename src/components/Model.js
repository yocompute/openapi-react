import React from 'react'
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
const Model = ({route, theme}) => {
    return <div style={styles.row}>
        {/* <div style={styles.path}>{route.url}</div> */}
    </div>
}

export default Model;