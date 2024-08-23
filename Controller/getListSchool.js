const School = require("../model/school");

const listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);
console.log(lat , lon)
  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ message: "User's latitude and longitude are required and must be valid numbers" });
  }

  try {
   
    const schools = await School.find();
    const schoolsWithDistance = schools.map(school => {
      const distance = calculateDistance(lat, lon, school.latitude, school.longitude);
      return { ...school.toObject(), distance };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json({ schools: schoolsWithDistance });
  } catch (err) {
    console.error("Error listing schools:", err);
    res.status(500).json({ message: "An error occurred while fetching schools" });
  }
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Radius 
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance (km)
}

module.exports = listSchools;
