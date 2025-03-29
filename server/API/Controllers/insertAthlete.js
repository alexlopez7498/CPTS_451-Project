const Athletes = require("../Models/athlete");

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

module.exports = {
    handleAthlete,
};