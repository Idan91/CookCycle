import Axios from "../util/axios";

const baseURL = process.env.REACT_APP_COOKCYCLE_API_BASEURL;

export const cookcycleApiCall = async (
  methodType,
  apiCommand,
  requestBody = {}
) => {
  const url = `${baseURL}${apiCommand}`;

  // console.log(url, requestBody);

  return await new Promise((resolve, reject) => {
    try {
      Axios({
        method: methodType.toLowerCase(),
        url,
        data: requestBody,
      })
        .then((response) => {
          // console.log(response);
          if (response.status >= 200 && response.status < 300) {
            resolve({ data: response.data, status: response.status });
          } else if (response.status === 401) {
            // console.error(
            //   `Error 401, apiCommand: ${apiCommand} ${
            //     requestBody !== {} &&
            //     `requestBody: ${JSON.stringify(requestBody)}`
            //   }`
            // );
            reject("Unauthenticated");
          } else if (response.status === 500) {
            // console.log(response);

            // console.error(
            //   `Error 500, apiCommand: ${apiCommand} ${
            //     requestBody !== {} &&
            //     `requestBody: ${JSON.stringify(requestBody)}`
            //   }`
            // );
            reject("Server error!");
          }
        })
        .catch((err) => {
          // console.error(
          //   `Error, apiCommand: ${apiCommand} ${
          //     requestBody !== {} &&
          //     `requestBody: ${JSON.stringify(requestBody)}`
          //   }`
          // );
          reject(err);
        });
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};
