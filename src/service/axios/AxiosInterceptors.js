import axiosOrigin from "axios";
// import { Loading } from 'element-ui'
// 服务端不需loading
const Loading = require("element-ui").Loading;

let loadingInstance = "";
let loadingCount = 0;

let resetLoading = function() {
  loadingInstance && loadingInstance.close();
  loadingInstance = "";
  loadingCount = 0;
};

 // const JSONbig = require("json-bigint-string");

var config = {};

config.baseURL ='/api'

var axios = axiosOrigin.create(config);

axios.defaults.headers.get["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做某事
    // 增加api标识
    // config.url = config.url + "&prepareId=" + window.PrepareId;
    try {
      loadingInstance = Loading.service({});
      loadingCount++;
    } catch (err) {
      resetLoading();
    }

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// axios.defaults.transformResponse = [
//   function(data) {
//     // Do whatever you want to transform the data
//     return JSONbig.parse(data);
//   }
// ];

axios.interceptors.response.use(
  async function(response) {
    // loading处理
    try {
      loadingCount--;
      if (loadingCount == 0) loadingInstance.close();
      setTimeout(function() {
        resetLoading();
      }, 5000);
    } catch (err) {
       resetLoading();
    }
    // debugger
    // Do something with response data
    if (response && process.server && response.config) {
      // 服务端打印日志
      console.log("=====================seperate line=====================");
      console.log("axios from server url:", response.config.url);
    }

    // 非接口类 请求，直接返回
    if (!response) response = "";
    if (!response || !response.data || !response.status) return response;

    let data = response.data || "";
    let code = response.status;
    // token超时需要重新刷新token, 600测试用
    // token超时直接退出
    if (code == 301) {
      try {
        // if (!!Cookies) Cookies.clearAll();
        window.location.href = "/";
      } catch (error) {
        console.log(response, error);
      }
      // if(!!Cookies) {
      //   axios.get(serverUrl+"/sso/oauth2/refresh?accessToken=" + Cookies.get("accessToken") + "&refreshToken=" +  Cookies.get("refreshToken")).then(function(res){
      //     console.log("res:", res)

      //     axios.get(response.config.url).then((resData) => {
      //       //更新token
      //     })
      //   })

      // }
    }

    if (code == "OK" || code == 200) {
      if (process.server) {
        // 服务端打印日志
        console.log("response:", JSON.stringify(data));
      }
      if (data == undefined) return "";
      return data;
    } else {
      console.log("axios加载失败:", response.data);
    }
    return response;
  },
  function(error) {
    // Do something with response error
    try {
      resetLoading();
      return Promise.reject(error);
    } catch (err) {}
  }
);

export default axios;
