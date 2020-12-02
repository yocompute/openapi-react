import React, { useRef, useEffect, useState } from 'react';
import marked from 'marked';
import Response from './Response';
import HttpIconText from './common/HttpIconText';
import Playground from './common/Playground';
import Parameters from './Parameters';

const styles = {
    block: {
        // padding: "10px"
        display: "flex",
        alignItems: "stretch",
    },

    summary: {
        fontSize: "24px"
    },

    description: {
        color: "#333",
        padding: "5px 0px"
    },

    path: {
        color: "#333",
        padding: "5px 0px"
    },

    params: {
        color: "#333",
        padding: "5px 0px"
    },

    responses: {
        color: "#333",
        padding: "5px 0px"
    },

    content: {
        width: "calc(100% - 500px)",
        alignSelf: "stretch",
        borderBottom: '1px solid #eee'
    },

    playground: {
        width: "500px",
        alignSelf: "stretch",
        backgroundColor: "rgb(85,85,85)"
    },

    operationContent: {
        padding: '20px 15px'
    }

}

const mobileStyles = {
    block: {
        display: "block",
    },

    content: {
        width: "100%",
    },

    playground: {
        width: "100%"
    }
}

function Operation({ operation, route, definitionMap, theme }) {
    const myRef = useRef();
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 767;

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);

        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return (
        <div ref={myRef} style={width <= breakpoint ? mobileStyles.block : styles.block}>
            <div style={width <= breakpoint ? mobileStyles.content : styles.content}>
                <div style={styles.operationContent}>
                    {
                        operation.summary &&
                        <div style={styles.summary}>{operation.summary}</div>
                    }
                    {
                        operation.description &&

                        <div style={styles.description}  dangerouslySetInnerHTML={{ __html: marked(operation.description) }} />
                    }
                    {
                        route &&
                        <div style={styles.path}>
                            <HttpIconText route={route} />
                        </div>
                    }

                    <Parameters route={route} operation={operation} definitionMap={definitionMap} />
                    {
                        operation.responses &&
                        <div style={styles.responses}>
                            {
                                Object.keys(operation.responses).map(code => <Response key={code} rsp={operation.responses[code]} />)
                            }
                        </div>
                    }
                </div>
            </div>
            <div style={width <= breakpoint ? mobileStyles.playground : styles.playground}>
                <Playground route={route} operation={operation} definitionMap={definitionMap}
                    isMobile={width <= breakpoint} />
            </div>
        </div>
    );
}

export default Operation;
