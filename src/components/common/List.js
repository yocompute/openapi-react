import React, {useState} from 'react'

const styles = {
    list:{
        width: '200px'
    },
    selected: {
        backgroundColor: 'black',
        padding: '3px 10px'
    },
    unselected:{
        backgroundColor: 'gray',
        padding: '3px 10px'
    }
}

// path { op, url }
const List = ({name, items, onSelect, theme}) => {
    const [val, setValue] = useState(items.default);

    const handleSelect = (event) => {
        const { v } = event.target.dataset;
        setValue(v);
        onSelect(name, v);
    }
    return <div style={styles.list}>
        {
            items.enum &&
            items.enum.map(v => <div key={v} 
                data-v={v}
                style={val === v ? styles.selected : styles.unselected}
                onClick={handleSelect}
                >
                {v}
            </div>)
        }
    </div>
}

export default List;