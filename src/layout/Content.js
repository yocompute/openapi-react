import React, { useEffect } from 'react';
import Sections from './Sections';

const { innerHeight } = window;

function Content({spec, menuMap, theme, isMobile, onScroll}){

    const styles = {
        width: isMobile? '100%' : 'calc(100% - 260px)',
        height: innerHeight,
        overflowY: 'scroll',
        float: 'left'
    };

    const myStyle = theme && theme.body && theme.body.width ? {...styles, ...{width: theme.body.with}} 
        : (!isMobile && theme && theme.leftNav && theme.leftNav.width ? {...styles, ...{width: `calc(100% - ${theme.leftNav.width})`} } : styles);

    const getId = (route) => {
        return `${route.operationKey}-${route.path.replace(/\//g, '-').replace(/\{/g, '-').replace(/\}/g, '-')}`;
    }

    const highlightSubmenu = (tag) => {
        menuMap[tag].items.forEach(it => {
            const id = getId(it);
            const ele = document.getElementById(id);
            if(ele){
                const t1 = ele.getBoundingClientRect().top;
                if(t1 > 0 && t1 < 25){
                    // console.log(id);
                    onScroll(it.operationKey + it.path);
                    return;
                }
            }
        });
    }

    const handleScroll = (e) => {
        const position = window.pageYOffset;
        // setSrollPosition(position);
        Object.keys(menuMap).forEach(tag => {
            const el = document.getElementById(tag);
            if(el){
                const t = el.getBoundingClientRect().top;
                if(t > 0 && t < 25){
                    // console.log(tag);
                    onScroll(tag);
                    return;
                }else{
                    highlightSubmenu(tag);
                    return;
                }
            }else{
                highlightSubmenu(tag);
                return;
            }
        })
    };

    return (
        <div style={myStyle} onScroll={handleScroll}>
            <Sections
                menuMap={menuMap}
                route={{host: spec.host, schemes: spec.schemes, basePath: spec.basePath}} 
                definitionMap={spec.definitions}
            />
        </div>
    );
}

export default Content;