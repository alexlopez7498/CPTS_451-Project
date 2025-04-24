const Athlete = require("../Models/athlete");
const Region = require("../Models/region");
const Event = require("../Models/event");

const handleGetAthletes = async (req, res) => {
    try {
        const athletes = await Athlete.getAthletes();
        if (!athletes) {
            return res.status(404).json({
                message: "No athletes found",
            });
        }

        res.json(athletes)
    } catch (error) {
        console.error("Error retrieving athletes:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}
const handleGetRegions = async (req, res) => {
    try {
        const regions = await Region.getRegions();
        if (!regions) {
            return res.status(404).json({
                message: "No regions found",
            });
        }

        res.json(regions);
    } catch (error) {
        console.error("Error retrieving regions:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
};

const handleGetEvents = async (req, res) => {
    try {
        const events = await Event.getEvents();
        if (!events) {
            return res.status(404).json({
                message: "No events found",
            });
        }

        res.json(events);
    } catch (error) {
        console.error("Error retrieving events:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}

const handleGetAthlete = async (req, res) => {
    const { id } = req.params;
    try {
        const athlete = await Athlete.getAthleteById(id);
        if (!athlete) {
            return res.status(404).json({
                message: "Athlete not found",
            });
        }

        res.json(athlete);
    } catch (error) {
        console.error("Error retrieving athlete:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}

const handleGetEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.getEventById(id);
        if (!event) {
            return res.status(404).json({
                message: "Event not found",
            });
        }

        res.json(event);
    } catch (error) {
        console.error("Error retrieving event:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}

const handleGetRegion = async (req, res) => {
    const { id } = req.params;
    try {
        const region = await Region.getRegionById(id);
        if (!region) {
            return res.status(404).json({
                message: "Region not found",
            });
        }

        res.json(region);
    } catch (error) {
        console.error("Error retrieving region:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
}

module.exports = {
    handleGetAthletes,
    handleGetRegions,
    handleGetEvents,
    handleGetAthlete,
    handleGetEvent,
    handleGetRegion
};