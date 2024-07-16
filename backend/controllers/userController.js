

import User from '../models/User.js';

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Do not send password
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getUserName = async (userId) => {
  try {
    const user = await User.findById(userId).select('name');
    return user ? user.name : null;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

export const getNearbyStudents = async (req, res) => {
  try{
    const {metro}=req.params;
    const nearbyStudents=await User.find({'metro.name':metro}).select('name college metro location');
    res.json(nearbyStudents);
  }
  catch (error) {
    console.error('Error fetching nearby students:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
