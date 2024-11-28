const Pickup = require('../models/Pickup');
const Issue = require('../models/Issue');

exports.generateReport = async (req, res) => {
  try {
    const { reportType, startDate, endDate, wasteType, communityId } = req.body;

    // Validate inputs
    if (!reportType) {
      return res.status(400).json({ message: 'Report type is required.' });
    }

    const query = {};
    if (startDate && endDate) {
      query.pickupDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (wasteType) {
      query.wasteTypes = wasteType;
    }
    if (communityId) {
      query.communityId = communityId;
    }

    let data;

    switch (reportType) {
      case 'pickup_statistics':
        data = await Pickup.aggregate([
          { $match: query },
          { $unwind: '$wasteTypes' },
          {
            $group: {
              _id: '$wasteTypes',
              count: { $sum: 1 }
            }
          },
          { $project: { wasteType: '$_id', count: 1, _id: 0 } }
        ]);
        break;

      case 'issues_reported':
        data = await Issue.aggregate([
          { $match: query },
          {
            $group: {
              _id: '$issueType',
              count: { $sum: 1 }
            }
          },
          { $project: { issueType: '$_id', count: 1, _id: 0 } }
        ]);
        break;

      case 'recycling_rates':
        const totalWaste = await Pickup.aggregate([
          { $match: query },
          { $unwind: '$wasteTypes' },
          { $group: { _id: null, count: { $sum: 1 } } }
        ]);

        const recyclableWaste = await Pickup.aggregate([
          { $match: { ...query, wasteTypes: 'recyclable' } },
          { $group: { _id: null, count: { $sum: 1 } } }
        ]);

        const totalCount = totalWaste[0]?.count || 0;
        const recyclableCount = recyclableWaste[0]?.count || 0;
        const recyclingRate = totalCount > 0 ? (recyclableCount / totalCount) * 100 : 0;

        data = { totalCount, recyclableCount, recyclingRate };
        break;

      default:
        return res.status(400).json({ message: 'Invalid report type.' });
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return res.status(404).json({
        message: 'No sufficient data to generate the report. Try a different date range or parameters.'
      });
    }

    res.json({ reportType, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};


