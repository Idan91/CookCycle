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
          if (response.status >= 200 && response.status < 300) {
            resolve({ data: response.data, status: response.status });
          } else if (response.status === 401) {
            reject("Unauthenticated");
          } else if (response.status === 500) {
            reject("Server error!");
          }
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};
