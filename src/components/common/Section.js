import React from 'react';
import marked from 'marked';
import Paths from '../Paths';

function Section({menu, route, definitionMap}) {
    const styles = {
        name: {
            fontSize: '26px',
            padding: '10px'
        },
        description: {
            color: '#333',
            padding: '5px 10px'
        },
    };
    return (
        <div ref={menu.ref}>
            <div style={styles.name}>{menu.name}</div>
            <div style={styles.description} dangerouslySetInnerHTML={{ __html: marked(menu.description) }} />

            {
                !(Object.keys(menu.pathMap).length === 0 && menu.pathMap.constructor === Object) && menu.items.length > 0 &&
                <Paths
                    paths={menu.pathMap}
                    route={route}
                    menuItems={menu.items}
                    definitionMap={definitionMap}
                />
            }
        </div>
    );
}

export default Section;