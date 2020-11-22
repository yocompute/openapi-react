import React from 'react';
import Operation from './Operation';

function PathItem({pathItem, route, menuItems}) {
    const operations = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];

    const getRef = (opk) => {
        const menuItem = menuItems.find(it => it.operationKey === opk);
        return menuItem ? menuItem.ref : null;
    }

    return (
        <div>
            {
                operations.map(operationKey =>
                    <div key={operationKey} ref={getRef(operationKey)}>
                        {
                            pathItem[operationKey] &&
                            <Operation operation={pathItem[operationKey]} route={ {...route, operationKey} }/>

                        }
                    </div>
                )
            }
        </div>
    );
}

export default PathItem;