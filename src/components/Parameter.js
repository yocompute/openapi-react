import React, { useEffect, useState } from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
// import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

function TransitionComponent(props) {
    // const style = useSpring({
    //   from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    //   to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
    // });

    return (
        //   <animated.div style={style}>
        <Collapse {...props} />
        //   </animated.div>
    );
}

TransitionComponent.propTypes = {
    /**
     * Show the component; triggers the enter or exit states
     */
    in: PropTypes.bool,
};

const StyledTreeItem = withStyles((theme) => ({
    iconContainer: {
        '& .close': {
            opacity: 0.3,
        },
    },
    group: {
        marginLeft: 7,
        paddingLeft: 18,
        borderLeft: '1px solid #333', // `1px dashed ${fade(theme.palette.text.primary, 0.4)}`
    },
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

const useStyles = makeStyles({
    root: {
        // height: 264,
        flexGrow: 1,
        // maxWidth: 400,
    },
    group: {
        marginLeft: 7,
        paddingLeft: 18,
        borderLeft: '1px solid #aaa' // `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
    },
    rootLevel:{

    },
    row:{
        width: '100%',
        display: 'flex'
    },
    name: {
        paddingLeft: '5px',
        float: 'left',
        width: '180px',
        display: 'flex'
    },
    nameText:{
        float: 'left'
    },
    type: {
        paddingLeft: '5px',
        float: 'left',
        color: '#aaa'
    },
    required: {
        fontSize: '13px',
        color: 'red',
        lineHeight: '20px',
        paddingLeft: '5px',
        float: 'left'
    },
    description: {
        paddingLeft: '20px',
        color: '#666',
        fontSize: '12px',
        float: 'left',
        marginTop: '-8px'
    },
    icon:{
        borderTop: `1px solid #666`,
        width: `30px`,
        marginLeft: `-24px`
    },
    none: {

    }
});


function Parameter({ param, schemaName, definitionMap }) {
    const classes = useStyles();

    const [schemaData, setSchemaData] = useState();
    const getSchemaName = (schema) => {
        if(schema){
            const s = schema.$ref;
            if(s){
                return s.replace('#/definitions/', '');
            }else{
                return null;
            }
        }else{
            return null;
        }
    }

    const getType = (param) => {
        if(param && param.type){
            return param.type === "array" ? `${param.type}[${param.items.type}]` : param.type;
        }else{
            return 'object'
        }
    }

    const isRequired = () => {

    }

    function getSchemaData(name, definitionMap, schema) {
        const data = {};
        data.name = name;
        data.type = getType(schema);
        data.required = schema.required;

        if (schema.$ref) {
            const schemaName = getSchemaName(schema);
            if(schemaName){
                return getSchemaData(name, definitionMap, definitionMap[schemaName]);
            }else{
                return null;
            }
        } else {
            const properties = schema.properties;
            if (properties) {
                const ps = [];
                Object.keys(properties).forEach(k => {
                    const property = properties[k];
                    if (property.$ref) {
                        const schemaName = getSchemaName(property);
                        if(schemaName){
                            ps.push(getSchemaData(k, definitionMap, definitionMap[schemaName]));
                        }else{
                            // fix me
                        }
                    } else {
                        if (property.type && property.type.trim() === 'array') {
                            ps.push(getSchemaData(k, definitionMap, property)); // fix me
                        } else {
                            ps.push(getSchemaData(k, definitionMap, property));
                        }
                    }
                });
                data.expandable = true;
                data.children = ps;
                return data;
            } else {
                return data;
            }
        }
    }

    useEffect(() => {
        const schemaName = getSchemaName(param.schema);
        if (schemaName && definitionMap[schemaName]) {
            const d = getSchemaData(param.name, definitionMap, definitionMap[schemaName]);
            setSchemaData(d);
        }else{
            const d = getSchemaData(param.name, definitionMap, param);
            setSchemaData(d);
        }
    }, [schemaName]);

    const renderTree = (schema) => {
        return (
            <TreeItem 
                nodeId={schema.name}
                icon={<div className={schema.name===param.name ? classes.none : classes.icon}/>}
                label={
                    <div className={classes.row}>
                    {
                        schema &&
                        <div className={classes.name}>
                            <span classNam={classes.nameText}>{schema.name}</span>
                        {
                            schema && schema.required &&
                            <span className={classes.required}> *required</span>
                        }
                        {
                        schema && schema.expandable &&
                        <ChevronRightIcon />
                        }
                        </div>
                    }
                    <div className={classes.type}>{schema.type}</div>
                    
                    {
                        schema && schema.description &&
                        <div className={classes.description} dangerouslySetInnerHTML={{ __html: marked(schema.description) }} />
                    }

                    </div>
                }
                className={schema.name === param.name ? classes.rootLevel : classes.group}
            >
                {Array.isArray(schema.children) ? schema.children.map((node) => renderTree(node)) : null}
            </TreeItem>
        )
    };

    return (
        <TreeView
            className={classes.root}
            defaultExpanded={[param.name]}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {
                schemaData &&
                renderTree(schemaData)
            }
        </TreeView>
    );
}

export default Parameter;