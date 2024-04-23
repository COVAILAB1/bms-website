import Dashboard from "../models/Dashboard.js";

export const createBMS = async (req, res, next) => {
  try {
    const { temperature, humidity, voltage, batteryPercentage } = req.body;
    if (!temperature || !humidity || !voltage || !batteryPercentage) {
      throw new Error("all field required");
    }
    const mongoResults = await Dashboard.find({
      temperature,
      humidity,
      voltage,
    });

    if (mongoResults.length > 0) {
      throw new Error("Data Already Existed in our Database");
    }
    const response = await Dashboard.create({
      humidity,
      temperature,
      voltage,
      batteryPercentage,
    });

    res.json({
      success: true,
      status: 200,
      data: response,
      message: "data created successfully",
    });
  } catch (e) {
    next(e);
  }
};

export const getData = async (req, res, next) => {
  try {
    const mongoData = await Dashboard.find();
    // if (mongoData.data.length() == 0)
    //   throw new Error("No Data present in Database");

    res.json({
      success: true,
      status: 200,
      data: mongoData,
      message: "data fetched successfully",
    })
  } catch (err) {
    next(err);
  }
};
