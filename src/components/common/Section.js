import React from 'react';
import Paths from '../Paths';

function Section({menu, route, definitionMap}) {
    const styles = {
        name: {
            fontSize: '26px',
            padding: '10px 0px'
        },
        description: {
            color: '#333',
            padding: '5px 10px'
        },
    };
    return (
        <div ref={menu.ref}>
            <div style={styles.name}>{menu.name}</div>
            <div style={styles.description}>{menu.description}</div>
            <Paths
                paths={menu.pathMap}
                route={route}
                menuItems={menu.items}
                definitionMap={definitionMap}
            />
        </div>
    );
}

export default Section;