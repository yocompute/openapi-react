import React from 'react';
import Paths from '../Paths';

function Section({menu, route}) {
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
                host={route.host}
                schemes={route.schemes}
                basePath={route.basePath}
                menuItems={menu.items}
            />
        </div>
    );
}

export default Section;