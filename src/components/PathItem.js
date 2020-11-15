import React from 'react';
import Operation from './Operation';

function PathItem({pathItem, url}) {
    const operations = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];

    return (
        <div>
            {
                operations.map(op =>
                    <div key={op} >
                        {
                            pathItem[op] &&
                            <Operation operation={pathItem[op]} path={ {url, op} }/>

                        }
                    </div>
                )
            }
        </div>
    );
}

export default PathItem;