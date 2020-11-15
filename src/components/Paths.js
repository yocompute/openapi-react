import React from 'react';
import PathItem from './PathItem';

function Paths({ paths }) {
    const urls = Object.keys(paths);

    // urls.forEach(url => {
    //     console.log(`${url}`);
    // })
    return (
        <div>
            {
                urls.map(url =>
                    <div key={url}>
                        <div>{url}</div>
                        {
                            paths[url] &&
                            <PathItem pathItem={paths[url]} />
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Paths;