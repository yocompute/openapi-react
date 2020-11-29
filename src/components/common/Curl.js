import React from "react";

function Curl({route, operation, rsp}) {
  const style = {
    wrapper :{
      margin: '10px 0'
    },
    container: {
      background: "white",
      color: "black"
    },
    url: {
      color: 'green'
    }
  };
  let url = route.schemes[0] + "://" + route.host + route.basePath + route.url;
  let accpet = `"accept:${operation.produces[0]}"`;
  console.log(rsp);
  return (
    <div style={style.wrapper}>
      <div>Curl</div>
    <div id="curl" style={style.container}>
      curl -X {route.operationKey.toUpperCase()} <span style={style.url}>{url} {accpet}</span> 
      &nbsp; &nbsp;<button onClick={()=>navigator.clipboard.writeText(`curl - X ${route.operationKey.toUpperCase()} ${url} ${accpet}`)}>Copy</button>
    </div>
    </div>
  );
}

export default Curl;
