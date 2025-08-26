import MilkingSession from "../models/MilkingSession.js";

export const createSession = async (req, res, next) => {
  try {
    const { start_time, end_time, duration, milk_quantity } = req.body;

    if (!start_time || !end_time || milk_quantity == null) {
      const error = new Error(
        "start time, end time and milk quantity are required."
      );
      error.statusCode = 400;
      throw error;
    }

    const startDate = new Date(start_time);
    const endDate = new Date(end_time);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      const error = new Error(
        "Invalid date format for start_time or end_time."
      );
      error.statusCode = 400;
      throw error;
    }

    if (endDate <= startDate) {
      const error = new Error("end_time must be after start_time.");
      error.statusCode = 400;
      throw error;
    }

    if (typeof milk_quantity !== "number" || milk_quantity <= 0) {
      const error = new Error("milk_quantity must be a positive number.");
      error.statusCode = 400;
      throw error;
    }

    if (typeof duration !== "number" || duration <= 0) {
      const error = new Error("duration must be a positive number.");
      error.statusCode = 400;
      throw error;
    }

    const session = new MilkingSession({
      start_time: startDate,
      end_time: endDate,
      duration: duration,
      milk_quantity,
    });

    await session.save();
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
};

export const getSessions = async (req, res, next) => {
  try {
    const sessions = await MilkingSession.find().sort({ created_at: -1 });
    res.json(sessions);
  } catch (error) {
    next(error);
  }
};
