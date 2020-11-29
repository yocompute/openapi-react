import React, { useRef, useState, useEffect } from 'react';
import Content from './layout/Content';
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

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 767;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // item --- item in menuMap or submenu
  const handleSelect = menu => {
    if(menu.ref){
      menu.ref.current.scrollIntoView();
    }
  };

  return (

    <div style={{height: '100%'}}>
      {
        width > breakpoint &&
        <LeftNav 
          data={menuMap}
          theme={theme && theme.layout ? theme.layout: {}}
          onSelect={handleSelect}
        />
      }
      <Content 
        spec={spec}
        menuMap={menuMap}
        theme={theme && theme.layout ? theme.layout: {}}
        isMobile={width <= breakpoint}
      />
    </div>
  );
};
