import React from 'react';
import styles from './styles.module.css';
import Schema from './components/Schema';
import LeftNav from './layout/LeftNav';

export const OpenApi = ({ spec, theme }) => {

  const getMenuMap = spec => {
    const pathKeys = Object.keys(spec.paths);
    const menuMap = {};
    
    spec.tags.forEach(tag => {
      menuMap[tag.name] = {name: tag.name, items: [], expanded: false};
    });

    pathKeys.forEach(pk => {
      const pathItem = spec.paths[pk];
      const operationKeys = Object.keys(pathItem);
      operationKeys.forEach(opk => {
        const operation = pathItem[opk];
        operation.tags.forEach(tagName => {
          menuMap[tagName].items.push({
            type:'path',
            summary: operation.summary,
            operation: opk,
            path: pk
          });
        });

      });
    });

    return menuMap;
  };

  /**
   * 
   * @param {type, summary, operation, path} item 
   */
  const handleSelect = item => {
    // jump to menuMap
  };

  return (

    <div style={{height: '100%'}}>
      <LeftNav 
        data={getMenuMap(spec)}
        theme={theme && theme.layout ? theme.layout: {}}
        onSelect={handleSelect}
      />
      <Schema 
        spec={spec}
        theme={theme && theme.layout ? theme.layout: {}}
      />
    </div>
  );
};
