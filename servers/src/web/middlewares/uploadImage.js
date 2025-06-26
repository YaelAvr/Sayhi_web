const multer = require('multer');
const path = require('path'); 

const isImageMimeType = (mime) => {
  return ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"].includes(mime);
};

// Helper function to validate file type (remains the same)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') && isImageMimeType(file.mimetype)) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('File is not an image! Please upload only images.'), false);
    }
};

// Multer configuration for TEMPORARY storage
const tempStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // We assume 'temp_uploads' exists in the 'servers' root directory
        cb(null, 'tempUploads'); 
    },
    filename: (req, file, cb) => {
        // Create a unique filename to avoid conflicts
        // Format: <timestamp>-<random-number>.<extension>
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${extension}`);
    }
});

const uploadTemp = multer({
    storage: tempStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
});

module.exports = { uploadTemp };