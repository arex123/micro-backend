import mongoose from "mongoose";

const datetimeSchema = new mongoose.Schema({
    year: Number,
    month: Number,
    date: Number,
    hours: Number,
    minutes: Number,
    seconds: Number,
}, { timestamps: true });

datetimeSchema.index({ createdAt: -1 });

const Datetime = mongoose.model('Datetime', datetimeSchema);

export default Datetime;