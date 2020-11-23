import React from 'react';
// import Paths from './Paths';
import Sections from './common/Sections';

const { innerHeight } = window;

const styles = {
    width: 'calc(100% - 260px)',
    height: innerHeight,
    overflowY: 'scroll',
    float: 'left'
};

function Schema({spec, menuMap, theme}){

    const myStyle = theme && theme.body && theme.body.width ? {...styles, ...{width: theme.body.with}} 
        : (theme && theme.leftNav && theme.leftNav.width ? {...styles, ...{width: `calc(100% - ${theme.leftNav.width})`} } : styles);

    
    return (
        <div style={myStyle}>
            <Sections
                menuMap={menuMap}
                route={{host: spec.host, schemes: spec.schemes, basePath: spec.basePath}} 
                definitionMap={spec.definitions}
            />
        </div>
    );
}

export default Schema;