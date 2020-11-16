import React from 'react'

const styles = {
    icon: {
        width: '42px',
        height: '18px',
        borderRadius: '2px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontSize: '10px',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}

const getDefaultBackgroundColor = (key) => {
    const defaultColorMap = {
        get: '#2F8132',
        post: '#186FAF',
        put: '#95507c',
        options: '#947014',
        patch: '#bf581d',
        delete: '#cc3333',
        basic: '#707070',
        link: '#07818F',
        head: '#A23DAD',
    };

    return defaultColorMap[key] ? defaultColorMap[key] : '#A23DAD';
};

const HttpMethodIcon = ({ httpMethod }) => {
    const iconStyle = {
        ...styles.icon, ...{
            backgroundColor: httpMethod.backgroundColor ? httpMethod.backgroundColor :
                httpMethod.text ? getDefaultBackgroundColor(httpMethod.text) : '#A23DAD'
        }
    };


    return <div style={iconStyle}><span style={styles.text}>{httpMethod.text.toUpperCase()}</span></div>
}

export default HttpMethodIcon;