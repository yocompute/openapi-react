import React from 'react';
import Section from '../components/common/Section';

function Sections({ menuMap, route, definitionMap}) {

    return (
        <div>
            {
                Object.keys(menuMap).map(k =>
                    <div key={k} id={k}>
                        {
                            // menuMap[k].items && menuMap[k].items.length > 0 &&
                            <Section menu={menuMap[k]} route={route} definitionMap={definitionMap}/>
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Sections;