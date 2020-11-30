import React from 'react'

import { OpenApi } from 'openapi-react'

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

  return <OpenApi url={"https://petstore.swagger.io/v2/swagger.json"} theme={theme}/>
}

export default App
