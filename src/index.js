import React, { useRef, useState } from 'react';
// import styles from './styles.module.css';
import Schema from './components/Schema';
import LeftNav from './layout/LeftNav';

export const OpenApi = ({ spec, theme }) => {

  const getMenuMap = spec => {
    const pathKeys = Object.keys(spec.paths);
    const mMap = {};
    
    spec.tags.forEach(tag => {
      mMap[tag.name] = {
        name: tag.name,
        description: tag.description,
        pathMap: {},
        items: [], // menu items
        expanded: true,
        ref: useRef(tag.name)
      };
    });

    pathKeys.forEach(pk => {
      const pathItem = spec.paths[pk];
      const operationKeys = Object.keys(pathItem);
      operationKeys.forEach(opk => {
        const operation = pathItem[opk];
        operation.tags.forEach(tagName => {
          
          mMap[tagName].pathMap[pk] = pathItem;

          mMap[tagName].items.push({
            type:'path',
            summary: operation.summary,
            operationKey: opk,
            operation,
            path: pk,
            ref: useRef(`${opk}_${pk}`)
          });
        });
      });
    });

    return mMap;
  };


  const [menuMap, setMenuMap] = useState(getMenuMap(spec));

  // item --- item in menuMap or submenu
  const handleSelect = menu => {
    if(menu.ref){
      menu.ref.current.scrollIntoView();
    }
  };

  return (

    <div style={{height: '100%'}}>
      <LeftNav 
        data={menuMap}
        theme={theme && theme.layout ? theme.layout: {}}
        onSelect={handleSelect}
      />
      <Schema 
        spec={spec}
        menuMap={menuMap}
        theme={theme && theme.layout ? theme.layout: {}}
      />
    </div>
  );
};
