const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const userRoutes = require('./src/routes/user.route');
const pickupRoutes = require('./src/routes/pickup.route');
const issueRoutes = require('./src/routes/issue.route');
const notificationRoutes = require('./src/routes/notification.route');

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use('/api/users', userRoutes);
app.use('/api/pickups', pickupRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/notifications', notificationRoutes);

module.exports = app;
