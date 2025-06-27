const fs = require('fs');
const multer = require('multer');
const path = require('path');
const moment = require('moment');
const crypto = require('crypto');

// Function to save base64 image to file and return path
function saveBase64Image(base64String, outputPath) {
    // Remove header (data:image/png;base64,) from base64 string
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');

    // Create buffer from base64 data
    const buffer = Buffer.from(base64Data, 'base64');

    // Extract directory path from output path
    const directory = path.dirname(outputPath);

    // Check if directory exists, if not, create it
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
    
    // Write buffer to file
    fs.writeFileSync(outputPath, buffer);

    // Return the path of the saved image
    return outputPath;
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



const fileStorage = multer.diskStorage({
    destination(req, file, cb) {
      console.log('file in storage',file);
      const todayInFormat = moment().tz('Asia/Kolkata', true).format('DD-MMM-YYYY');
      let dest;
    
      // if(file.fieldname == 'uploadedImages' || file.fieldname == 'secondaryUploadedImages' || file.fieldname == 'uploadedProfile'){
    
      if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        dest = `${path.resolve(__dirname, '../../frontend')}/public/uploads/${req.user.fullName}_${req.user.id}/${todayInFormat}/images/`;
        // console.log(dest, "DEST")
      // } else if(file.fieldname == 'uploadedFiles' || file.fieldname == 'customUploadDocs') {
      } else if(file.mimetype === 'application/pdf' || file.mimetype === 'text/plain' || file.mimetype === 'application/vnd.ms-excel') {
        dest = `${path.resolve(__dirname, '../../frontend')}/public/uploads/${req.user.fullName}_${req.user.id}/${todayInFormat}/files/`;
      } else {
        console.log(file.mimetype.split('/')[0], 'no file');
      }
      console.log(dest, 'dest created')

      // Extract directory path from output path
      const directory = path.dirname(dest + "sample.txt");
      // Check if directory exists, if not, create it
      if (!fs.existsSync(directory)) {
          console.log(directory, 'directory created')
          fs.mkdirSync(directory, { recursive: true });
      }
      
      // createDirsRecursive(`${dest}simplefile.x`);
      cb(null, dest);
      // console.log(dest, file, "dest")
    },
    filename(req, file, cb) {
      const uniqueHashAC = generateUniqueHash();
      // const fileName = uniqueHashAC + "-" + path.basename(file.originalname, path.extname(file.originalname)) + path.extname(file.originalname);
      console.log(file, "FILE>NAME")
      // cb(null, `${uniqueHashAC}-${path.extname(file.originalname)}`);
      cb(null, `${uniqueHashAC}-${file.originalname}`);
    },
});


const customFilesAndImages = multer({
    storage: fileStorage,
}).any();

exports.customFilesAndImages = customFilesAndImages


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