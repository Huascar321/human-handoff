import React from "react";

function useServer(itemName) {
  const [dataValue, setDataValue] = React.useState();
  const callBackendAPI = async () => {
    const response = await fetch("/express_backend");
    const body = await response.json();
    console.log(body.express);
    console.log(response.ok);
    //if (response.stats !== 200) {
    //  throw Error(body.message);
    //}
    if (!response.ok) {
      const message = 'An error has ocurred: ${response.status}';
      throw new Error(message);
    }
    console.log(body.express);
    setDataValue(body.express);
  };

  React.useEffect(() => {
    callBackendAPI();
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
