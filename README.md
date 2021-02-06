# openapi-react

> A better swagger 2.0 document than swagger-ui and redoc ! (openapi spec support is coming soon! )

[![NPM](https://img.shields.io/npm/v/openapi-react.svg)](https://www.npmjs.com/package/openapi-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo
[See our Demo](https://doc.yocompute.com/)

## Install

```bash
npm install --save openapi-react
```


## Usage

#### Load by url:
```jsx
import { OpenApi } from 'openapi-react'

function App() {
    return <OpenApi url={"https://petstore.swagger.io/v2/swagger.json"} />
}
```

#### Load by swagger json object
```jsx
import { OpenApi } from 'openapi-react'

function App() {
    return <OpenApi spec={swaggerJsonObject} />
}
```

### Support Markdown syntax for description

In your swagger.json, you can assign Markdown content to description, openapi-react will follow Markdown spec to render it.


### Add or Modify Sections (swagger tags)

```jsx
import { OpenApi } from 'openapi-react'

const tags = [{
  name: 'Overview',
  description: '### Why you need to use openapi-react\n\n\
  *Execuatable restful api\n\n\
  *Smaller size\n\n\
  *Markdown syntax support\n\n\
  *Easy to insert sections\n\n\
  '
}];

function App() {
    return <OpenApi url={"https://petstore.swagger.io/v2/swagger.json"} tags={tags}/>
}
```

### Use with theme

```jsx
import { OpenApi } from 'openapi-react'

const theme = {
  layout:{
    leftNav: {
      width: '320px'
    }
  }
}

function App() {
    return <OpenApi spec={swaggerJsonObject} theme={theme} />
}
```


## License

MIT © [zlkca](https://github.com/zlkca)



#### run example

Firstly, build library:
```bash
git clone https://github.com/yocompute/openapi-react.git
cd openapi-react
npm i
npm run build
```

Then, you can go into example folder to try the lib:
```
cd example
npm i
npm start
```