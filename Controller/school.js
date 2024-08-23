const School = require("../model/school");

const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

console.log(name , address)
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newSchool = new School({ name, address, latitude, longitude });
    await newSchool.save();

    res.status(201).json({ message: 'School added successfully', school: newSchool });
  } catch (err) {
    console.error('Error adding school:', err);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', details: err.message });
    }
    
    res.status(500).json({ message: 'An error occurred while adding the school' });
  }
};

module.exports = addSchool;
