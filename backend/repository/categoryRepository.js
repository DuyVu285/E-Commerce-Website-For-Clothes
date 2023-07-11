const connection = require("../connection");

// Repository code goes here
const getCategory = async (req, res) => {
  try {
    const category = await connection.find();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
