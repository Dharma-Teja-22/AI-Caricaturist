import axios from "axios";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
// const SERVER_URL = window.location.origin;

export default {
  post: {
    uploadUserImage : async (image) => {
      try
      {
        const formData = new FormData();
        formData.append("image", image);
        const response = await axios.post(`${SERVER_URL}/api/uploadUserImage`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log(response);
        
        return response.data;
      }
      catch (error){
        console.log("Error: ", error);
        throw error;
      }
    },

    generateCaricature : async (userImageURL) =>{
      try
      {
        const response = await axios.post(`${SERVER_URL}/getCaricatureImage`,{userImageURL});
        return response.data;
      }
      catch(error)
      {
        console.log("Error : ", error);
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
    }
  }
};
