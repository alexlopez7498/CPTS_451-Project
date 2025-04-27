const Athletes = require("../Models/athlete");
const Events = require("../Models/event");
const Regions = require("../Models/region");
const insertAthlete = async (athlete) => {
    try {
        console.log("Inserting athlete:", athlete);
        const result = await Athletes.createAthlete(
            athlete.name,
            athlete.sex,
            athlete.age,
            athlete.height,
            athlete.weight,
            athlete.noc
        );

        console.log("Athlete inserted successfully:", result);
        return result;
    } catch (error) {
        console.error("Error inserting athlete:", error);
        throw error; 
    }
};

const handleAthlete = async (req, res) => {
    try {
        const { name, sex, age, height, weight, noc } = req.body;


        const athlete = { name, sex, age, height, weight, noc };
        const result = await insertAthlete(athlete);

        res.status(201).json({
            message: "Athlete created successfully",
            athleteId: result.id,
        });
    } catch (error) {
        console.error("Error in athlete registration:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
};

const handleEvent = async (req, res) => {
    try {
        const { eventName, sport, city, season, year } = req.body;
        const result = await Events.createEvent(eventName, sport, city, season, year);
        res.status(201).json({
            message: "Event created successfully",
            eventId: result.id,
        });
    } catch (error) {
        console.error("Error in event registration:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}
    
const handleRegion = async (req, res) => {
    try {
        console.log("Inserting region:", req.body);
        const { noc, region, notes } = req.body;
        const result = await Regions.createRegion(noc, region, notes);
        res.status(201).json({
            message: "Region created successfully",
            regionId: result.id,
        });
    } catch (error) {
        console.error("Error in region registration:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
};



module.exports = {
    handleAthlete,
    handleEvent,
    handleRegion,
};