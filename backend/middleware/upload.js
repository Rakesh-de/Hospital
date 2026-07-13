import multer from "multer";
import path from "path";

/*
====================================
Storage
====================================
*/

const storage = multer.memoryStorage();

/*
====================================
Allowed File Types
====================================
*/

const allowedTypes = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

/*
====================================
File Filter
====================================
*/

const fileFilter = (req, file, cb) => {

  if (allowedTypes.includes(file.mimetype)) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only PDF, JPG, JPEG and PNG files are allowed."
      ),
      false
    );

  }

};

/*
====================================
Upload Middleware
====================================
*/

const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize: 20 * 1024 * 1024, // 20MB

  },

});

export default upload;