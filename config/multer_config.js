const multer = require('multer');

const multer_config = {};

// SET STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
});

multer_config.upload = multer({ storage });

module.exports = multer_config;
