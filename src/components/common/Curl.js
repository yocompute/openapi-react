import React from "react";

function Curl({route, operation}) {
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
    },
    button:{
      float: 'right'
    }
  };
  const url = route.schemes[0] + "://" + route.host + route.basePath + route.url;
  const accpet = `"accept:${operation.produces[0]}"`;
  const handleCopy = () => {
    navigator.clipboard.writeText(`curl - X ${route.operationKey.toUpperCase()} ${url} ${accpet}`);
  };
  return (
    <div style={style.wrapper}>
      <div>Curl</div>
    <div id="curl" style={style.container}>
      curl -X {route.operationKey.toUpperCase()} <span style={style.url}>{url} {accpet}</span> 
      &nbsp; &nbsp;<button style={style.button} onClick={()=> handleCopy()}>Copy</button>
    </div>
    </div>
  );
}

export default Curl;
