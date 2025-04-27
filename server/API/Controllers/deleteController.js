const Athletes = require("../Models/athlete");
const Events = require("../Models/event");
const Regions = require("../Models/region");

const handleDeleteAthlete = async (req, res) => {
    try {
        const { id } = req.body; // Extract the id from the request body

        console.log("Deleting athlete with id:", id);

        // Find the athlete by id
        const athlete = await Athletes.findByPk(id);

        if (!athlete) {
            return res.status(404).json({ message: "Athlete not found" });
        }

        // Delete the athlete from the database
        await athlete.destroy();

        console.log("Athlete deleted successfully:", athlete);
        return res.status(200).json({ message: `Athlete with id ${id} deleted successfully` });
    } catch (error) {
        console.error("Error deleting athlete:", error);
        return res.status(500).json({ error: "Failed to delete athlete" });
    }
};

const handleDeleteEvent = async (req, res) => {
    try {
        const { id } = req.body; // Extract the id from the request body

        console.log("Deleting event with id:", id);

        // Find the event by id
        const event = await Events.findByPk(id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Delete the event from the database
        await event.destroy();

        console.log("Event deleted successfully:", event);
        return res.status(200).json({ message: `Event with id ${id} deleted successfully` });
    } catch (error) {
        console.error("Error deleting event:", error);
        return res.status(500).json({ error: "Failed to delete event" });
    }
};

const handleDeleteRegion = async (req, res) => {
    try {
        const { id } = req.body; // Extract the id from the request body

        console.log("Deleting region with id:", id);

        // Find the region by id
        const region = await Regions.findByPk(id);

        if (!region) {
            return res.status(404).json({ message: "Region not found" });
        }

        // Delete the region from the database
        await region.destroy();

        console.log("Region deleted successfully:", region);
        return res.status(200).json({ message: `Region with id ${id} deleted successfully` });
    } catch (error) {
        console.error("Error deleting region:", error);
        return res.status(500).json({ error: "Failed to delete region" });
    }
}

module.exports = {
    handleDeleteAthlete,
    handleDeleteEvent,
    handleDeleteRegion
};