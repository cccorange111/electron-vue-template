import axios from "axios";

const API_BASE = "http://127.0.0.1:8000"; 

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const processFiles = async (files1,files2,id,isAllSubstrate) => {
  const formData = new FormData();
  files1.forEach((file) => {
    console.log("file1",file)
    formData.append("substrateFiles", file); 
  });

  files2.forEach((file) => {
    console.log("file2",file)
    formData.append("productFiles", file); 
  });
  formData.append("id", id); 
  formData.append("isAllSubstrate", isAllSubstrate); 
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
  try {
    const response = await axios.post("http://127.0.0.1:8000/uploads/uploadfile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        console.log("上传进度:", Math.round((progressEvent.loaded * 100) / progressEvent.total));
      },
    });
    return response.data; 
    //return true;
  } catch (error) {
    console.error("上传失败", error);
    throw new Error("操作失败");
  }
};

export const getdetailData = async (id:string) => {
  try {
    const response = await apiClient.get("/search", {
      params: { id }, 
    });
    return response.data; 
  } catch (error) {
    console.error("搜索请求失败", error);
    throw new Error("搜索操作失败");
  }
};
//获取首页化合物信息和反应数量
export const getCountData = async (id:string) => {
  try {
    const response = await apiClient.get("/recordcount");
    console.log("获取首页化合物信息和反应数量",response.data)
    return response.data; 
  } catch (error) {
    console.error("搜索请求失败", error);
    throw new Error("搜索操作失败");
  }
};


export const searchByCAS = async (query:string,id:string) => {
  try {
    const response = await apiClient.get("/searchbycas", {
      params: { query,id }, 
    });
    return response.data; 
    // console.log(query,id)
    // return true;
  } catch (error) {
    console.error("搜索请求失败", error);
    throw new Error("搜索操作失败");
  }
};


export const searchByName = async (query:string,id:string) => {
  try {
    const response = await apiClient.get("/searchbyname", {
      params: { query,id }, 
    });
    return response.data; 
    // console.log(query,id)
    // return true;
  } catch (error) {
    console.error("搜索请求失败", error);
    throw new Error("搜索操作失败");
  }
};


export const searchLiterature = async(files1,id) => {
  const formData = new FormData();
  files1.forEach((file) => {
    console.log("file1",file)
    formData.append("substrateFiles", file); 
  });
  formData.append("id", id); 
  try {
    const response = await axios.post("http://127.0.0.1:8000/searchLiterature", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        console.log("上传进度:", Math.round((progressEvent.loaded * 100) / progressEvent.total));
      },
    });
    return response.data; 
    //return true;
  } catch (error) {
    console.error("上传失败", error);
    throw new Error("操作失败");
  }
};