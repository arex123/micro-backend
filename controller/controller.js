import mongoose from "mongoose";
import Datetime from "../models/dateTimeModel.js";
import DataModel from "../models/Dataschema.js";

export const backendCheck = (req, res) => {
  console.log("backend in up");
  res.json({
    message: "Your backend is running",
  });
};


let clients = [];

export const sseHandler = (req, res) => {
  console.log("15")
  try{
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    
    console.log("21")
    clients.push(res);
    
    // Removing clients  on connection getting closed
    req.on("close", () => {
      clients = clients.filter(client => client !== res);
    });
    
    console.log("29")
  }catch(err){
    console.log("err ",err)
  }
};

const notifyClients = (data) => {
  // Send the data to all connected clients
  clients.forEach(client => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};



export const saveDatetime = async (req, res) => {
  console.log("saving")
  const { year, month, date, hours, minutes, seconds } = req.query;

  if (!year || !month || !date || !hours || !minutes || !seconds) {
    return res.status(400).send("Please provide complete date-time details.");
  }

  try {
    const newDatetime = new Datetime({
      year: parseInt(year),
      month: parseInt(month),
      date: parseInt(date),
      hours: parseInt(hours),
      minutes: parseInt(minutes),
      seconds: parseInt(seconds),
    });

    const savedData = await newDatetime.save();

    // Notify all SSE clients about the new data
    notifyClients(savedData);
    console.log("saved")

    const data = await DataModel.findOne();

    res.json({
      message: "Date and time data saved successfully",
      data:{
        date:savedData,
        state:data ? data.value : 0
      } 
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
    console.error("err while fetching recent: ",err);

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