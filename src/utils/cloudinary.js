import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadfileToCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) console.error("Please specify the localFilePath:: Cloudinary");
        const file = await cloudinary.uploader.upload   //File has been uploaded using cloudinary
        (localFilePath,{
            public_id: "avatar",
            resource_type: "auto",
        }) //file has been uploaded successfully.
        console.log("File has been uploaded", file.url);
        return file
    } catch (error) {
        fs.unlink(localFilePath) //removed file from the server as the operation failed
        console.log("Error Occured :: Cloudinary :: ", error);
    }
};

export {uploadfileToCloudinary}