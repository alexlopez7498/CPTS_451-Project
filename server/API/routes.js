const {Router} = require('express');

const router = Router();
const insertAthlete = require('./Controllers/insertAthlete');
const getData = require('./Controllers/getDataController');
const deleteAthlete = require('./Controllers/deleteAthlete');

router.post('/insertAthlete', insertAthlete.handleAthlete);
router.delete('/deleteAthlete', deleteAthlete.handleDeleteAthlete);
router.get('/getAthletes', getData.handleGetAthletes);
router.get('/getRegions', getData.handleGetRegions);
router.get('/getEvents', getData.handleGetEvents);
router.get('/getAthleteInfo/:name', getData.handleGetAthleteInfo);
router.get('/getEventInfo/:name', getData.handleGetEventInfo);
router.get('/getYearInfo/:year', getData.handleGetYearInfo);
module.exports = router;