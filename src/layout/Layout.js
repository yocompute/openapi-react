import React, {useRef, useState} from 'react'
import Content from './Content';
import LeftNav from './LeftNav';

const styles = {

}

// path { op, url }
const Layout = ({isMobile, spec, theme, onSelect}) => {
    const [tag, setTag] = useState();
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

    const handleScroll = (tag) => {
      setTag(tag);
    }

    const [menuMap, SetMenuMap] = useState(getMenuMap(spec));

    // item --- item in menuMap or submenu
    const handleSelect = (r) => {
      if(!r.subMenu){
        SetMenuMap(r.newMenuMap);
        const menu = r.newMenuMap[r.param];
        if(menu && menu.ref){
          menu.ref.current.scrollIntoView();
        }
      }else{
        if(r.subMenu.ref){
          r.subMenu.ref.current.scrollIntoView();
        }
      }
    };

    return <div style={{height: '100%'}}>
    {
      !isMobile &&
      <LeftNav
        value={tag}
        menuMap={menuMap}
        theme={theme && theme.layout ? theme.layout: {}}
        onSelect={handleSelect}
      />
    }
    <Content 
      spec={spec}
      menuMap={menuMap}
      theme={theme && theme.layout ? theme.layout: {}}
      isMobile={isMobile}
      onScroll={handleScroll}
    />
  </div>
}

export default Layout;