const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname).toLowerCase());
    }
});

// Configure multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000  // 5 MB per file
    },
    fileFilter: function (req, file, cb) {
        // Only allow certain file types (e.g., images)
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and GIF are allowed.'));
        }
    }
});

module.exports = upload;
