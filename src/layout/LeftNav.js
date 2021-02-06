import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import defaultTheme from '../theme';
const { innerHeight } = window;

const LeftNav = ({ value, menuMap, theme, onSelect }) => {
    const useStyles = makeStyles((t) => ({
        root: {
            width: theme && theme.LeftNav ? theme.LeftNav.width : defaultTheme.leftNav.expandedWidth,
            backgroundColor: t.palette.background.paper,
            float: 'left',
            // height: innerHeight,
            overflowY: 'auto'
        },
        nested: {
            paddingLeft: t.spacing(4),
            paddingTop: '2px',
            paddingBottom: '2px',
            fontSize: '11px'
        },
    }));

    const classes = useStyles();
    const [selected, setSelected] = useState();

    useEffect(() => {
        setSelected(value);
    }, [value]);

    const handleClick = (e, item, hasSubMenus) => {
        if (typeof item === 'string') {
            const key = item;
            setSelected(key);
            const cloned = { ...menuMap };
            if(hasSubMenus){
                cloned[key].expanded = !menuMap[key].expanded;
            }
            onSelect({ newMenuMap: cloned, param: key, subMenu: null });
        } else{
            const key = item.operationKey + item.path;
            setSelected(key);
            onSelect({ subMenu: item });
        }
    };

    const [hover, setHover] = useState({});
    // const leftNavStyle = { ...styles.leftNav, ...theme.leftNav };

    const handleMouseEnter = (it, type) => {
        const h = type === 'subMenu' ? { [it.operationKey + it.path]: true } : { [it]: true };
        setHover({ ...hover, ...h });
    }

    const handleMouseLeave = (it, type) => {
        const h = type === 'subMenu' ? { [it.operationKey + it.path]: false } : { [it]: false };
        setHover({ ...hover, ...h });
    }

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >
            {
                Object.keys(menuMap).map(mk => (
                    <div key={mk}>
                        <ListItem button
                            selected={selected === mk}
                            onClick={(e) => handleClick(e, mk, menuMap[mk].items.length > 0)}
                        >
                            <ListItemText primary={mk} />
                            {
                                menuMap[mk].items.length > 0 &&
                                (menuMap[mk].expanded ? <ExpandLess /> : <ExpandMore />)
                            }
                        </ListItem>
                        {
                            menuMap[mk].items && menuMap[mk].items.length > 0 &&
                            <Collapse in={menuMap[mk].expanded} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        menuMap[mk].items.map(it => {
                                            const k = it.operationKey + it.path;
                                            return <ListItem
                                                button
                                                selected={selected === k}
                                                key={k}
                                                className={classes.nested}
                                                onClick={(e) => handleClick(e, it, false)}
                                            >
                                                <ListItemText primary={`${it.summary}`} />
                                            </ListItem>
                                        }
                                        )
                                    }
                                </List>
                            </Collapse>
                        }
                    </div>
                ))
            }
            {/* <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Sent mail" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
        </ListItem>
        <ListItem button onClick={handleClick}>
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                    <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                </ListItem>
            </List>
        </Collapse> */}
        </List>
    )
    // <div style={leftNavStyle}>
    //     {
    //         Object.keys(menuMap).map(mk => <div key={mk} style={styles.menuItem}>
    //             <div
    //                 style={hover[mk]? styles.mainMenuHovered : styles.mainMenu}
    //                 data-param={mk}
    //                 onClick={handleClick}
    //                 onMouseEnter={() => handleMouseEnter(mk, 'mainMenu')} // Or onMouseOver
    //                 onMouseLeave={() => handleMouseLeave(mk, 'mainMenu')}
    //                 >
    //                 <div style={styles.menuItemText} data-param={mk} >{mk}</div>
    //                 {
    //                     menuMap[mk].items && menuMap[mk].items.length > 0 &&
    //                     (menuMap[mk] && menuMap[mk].expanded ?
    //                     <div style={styles.downArrow} data-param={mk} >
    //                         <svg data-param={mk} viewBox="0 0 24 24" x="0" width="15" height="15" xmlns="http://www.w3.org/2000/svg" y="0" aria-hidden="true">
    //                             <polygon points="17.3 8.3 12 13.6 6.7 8.3 5.3 9.7 12 16.4 18.7 9.7 "></polygon>
    //                         </svg>
    //                     </div>
    //                     : <div style={styles.rightArrow} data-param={mk} >
    //                         <svg data-param={mk} viewBox="0 0 24 24" x="0" width="15" height="15" xmlns="http://www.w3.org/2000/svg" y="0" aria-hidden="true">
    //                             <polygon points="17.3 8.3 12 13.6 6.7 8.3 5.3 9.7 12 16.4 18.7 9.7 "></polygon>
    //                         </svg>
    //                     </div>
    //                     )
    //                 }
    //             </div>
    //             {
    //                 menuMap[mk].expanded && menuMap[mk].items && menuMap[mk].items.length > 0 &&
    //                 menuMap[mk].items.map(it => <div
    //                     style={
    //                         hover[it.operationKey + it.path]? styles.subMenuHovered : styles.subMenu
    //                     }
    //                     key={it.operationKey + it.path}
    //                     onClick={() => handleSelect(it)}
    //                     onMouseEnter={() => handleMouseEnter(it, 'subMenu')} // Or onMouseOver
    //                     onMouseLeave={() => handleMouseLeave(it, 'subMenu')}
    //                     >
    //                     {`${it.summary}`}


    //                 </div>)
    //             }
    //         </div>)
    //     }
    // </div>;
};

export default LeftNav;