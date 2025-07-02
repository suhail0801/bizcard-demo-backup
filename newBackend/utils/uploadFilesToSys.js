const fs = require('fs');
const multer = require('multer');
const path = require('path');
const moment = require('moment');
const crypto = require('crypto');

// Function to save base64 image to file and return path
function saveBase64Image(base64String, userId = 'unknown', subfolder = 'card_images') {
    if (!base64String || typeof base64String !== 'string' || !base64String.startsWith('data:image')) {
        return base64String; // Already a path or invalid
    }
    const date = new Date();
    const dateFolder = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const baseOutputDir = path.join(__dirname, `../../frontend/public/uploads/${subfolder}/${userId}`, dateFolder);
    if (!fs.existsSync(baseOutputDir)) {
        fs.mkdirSync(baseOutputDir, { recursive: true });
    }
    const filename = `image_${Date.now()}.png`;
    const fullPath = path.join(baseOutputDir, filename);
    // Remove the header of the base64 string if it exists
    const base64Data = base64String.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(fullPath, buffer);
    // Return the relative path for DB
    return `/uploads/${subfolder}/${userId}/${dateFolder}/${filename}`;
}

// const createDirsRecursive = (filePath) => {
//   const dirname = path.dirname(filePath);
//   if (fs.existsSync(dirname)) {
//     return true;
//   }
//   createDirsRecursive(dirname);
//   fs.mkdirSync(dirname);
//   return true;
// };

/**
 * Geneartes unique hash
 */
const generateUniqueHash = (alg = 'md5') => {
  const hash = crypto
    .createHash(alg)
    .update(new Date().toISOString())
    .digest('hex');
  return hash;
};

// LOCAL: Save all user images in /uploads/profile_photos/{userId}_{username}/profile_{userId}_{timestamp}.ext
const fileStorage = multer.diskStorage({
  destination(req, file, cb) {
    const userId = req.user && req.user.id ? req.user.id : 'unknown';
    const username = req.user && req.user.username ? req.user.username.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'user';
    const dest = path.resolve(__dirname, '../../frontend/public/uploads/profile_photos', `${userId}_${username}`);
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    cb(null, dest);
  },
  filename(req, file, cb) {
    const userId = req.user && req.user.id ? req.user.id : 'unknown';
    const timestamp = Date.now();
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `profile_${userId}_${timestamp}${ext}`);
  }
});

/*
// CLOUD: S3 storage example (uncomment and configure for production)
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ /* credentials and region here * / });
const s3Storage = multerS3({
  s3: s3,
  bucket: 'your-bucket-name',
  acl: 'public-read',
  key: function (req, file, cb) {
    const userId = req.user && req.user.id ? req.user.id : 'unknown';
    const username = req.user && req.user.username ? req.user.username.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'user';
    const timestamp = Date.now();
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `profile_photos/${userId}_${username}/profile_${userId}_${timestamp}${ext}`);
  }
});
// To use S3 storage:
// const customFilesAndImages = multer({ storage: s3Storage }).any();
*/

const customFilesAndImages = multer({
    storage: fileStorage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG and PNG images are allowed.'));
        }
    }
}).any();

exports.customFilesAndImages = customFilesAndImages
exports.saveBase64Image = saveBase64Image;


// customFilesAndImages(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       // A Multer error occurred when uploading.
//       console.log(err, 'multer err');
//       res.status(400).json({errMsg: err})
//     } else if (err) {
//       // An unknown error occurred when uploading.
//       console.log(err, 'unknown err');
//       res.status(400).json({errMsg: err})
//     }


// const fd = new FormData()

// fd.append("faceRecognData", JSON.stringify(faceRecognData));

// $http({
//   method: "POST",
//   url: `/api/facerecognsetup`,
//   transformRequest: angular.identity,
//   headers: { "Content-Type": undefined },
//   data: fd
// })



exports.default = {
    saveBase64Image,
    customFilesAndImages
}