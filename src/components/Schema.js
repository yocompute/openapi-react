import React from 'react';
import Paths from './Paths';

const styles = {
    width: 'calc(100% - 260px)',
    float: 'left'
}

function Schema({spec, theme}){

    const myStyle = theme && theme.body && theme.body.width ? {...styles, ...{width: theme.body.with}} 
        : (theme && theme.leftNav && theme.leftNav.width ? {...styles, ...{width: `calc(100% - ${theme.leftNav.width})`} } : styles);

    
    return (
        <div style={myStyle}>
            <Paths paths={spec.paths} />
        </div>
    );
}

export default Schema;