import React from "react";

function useServer(itemName) {

  const [dataValue, setDataValue] = React.useState({});
  const callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();
    if (response.stats !== 200) {
      throw Error(body.message);
    }
    return body;
  };
  
  React.useEffect(() => {
    callBackendAPI()
    .then(res => {
      setDataValue({ data: res.express });
    })
    .catch(err => console.error(err));
  }, []);
 
  const state = {
    dataValue,
  };
  const stateUpdaters = {
    setDataValue,
  };

  return { state, stateUpdaters };
}

export { useServer };
