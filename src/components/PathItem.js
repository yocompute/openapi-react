import React from 'react';
import Operation from './Operation';

function PathItem(props) {
    const operations = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];
    const pathItem = props.pathItem;
    return (
        <div>
            {
                operations.map(op =>
                    <div key={op} >
                        {/* <div>{op}</div> */}
                        {
                            pathItem[op] &&
                            <Operation operation={pathItem[op]} />

                        }
                    </div>
                )
            }
        </div>
    );
}

export default PathItem;