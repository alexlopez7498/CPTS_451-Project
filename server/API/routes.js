const {Router} = require('express');

const router = Router();
const insertAthlete = require('./Controllers/insertAthlete');


router.post('/insertAthlete', insertAthlete.handleAthlete);


module.exports = router;