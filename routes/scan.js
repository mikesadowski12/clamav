const express = require('express');
const router = express.Router();

router.post('/file', (req, res, next) => {
    console.log('Scanning file ...');
    res.send('Finished Scanning');
});

module.exports = router;
