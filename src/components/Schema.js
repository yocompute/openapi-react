import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
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
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
    },
});


function Schema({ name, definitionMap }) {
    const classes = useStyles();

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
    const data = {
        id: 'root',
        name: 'Parent',
        children: [
          {
            id: '1',
            name: 'Child - 1',
          },
          {
            id: '3',
            name: 'Child - 3',
            children: [
              {
                id: '4',
                name: 'Child - 4',
              },
            ],
          },
        ],
      };
    const renderTree = (nodes) => {
        return <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
          {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    };

      return (
        <TreeView
          className={classes.root}
        //   defaultCollapseIcon={<ExpandMoreIcon />}
        //   defaultExpanded={['root']}
        //   defaultExpandIcon={<ChevronRightIcon />}
        >
          {renderTree(data)}
        </TreeView>
      );
    // return (
    //     <TreeItem nodeId="1" label={name} >
    //         {
    //             // schema && schema.properties &&

    //             // Object.keys(schema.properties).map(k => {
    //             properties.map(k => {
    //                     // schema.properties[k].$ref ?
    //                     // <Schema key={k}
    //                     //     name={getSchemaName(schema.properties[k].$ref)}
    //                     //     definitionMap={definitionMap}
    //                     // />
    //                     // :
    //                     <TreeItem key={k} nodeId={k} label={k}
    //                         // <div>
    //                         //     <div>{`${k} [${schema.properties[k].type}]`}</div>
    //                         //     {
    //                         //         schema.properties[k].description &&
    //                         //         <div dangerouslySetInnerHTML={{ __html: marked(schema.properties[k].description) }} />
    //                         //     }
    //                         // </div>
    //                     >

    //                     </TreeItem>
    //             }
    //             )
    //         }
    //     </TreeItem>
    // );
}

export default Schema;