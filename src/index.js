import React, { useState, useEffect } from 'react';
import Layout from './layout/Layout';

export const OpenApi = ({ url, spec, theme }) => {

  const [swagger, setSwagger] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 767;

  useEffect(() => {
    if(url){
      window.fetch(url)
        .then(d => d.json())
        .then(t => {
          setSwagger(t);
          // setMenuMap(getMenuMap(t));
        })
    } else if(spec){
      setSwagger(spec);
      // setMenuMap(getMenuMap(spec));
    }
  }, []);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);




  if (swagger){
    return <Layout
      isMobile={width <= breakpoint}
      spec={swagger}
      theme={theme}
      />
    }
  else{
    return <div>Failed to load swagger, possible wrong swagger format.</div>
  }
};
