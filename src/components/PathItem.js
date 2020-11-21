import React from 'react';
import Operation from './Operation';

function PathItem({pathItem, route}) {
    const operations = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];

    return (
        <div>
            {
                operations.map(op =>
                    <div key={op} >
                        {
                            pathItem[op] &&
                            <Operation operation={pathItem[op]} route={ {...route, op} }/>

                        }
                    </div>
                )
            }
        </div>
    );
}

export default PathItem;