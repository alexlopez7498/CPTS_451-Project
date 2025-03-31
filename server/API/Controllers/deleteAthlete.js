const Athletes = require("../Models/athlete");

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

module.exports = {
    handleDeleteAthlete,
};