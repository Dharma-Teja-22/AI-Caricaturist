import axios from "axios";
// const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SERVER_URL = window.location.origin;

export default {
  post: {
    uploadUserImage : async (image, userName) => {
      try
      {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("userName",userName)
        const response = await axios.post(`${SERVER_URL}/api/uploadUserImage`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      }
      catch (error){
        console.log("Error: ", error);
        throw error;
      }
    },

    generateCaricature : async (id, userImageUrl, styleUrl, prompt) =>{
      try
      {
        const response = await axios.post(`${SERVER_URL}/api/${id}/getCaricatureImage`,{userImageUrl, styleUrl, prompt});
        return response.data;
      }
      catch(error)
      {
        console.log("Error : ", error);
        throw error;
      }
    },

    uploadStyle : async(styleImage) =>{
      try{
        const formData = new FormData();
        formData.append("image", image);
        const response = await axios.post(`${SERVER_URL}/api/uploadStyles`, styleImage, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log(response);
        return response.data;
      }
      catch(error)
      {
        console.log(error);
        throw error;
      }
    }
  },

  get:{
    getStyles: async() => {
      try{
        const response = await axios.get(`${SERVER_URL}/api/getStyles`)
        return response.data;
      }
      catch(error){
        console.log(error);
        throw error;
      }
    },
    
  },

  put:{
    updateStyleData : async(id, prompt) =>{
      try{
        const response = await axios.put(`${SERVER_URL}/api/${id}/updateStyleName`, {prompt});
        console.log(response);
        return response.data;
      }
      catch(error)
      {
        console.log(error);
        throw error;
      }
    },

    updateUserData : async (id, userEmail, userName) =>{
      try{
        const response = await axios.post(`${SERVER_URL}/api/${id}/updateUserEmail`,{userEmail, userName});
        return response.data;
      }
      catch(error)
      {
        console.log(error);
        throw error;
      }
    }
  }
};
