import React from 'react'

import { OpenApi } from 'openapi-react'
import 'openapi-react/dist/index.css'

const App = () => {
  
  const theme = {
    layout:{
      leftNav: {
        width: '360px' // only support px for now
      },
      // body: {
      //   width: '300px' // support any
      // }
    }
  }

  const tags = [{
    name: 'Overview',
    description: '#### Why you should try openapi-react ?\n\n\- Execuatable restful api\n\n\- Smaller size\n\n\- Markdown syntax support\n\n\- Easy to insert sections\n\n'
  }];
  
  return <OpenApi 
    url={"https://petstore.swagger.io/v2/swagger.json"}
    tags={tags}
    theme={theme}
  />
}

export default App
