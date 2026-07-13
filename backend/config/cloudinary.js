import { v2 as cloudinary } from "cloudinary";

/*
========================================
Cloudinary Configuration
========================================
*/

cloudinary.config({

  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

  api_key: process.env.CLOUDINARY_API_KEY,

  api_secret: process.env.CLOUDINARY_API_SECRET,

});

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