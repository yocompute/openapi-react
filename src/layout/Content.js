import React, {useState} from 'react';
import Sections from './Sections';

const { innerHeight } = window;

function Content({spec, menuMap, theme, isMobile}){

    const styles = {
        width: isMobile? '100%' : 'calc(100% - 260px)',
        height: innerHeight,
        overflowY: 'scroll',
        float: 'left'
    };

    const myStyle = theme && theme.body && theme.body.width ? {...styles, ...{width: theme.body.with}} 
        : (!isMobile && theme && theme.leftNav && theme.leftNav.width ? {...styles, ...{width: `calc(100% - ${theme.leftNav.width})`} } : styles);


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

export default Content;