const Athletes = require("../Models/athlete");
const Events = require("../Models/event");
const Regions = require("../Models/region");

const handleModifyAthlete = async (req, res) => {
  const { id, name, sex, age, height, weight, noc } = req.body;

  try {
    const updatedAthlete = await Athletes.findByIdAndUpdate(
      id,
      {
        name,
        sex,
        age: age || null,
        height: height || null,
        weight: weight || null,
        noc
      },
      { new: true }
    );
    if (!updatedAthlete) {
      return res.status(404).json({ error: "Athlete not found" });
    }

    res.json({
      message: "Athlete updated successfully",
      athlete: updatedAthlete
    });
  } catch (error) {
    console.error("Error updating athlete:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleModifyEvent = async (req, res) => {
  const { id, Event, Sport, City, Season, Year } = req.body;

  try {
    const updatedEvent = await Events.findByIdAndUpdate(
      id,
      {
        Event,
        Sport,
        City,
        Season,
        Year
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({
      message: "Event updated successfully",
      event: updatedEvent
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleModifyRegion = async (req, res) => {
  const { id, noc, region, notes } = req.body;

  try {
    const updatedRegion = await Regions.findByIdAndUpdate(
      id,
      {
        noc,
        region,
        notes: notes || null
      },
      { new: true }
    );

    if (!updatedRegion) {
      return res.status(404).json({ error: "Region not found" });
    }

    res.json({
      message: "Region updated successfully",
      region: updatedRegion
    });
  } catch (error) {
    console.error("Error updating region:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleModifyAthlete,
  handleModifyEvent,
  handleModifyRegion,
};