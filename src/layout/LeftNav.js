import React, { useState } from 'react';

const { innerHeight } = window;

const styles = {
    leftNav: {
        width: '360px',
        height: innerHeight,
        float: 'left',
        backgroundColor: '#eee'
    },

    menuItem: {
        height: '20px',
        padding: '10px',
        fontSize: '18px',
    },
    subMenuItem: {
        padding: '8px',
        paddingLeft: '20px',
        fontSize: '14px'
    },
    hovered: {
        padding: '8px',
        paddingLeft: '20px',
        fontSize: '14px',
        backgroundColor: '#ccc',
    },
};

const LeftNav = ({ data, theme, onSelect }) => {

    const [menuMap, SetMenuMap] = useState(data);
    const [hover, setHover] = useState({});
    const leftNavStyle = { ...styles.leftNav, ...theme.leftNav };

    const handleMouseEnter = (it) => {
        const h = { [it.operationKey + it.path]: true };
        setHover(h);
    }

    const handleMouseLeave = (it) => {
        const h = { [it.operationKey + it.path]: false };
        setHover(h);
    }

    const handleClick = e => {
        const { param } = e.target.dataset;
        const cloned = { ...menuMap };
        cloned[param].expanded = !cloned[param].expanded;
        SetMenuMap(cloned);
        onSelect(cloned[param]);
    };

    const handleSelect = item => {
        onSelect(item);
    };

    return <div style={leftNavStyle}>
        {
            Object.keys(menuMap).map(mk => <div key={mk}>
                <div style={styles.menuItem} data-param={mk} onClick={handleClick}>{mk}</div>
                {
                    menuMap[mk].expanded && menuMap[mk].items && menuMap[mk].items.length > 0 &&
                    menuMap[mk].items.map(it => <div
                        style={
                            hover[it.operationKey + it.path]? styles.hovered : styles.subMenuItem
                        }
                        key={it.operationKey + it.path}
                        onClick={() => handleSelect(it)}
                        onMouseEnter={() => handleMouseEnter(it)} // Or onMouseOver
                        onMouseLeave={() => handleMouseLeave(it)}
                        >
                        {`${it.summary}`}
                    </div>)
                }
            </div>)
        }
    </div>;
};

export default LeftNav;