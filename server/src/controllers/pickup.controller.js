const Pickup = require('../models/Pickup');
const Community = require('../models/Community');

// Fetch community pickup schedule
exports.getSchedule = async (req, res) => {
  try {
    const { communityId } = req.user; // Ensure communityId is extracted correctly
    if (!communityId) {
      return res.status(400).json({ message: 'User is not associated with any community.' });
    }
    console.log('Community ID from user:', communityId);


    const community = await Community.findById(communityId); // Fetch the community document
    if (!community) {
      return res.status(404).json({ message: 'Community not found.' });
    }

    res.json({ schedule: community.pickupSchedule });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Schedule a waste pickup
exports.schedulePickup = async (req, res) => {
  try {
    const { userId, communityId } = req.user; // Assume these are available from JWT middleware
    const { pickupDate, wasteTypes, address } = req.body;

    // Validate waste types
    if (!wasteTypes || wasteTypes.length === 0) {
      return res.status(400).json({ message: 'Please select at least one type of waste.' }); // 7a
    }

    // Create and save the pickup request
    const pickup = new Pickup({
      userId,
      communityId,
      pickupDate,
      wasteTypes,
      address
    });

    await pickup.save();

    res.status(201).json({ message: 'Pickup scheduled successfully.', pickup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
