const { Router } = require('express');
const router = Router();
const insertAthlete = require('./Controllers/insertAthlete');
const getData = require('./Controllers/getDataController');
const deleteAthlete = require('./Controllers/deleteAthlete');
const modifyAthlete = require('./Controllers/modifyDataController');
const modifyEvent = require('./Controllers/modifyDataController');
const modifyRegion = require('./Controllers/modifyDataController');
const getSingleAthlete = require('./Controllers/getDataController');
const getSingleEvent = require('./Controllers/getDataController');
const getSingleRegion = require('./Controllers/getDataController');

router.post('/insertAthlete', insertAthlete.handleAthlete);
router.delete('/deleteAthlete', deleteAthlete.handleDeleteAthlete);
// router.delete('/deleteevent', deleteEvent.handleDeleteEvent);
// router.delete('/deleteregion', deleteRegion.handleDeleteRegion);
router.get('/getAthletes', getData.handleGetAthletes);
router.get('/getRegions', getData.handleGetRegions);
router.get('/getEvents', getData.handleGetEvents);
router.put('/modifyathlete', modifyAthlete.handleModifyAthlete);
router.put('/modifyevent', modifyEvent.handleModifyEvent);
router.put('/modifyregion', modifyRegion.handleModifyRegion);

router.get('/getathlete/:id', getSingleAthlete.handleGetAthlete);
router.get('/getevent/:id', getSingleEvent.handleGetEvent);
router.get('/getregion/:id', getSingleRegion.handleGetRegion);

router.get('/getAthleteInfo/:name', getData.handleGetAthleteInfo);
router.get('/getEventInfo/:name', getData.handleGetEventInfo);
router.get('/getYearInfo/:year', getData.handleGetYearInfo);
module.exports = router;