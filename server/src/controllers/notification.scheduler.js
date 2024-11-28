const schedule = require('node-schedule');
const Notification = require('../models/Notification');
const Pickup = require('../models/Pickup');
const User = require('../models/User');

// Function to generate pickup reminders
const generatePickupReminders = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const pickups = await Pickup.find({pickupDate: tomorrow});

  for (const pickup of pickups) {
    const user = await User.findById(pickup.userId);

    const notification = new Notification({
      userId: user._id,
      communityId: user.communityId,
      notificationType: 'pickup_reminder',
      message: `Reminder: Your scheduled waste pickup is tomorrow (${pickup.pickupDate.toDateString()}).`
    });

    await notification.save();
  }

  console.log(`Pickup reminders generated for ${tomorrow.toDateString()}`);
};

// Schedule the reminder generation every day at 8 AM
const schedulePickupReminders = () => {
  schedule.scheduleJob('0 8 * * *', generatePickupReminders); // Cron: "At 08:00 every day"
};

module.exports = {schedulePickupReminders};
