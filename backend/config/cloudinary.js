import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary Config:", cloudinary.config());


console.log(cloudinary.config());
/*
========================================
Upload File
========================================
*/

export const uploadToCloudinary = async (
  fileBuffer,
  folder,
  resourceType = "auto"
) => {

  return new Promise((resolve, reject) => {

    const stream = cloudinary.uploader.upload_stream(

      {
        folder,
        resource_type: resourceType,
      },

      (error, result) => {

        if (error) {

          reject(error);

        } else {

          resolve(result);

        }

      }

    );

    stream.end(fileBuffer);

  });

};

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET);

/*
========================================
Delete File
========================================
*/

export const deleteFromCloudinary = async (
  publicId
) => {

  return await cloudinary.uploader.destroy(
    publicId
  );

};

export default cloudinary;