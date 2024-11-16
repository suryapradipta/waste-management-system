const Pickup = require('../models/Pickup');
const Community = require('../models/Community');

// Fetch community pickup schedule
exports.getSchedule = async (req, res) => {
  try {
    const {communityId} = req.user; // Ensure communityId is extracted correctly
    if (!communityId) {
      return res.status(400).json({message: 'User is not associated with any community.'});
    }

    const community = await Community.findById(communityId); // Fetch the community document
    if (!community) {
      return res.status(404).json({message: 'Community not found.'});
    }

    res.json({schedule: community.pickupSchedule});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error.'});
  }
};

// Schedule a waste pickup
exports.schedulePickup = async (req, res) => {
  try {
    const {userId, communityId} = req.user; // Assume these are available from JWT middleware
    const {pickupDate, wasteTypes, address} = req.body;

    // Validate waste types
    if (!wasteTypes || wasteTypes.length === 0) {
      return res.status(400).json({message: 'Please select at least one type of waste.'}); // 7a
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

    res.status(201).json({message: 'Pickup scheduled successfully.', pickup});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error.'});
  }
};

exports.getPickupHistory = async (req, res) => {
  try {
    const {userId} = req.user; // Extracted from JWT middleware
    const {startDate, endDate, wasteType, sortBy} = req.query;

    // Build query conditions
    const query = {userId};
    if (startDate && endDate) {
      query.pickupDate = {$gte: new Date(startDate), $lte: new Date(endDate)};
    }
    if (wasteType) {
      query.wasteTypes = wasteType; // Match specific waste type
    }

    // Build sorting options
    const sortOptions = {};
    if (sortBy === 'date') {
      sortOptions.pickupDate = 1; // Sort by date ascending
    } else if (sortBy === 'type') {
      sortOptions['wasteTypes.0'] = 1; // Sort by first waste type
    }

    // Fetch pickup history
    const pickups = await Pickup.find(query).sort(sortOptions);

    if (pickups.length === 0) {
      return res.status(404).json({message: 'No pickup history found.'}); // 3a, 5a
    }

    res.json({pickups});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error.'});
  }
};

// exports.getPickupChartData = async (req, res) => {
//   try {
//     const { userId } = req.user;
//
//     // Fetch user's pickup history
//     const pickups = await Pickup.find({ userId });
//
//     if (!pickups.length) {
//       return res.status(404).json({ message: 'No pickup data available.' });
//     }
//
//     // Format the data for charting
//     const chartData = pickups.reduce((acc, pickup) => {
//       const date = pickup.pickupDate.toISOString().split('T')[0]; // Format date (YYYY-MM-DD)
//
//       if (!acc[date]) {
//         acc[date] = { date, household: 0, recyclable: 0, hazardous: 0 };
//       }
//
//       pickup.wasteTypes.forEach((type) => {
//         if (type === 'household') acc[date].household++;
//         if (type === 'recyclable') acc[date].recyclable++;
//         if (type === 'hazardous') acc[date].hazardous++;
//       });
//
//       return acc;
//     }, {});
//
//     // Convert object to an array and sort by date
//     const formattedData = Object.values(chartData).sort((a, b) => new Date(a.date) - new Date(b.date));
//
//     res.json({ chartData: formattedData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };

exports.getPickupChartData = async (req, res) => {
  try {
    const { userId } = req.user;
    const { startDate, endDate, wasteType } = req.query;

    // Build query conditions
    const query = { userId };
    if (startDate && endDate) {
      query.pickupDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (wasteType) {
      query.wasteTypes = wasteType; // Filter for a specific waste type
    }

    // Fetch and group data
    const pickups = await Pickup.find(query);

    if (!pickups.length) {
      return res.status(404).json({ message: 'No pickup data available for the selected filters.' });
    }

    const chartData = pickups.reduce((acc, pickup) => {
      const date = pickup.pickupDate.toISOString().split('T')[0]; // Format date (YYYY-MM-DD)

      if (!acc[date]) {
        acc[date] = { date, household: 0, recyclable: 0, hazardous: 0 };
      }

      pickup.wasteTypes.forEach((type) => {
        if (type === 'household') acc[date].household++;
        if (type === 'recyclable') acc[date].recyclable++;
        if (type === 'hazardous') acc[date].hazardous++;
      });

      return acc;
    }, {});

    const formattedData = Object.values(chartData).sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({ chartData: formattedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};



