
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
  

  export const getAllAds = async (body) => {
    return await commonApi("GET", `${baseUrl}getAllAds`,body);
  };
  
  export const updateAd= async(adId,data,headers) =>{
    console.log(adId)
    console.log("data on updateAd",data)
    return await commonApi("PUT",`${baseUrl}updateAd/${adId}`,data,headers);
  }
  
  export const getUserAds = async (userId) => {
    return await commonApi("GET", `${baseUrl}getUsersAds/${userId}`,{});

};

export const getAdById = async (adId) => {
  return await commonApi("GET", `${baseUrl}getAdById/${adId}`);

};
export const search = async (query) => {
  return await commonApi("GET", `${baseUrl}search/${query}`, {});
};

export const searchByLocation = async (location) => {
  return await commonApi("GET", `${baseUrl}search/location/${location}`, {});
};


export const deleteAd = async (adId, headers) => {
  return await commonApi("DELETE", `${baseUrl}deleteAd/${adId}`, {}, headers);
};



export const resetPasswordRequest = async (data) => {
  console.log(data)
  return await commonApi("POST",`${baseUrl}forgotPassword/`,data); // removed trailing slash
};

export const resetPassword = async (token, data) => {
  return await commonApi("POST", `${baseUrl}resetPassword/${token}`, data);
};

export const getFavorites = async (userId, headers) => {
  return await commonApi("GET", `${baseUrl}getFavorites/${userId}`, {}, headers);
};
export const addToFavorites = async (userId, adId, headers) => {
  return await commonApi("POST", `${baseUrl}addToFavorites/${userId}/${adId}`, {}, headers);
};

export const removeFromFavorites = async (userId, adId, headers) => {
  return await commonApi("DELETE", `${baseUrl}removeFromFavorites/${userId}/${adId}`, {}, headers);
};


export const contactSeller = async ({ adId, ...data }) => {
  return await commonApi("POST", `${baseUrl}contactSeller/${adId}`, data);
};
