require('express');

// Register a new user
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Community = require('../models/Community');
const nodemailer = require('nodemailer'); // For email notifications


exports.register = async (req, res) => {
  try {
    const {fullName, contactNumber, email, communityName, address, role, pickupSchedule} = req.body;

    // Check if email is already registered
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: 'Email is already registered.'}); // Line 3a
    }

    // Check or create the community
    let community = await Community.findOne({name: communityName});
    if (!community) {
      if (role !== 'admin') {
        return res.status(400).json({message: 'Community not found. Only admins can create a new community.'}); // Line 3b
      }

      // Create a new community if not found
      community = new Community({
        name: communityName,
        address,
        pickupSchedule, // Expecting an array of { day: "Monday", time: "9:00 AM" }
        adminId: null
      });
      await community.save();
    }

    // Generate a default password and hash it
    const defaultPassword = Math.random().toString(36).slice(-8); // Generate random password
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Create and save the user
    const user = new User({
      fullName,
      contactNumber,
      email,
      password: hashedPassword,
      communityId: community._id,
      address,
      role
    });
    await user.save();

    // Assign admin to community
    if (role === 'admin') {
      community.adminId = user._id;
      await community.save();
    }

    // Send an email with the default password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const mailOptions = {
      from: {
        name: 'Waste Management System',
        address: process.env.GMAIL_USER
      },
      to: email,
      subject: 'Welcome to Waste Management System',
      text: `Hello ${fullName},\n\nYour account has been created successfully.\nYour default password is: ${defaultPassword}\n\nPlease log in and update your password.\n\nThank you!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({message: 'User registered successfully.'});

    // For testing purposes
    console.log('Password:', defaultPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error.'});
  }
};


// Log in a user
exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;

    // Check if user exists
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({message: 'Invalid email or password.'});
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message: 'Invalid email or password.'});
    }

    // Generate JWT token
    const token = jwt.sign({userId: user._id, communityId: user.communityId},
      process.env.JWT_SECRET,
      {expiresIn: '1h'});

    res.json({message: 'Logged in successfully.', token});
  } catch (error) {
    res.status(500).json({message: 'Server error.'});
  }
};
