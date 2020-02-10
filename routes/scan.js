const express = require('express');
const router = express.Router();

const exec = require('child_process').exec;

router.post('/file', (req, res, next) => {
    if (!req.files) {
        return res.status(400).send('No files were scanned')
    }

    console.log('===> Scanning file ...');

    const file = req.files.file;

    exec('clamscan' + ' ' + file, (error, stdout, stderr) => {
        const lines = stdout.toString().split('\n')[0].split(' ')[1];
        const virus = stdout.toString().split('\n')[7].split(' ')[2];

        res.send('Scan complete');
    });
});

module.exports = router;
