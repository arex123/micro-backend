import mongoose from "mongoose";


const DataSchema = new mongoose.Schema({
    value: Number,
  });
  const DataModel = mongoose.model("Data", DataSchema);

  export default DataModel