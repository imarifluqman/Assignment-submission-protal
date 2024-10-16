const multer = require('multer');
const path = require('path');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//     }
// });

// const upload = multer({ 
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         const filetypes = /jpeg|jpg|png|pdf|docx/;
//         const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//         const mimetype = filetypes.test(file.mimetype);

//         if (mimetype && extname) {
//             return cb(null, true);
//         } else {
//             cb('Error: Images and documents only!');
//         }
//     }
// });





// Configure storage engine and filename
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Initialize upload middleware and add file size limit
  const upload = multer({
    storage: storage,
    limits: { fileSize: 500000000 } // 1MB file size limit
  }).single('myFile'); // 'myFile' is the name attribute of the file input field
  
module.exports = upload;
