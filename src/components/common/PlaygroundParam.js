import React from 'react'
import List from './List'
import BodyParam from './BodyParam'

const styles = {
    input: {
        width: '95%'
    },
}

const PlaygroundParam = ({param, params, definitionMap, isMobile, onChange}) => {

    const getParamShema = (param) => {
        const s = param.schema.$ref;
        if(s){
            const name = s.replace('#/definitions/', '');
            return definitionMap[name];
        }else{
            return null;
        }
    }

    const handleSelectParam = (name, value) => {
        const paramMap = {...params};
        paramMap[name].value = value;
        onChange(paramMap);
    }

    const handleParamChange = (event) => {
        const { param } = event.target.dataset;

        const paramMap = {...params};
        paramMap[param].value = event.target.value;
        onChange(paramMap);
    }

    const handleBodyChange = (name, val) => {
        const paramMap = {...params};
        paramMap[name].value = val ? JSON.parse(val) : null;
        onChange(paramMap);
    }

    if(param.in === 'body'){
        return <BodyParam
            isMobile={isMobile}
            val={params[param.name].value} 
            param={param}
            schema={getParamShema(param)}
            onChange={handleBodyChange}
            />
        
    } else if( param.type === 'array' ){
        return <List
            name={param.name} 
            items={param.items}
            onSelect={handleSelectParam}
        />
    }else if( param.type === 'file' ){
        return <input
            name={param.name} 
            type={param.type}
            placeholder={param.description}
            onSelect={handleSelectParam}
        />
    }else{
        return <input
            data-param={param.name}
            style={styles.input}
            placeholder={param.description}
            onChange={handleParamChange}
        />
    }
}

export default PlaygroundParam;