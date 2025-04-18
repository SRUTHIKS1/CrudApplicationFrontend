import { data } from "autoprefixer"
import { baseUrl } from "./baseUrl"
import { commonApi } from "./commonApi"


export const register = async (body)=>{
    

return await commonApi("POST",`${baseUrl}register`,body)

}
export const login = async (body)=>{
    

return await commonApi("POST",`${baseUrl}login`,body)

}
export const getUserDetails = async (userId) => {
    return await commonApi("GET", `${baseUrl}getUserDetails/${userId}`,{});
};

export const editUserDetails = async (userId,userData,headers) => {
    return await commonApi("PUT", `${baseUrl}editUserDetails/${userId}`,userData,headers);
  };

  export const createAd = async (data, headers) => {
    return await commonApi("POST", `${baseUrl}createAd`, data, headers); // removed trailing slash
  };
  

  export const getAllAds = async (data) => {
    return await commonApi("GET", `${baseUrl}getAllAds`,data);
  };