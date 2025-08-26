import MilkingSession from "../models/MilkingSession";

export const createSession = async (req, res) => {
  try {
    const { start_time, end_time, milk_quantity } = req.body;

    if (!start_time || !end_time || milk_quantity == null) {
      return res
        .status(400)
        .json({
          error: "start_time, end_time, and milk_quantity are required.",
        });
    }

    const startDate = new Date(start_time);
    const endDate = new Date(end_time);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format." });
    }

    if (endDate <= startDate) {
      return res
        .status(400)
        .json({ error: "end_time must be after start_time." });
    }

    const duration = Math.floor((endDate - startDate) / 1000);

    if (typeof milk_quantity !== "number" || milk_quantity <= 0) {
      return res
        .status(400)
        .json({ error: "milk_quantity must be a positive number." });
    }

    const session = new MilkingSession({
      start_time: startDate,
      end_time: endDate,
      duration,
      milk_quantity,
    });

    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSessions = async (req, res) => {
  try {
    const sessions = await MilkingSession.find().sort({ created_at: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
