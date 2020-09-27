import axios from "axios";
import url from '../assets/gameurls.json'
const Api = (function () {

  return {
    get: function (route) {
      const requestURL = this.getBaseURL() + route;
      return axios.get(requestURL)
      .catch((resp) => {
        if (resp.response.status ===200) {
            return Promise.reject(resp.data);
        }
      })
    },
    post: function (route, body) {
      const requestURL = this.getBaseURL() + route;
      return axios.post(requestURL,body, {headers: {
        'Accept': 'application/json'}})
      .catch((resp) => {
        if (resp.response.status ===200) {
            return Promise.resolve(resp.response.data);
        }
      })
    },
    getBaseURL: function () {
      return url.finding_falcone.baseUrl;       
    }
  };
})();

export default Api;