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

```jsx
import React, { Component } from 'react'

import OpenApi from 'openapi-react'

class Example extends Component {
  render() {
    return <OpenApi spec={swaggerJsonObject} />
  }
}
```

### Use with theme

```jsx
import React, { Component } from 'react'

import OpenApi from 'openapi-react'

  const theme = {
    layout:{
      leftNav: {
        width: '320px'
      }
    }
  }

class Example extends Component {
  render() {
    return <OpenApi spec={swaggerJsonObject} theme={theme} />
  }
}
```


## License

MIT © [zlkca](https://github.com/zlkca)



#### run example
```bash
git clone https://github.com/yocompute/openapi-react.git
cd openapi-react
npm run build
cd example
npm i
npm start
```