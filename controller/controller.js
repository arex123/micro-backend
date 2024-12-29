import Datetime from '../models/datetimeModel.js';

export const saveDatetime = async (req, res) => {
    const { year, month, date, hours, minutes, seconds } = req.query;

    // Validate input
    if (!year || !month || !date || !hours || !minutes || !seconds) {
        return res.status(400).send('Please provide complete date-time details.');
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
            message: 'Date and time data saved successfully',
            data: savedData,
        });
    } catch (error) {
        console.error('Error saving data:', error.message);
        res.status(500).send('Error saving data to the database.');
    }
};