const multer_config = require('../config/multer_config');

const express = require('express');
const router = express.Router();
const fs = require('fs');

const clamd = require('clamdjs')
const clamavScanner = clamd.createScanner('localhost', '3310')

router.post('/file', multer_config.upload.single('file'), (req, res, next) => {
    const file = req.file;

    if (!file) {
        return next({ status: 400, message: 'File is required' })
    }

    const fileStream = fs.createReadStream(file.path);

    clamavScanner.scanStream(fileStream, (error, object, virus) => {
        fileStream.destroy()
        fs.unlink(file.path, () => { })

        if (error) {
            next(error);
        } else if (virus) {
            console.log(`Scanned file ${file.originalname}, path ${file.path}: ${virus} FOUND`);
            res.json({ infected: true, virus });
        } else {
            console.log(`Scanned file ${file.originalname}, path ${file.path}: OK`);
            res.json({ infected: false });
        }
    });
});

module.exports = router;
