import React, { useState, useEffect } from 'react';
import Layout from './layout/Layout';
import styles from './styles.module.css'

export const OpenApi = ({ url, spec, tags, theme }) => {

  const [swagger, setSwagger] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);
  const breakpoint = 767;

  const combineTags = (obj, tags) => {
    obj.tags.forEach(tag => {
      const tmp = tags.find(t => t.name === tag.name);
      if(!tmp){
        tags.push(tag);
      }
    });
    return tags;
  }

  useEffect(() => {
    if(url){
      window.fetch(url)
        .then(d => d.json())
        .then(t => {
          if(tags){
            t.tags = combineTags(t, tags);
          }
          setSwagger(t);
          setLoading(false);
        })
    } else if(spec){
      if(tags){
        spec.tags = combineTags(spec, tags);
      }
      setSwagger(spec);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return loading ?
    <div className={styles.load7}>
      <div className={styles.loader}>Loading...</div>
    </div>
    :
    <Layout
      isMobile={width <= breakpoint}
      spec={swagger}
      theme={theme}
    />
};
