import mongoose from "mongoose";

const datetimeSchema = new mongoose.Schema({
    year: Number,
    month: Number,
    date: Number,
    hours: Number,
    minutes: Number,
    seconds: Number,
}, { timestamps: true });

const Datetime = mongoose.model('Datetime', datetimeSchema);

export default Datetime;