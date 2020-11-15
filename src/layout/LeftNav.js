import React, {useState} from 'react';

const styles = {
    leftNav:{
        width: '260px',
        float: 'left',
    },

    menuItem:{
        height: '20px',
        padding: '10px',
        fontSize: '18px',
        ':hover': {
            backgroundColor: '#eee',
        },   
    },

    subMenuItem: {
        // height: '18px',
        padding: '8px',
        paddingLeft: '20px',
        fontSize: '14px'
    }
};

const LeftNav = ({data, theme, onSelect}) => {

    const [menuMap, SetMenuMap] = useState(data);
    const leftNavStyle = {...styles.leftNav, ...theme.leftNav};


    const handleClick = e => {
        const { param } = e.target.dataset;
        const cloned = { ...menuMap };
        cloned[param].expanded = !cloned[param].expanded;
        SetMenuMap(cloned);
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
                        style={styles.subMenuItem}
                        key={it.operation + it.path}
                        onClick={() => handleSelect(it)}>
                        {`[${it.operation}] ${it.summary}`}
                        </div>)
                }
            </div>)
        }
    </div>;
};

export default LeftNav;