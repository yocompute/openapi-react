import React from 'react';
import PathItem from './PathItem';

function Paths({ paths, menuItems, host, schemes, basePath }) {
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
                                route={{url, host, schemes, basePath}}
                                menuItems={menuItems.filter(m => m.path === url)}
                            />
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Paths;