import React from 'react';
import PathItem from './PathItem';

function Paths({ paths, menuItems, route, definitionMap }) {
    const urls = Object.keys(paths);

    // urls.forEach(url => {
    //     console.log(`${url}`);
    // })
    return (
        <div>
            {
                urls.map(url =>
                    <div key={url} >
                        {
                            paths[url] &&
                            <PathItem 
                                pathItem={paths[url]}
                                route={{...route, url}}
                                menuItems={menuItems.filter(m => m.path === url)}
                                definitionMap={definitionMap}
                            />
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Paths;