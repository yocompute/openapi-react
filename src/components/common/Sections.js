import React from 'react';
import Section from './Section';

function Sections({ menuMap, host, schemes, basePath }) {

    return (
        <div>
            {
                Object.keys(menuMap).map(k =>
                    <div key={k}>
                        {
                            menuMap[k].items && menuMap[k].items.length > 0 &&
                            <Section menu={menuMap[k]} route={{host, schemes, basePath}}/>
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Sections;