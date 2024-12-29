import Datetime from "../models/dateTimeModel.js";

export const backendCheck = (req, res) => {
  console.log("backend in up");
  res.json({
    message: "Your backend is running",
  });
};

export const saveDatetime = async (req, res) => {
  const { year, month, date, hours, minutes, seconds } = req.query;

  // Validate input
  if (!year || !month || !date || !hours || !minutes || !seconds) {
    return res.status(400).send("Please provide complete date-time details.");
  }

  try {
    // Save data to MongoDB
    const newDatetime = new Datetime({
      year: parseInt(year),
      month: parseInt(month),
      date: parseInt(date),
      hours: parseInt(hours),
      minutes: parseInt(minutes),
      seconds: parseInt(seconds),
    });
    const savedData = await newDatetime.save();

    res.json({
      message: "Date and time data saved successfully",
      data: savedData,
    });
  } catch (error) {
    console.error("Error saving data:", error.message);
    res.status(500).send("Error saving data to the database.");
  }
};

export const fetchRecent = async (req, res) => {
  try {
    
    const latestDatetime = await Datetime.findOne()
      .sort({ createdAt: -1 })
      .lean();

    if (!latestDatetime) {
      return res.status(404).json({ message: "No documents found" });
    }

    res.status(200).json(latestDatetime);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getPaginatedDatetimes = async (req, res) => {
    const page = parseInt(req.query.page) || 1;  
    const limit = parseInt(req.query.limit) || 20; 
  
    try {
      
      const datetimes = await Datetime.find()
        .sort({ createdAt: -1 }) 
        .skip((page - 1) * limit)
        .limit(limit); 
      
      const totalCount = await Datetime.countDocuments();
  
      res.status(200).json({
        datetimes,
        totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };