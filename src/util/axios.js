import axios from "axios";

axios.defaults.baseURL =
  "https://europe-west3-cookcycle-2e4a5.cloudfunctions.net/api";

export const Axios = axios;

export default Axios;
