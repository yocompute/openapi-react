import React from 'react';

function Operation({operation}) {
    return (
        <div>
            {/* <div>{operation.summary}</div> */}
            {
                operation.description &&

                <div>{operation.description}</div>
            }
        </div>
    );
}

export default Operation;