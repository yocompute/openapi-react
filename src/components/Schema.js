import React, { useEffect, useState } from 'react';
import marked from 'marked';

const styles = {
    wrapper:{
        padding: '3px 20px',
        fontSize: '14px',
        color: '#222'
    },
    properties: {
        padding: '5px 15px'
    },
    property:{
        padding: '3px 0px'
    }
};
// const mobileStyle = {

// }
function Schema({ name, definitionMap }) {

    const [schema, setSchema] = useState();

    useEffect(() => {
        if (name && definitionMap[name]) {
            setSchema(definitionMap[name]);
        }
    }, []);

    const getSchemaName = (ref) => {
        if (ref) {
            return ref.replace('#/definitions/', '')
        } else {
            return null;
        }
    }

    const isRequired = () => {

    }


    return (
        <div style={styles.wrapper}>
            {
                schema &&
                <div>{name}</div>
            }
            {
                schema && schema.properties &&
                <div style={styles.properties}>
                    {
                        Object.keys(schema.properties).map(k => <div key={k} >
                            {
                                schema.properties[k].$ref ?
                                    <Schema
                                        name={getSchemaName(schema.properties[k].$ref)}
                                        definitionMap={definitionMap}
                                    />
                                    :
                                    <div style={styles.property}>
                                        <div>{`${k} [${schema.properties[k].type}]`}</div>
                                        {
                                            schema.properties[k].description &&
                                            <div dangerouslySetInnerHTML={{ __html: marked(schema.properties[k].description) }} />
                                        }
                                    </div>
                            }
                        </div>
                        )
                    }
                </div>
            }
        </div>
    );
}

export default Schema;