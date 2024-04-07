const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/backend-database')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Train schema
const TrainSchema = new mongoose.Schema({
    trainName: String,
    departure: String,
    arrival: String,
    ticketPrice: Number,
    from: String,
    where: String
});

// Define User schema
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    // Add other fields as needed
});

// Create Train model
const Train = mongoose.model('Train', TrainSchema);

// Create User model
const User = mongoose.model('User', UserSchema);

// Signup endpoint
app.post("/signup", async (req, res) => {
    //take informaition
    const { username, email, password } = req.body;

    try {
        
        // Create a new user
        const newUser = await User.create({ username, email, password });

        // Return success response
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        // Handle errors
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Endpoint to create a new train document
app.post('/trains', async (req, res) => {
    try {
        const newTrain = await Train.create(req.body);
        res.json(newTrain);
    } catch (error) {
        console.error('Error creating train:', error);
        res.status(500).json({ error: 'Error creating train' });
    }
});

// Endpoint to fetch all trains
app.get('/trains', async (req, res) => {
    try {
        const trains = await Train.find();
        res.json(trains);
    } catch (error) {
        console.error('Error fetching trains:', error);
        res.status(500).json({ error: 'Error fetching trains' });
    }
});

// Login endpoint
app.post("/login", async (req, res) => {
    try {
        // Extract email and password from the request body
        const { username, password } = req.body;

        // Find the user by email in the database
        console.log("username sent by client", username)
        const user = await User.findOne({ username });

        // Check if the user exists
        if (!user) {
            // User not found, return a 404 status
            return res.status(404).json({ message: 'User not found' });
        }

        console.log(password,user.password)
        if (password !== user.password) {
            // Password doesn't match, return a 401 status
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // If the email and password are correct, return the user data
        res.status(200).json(user);
    } catch (error) {
        // Handle any errors
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to fetch user by ID
app.get('/users', async (req, res) => {
    try {
        const userId = req.query.userId; // Retrieve user ID from the query parameters
  
        // Retrieve user information based on the user ID
        const user = await User.findOne({ _id: userId });
  
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
  
        // If user exists, return the user information
        res.json(user);
    } catch (error) {
        // Handle error
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint to fetch a train by ID
app.get('/train/:id', async (req, res) => {
    try {
        const trainId = req.params.id; // Retrieve train ID from the request parameters
  
        // Retrieve train information based on the train ID
        const train = await Train.findById(trainId);
  
        // Check if the train exists
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }
  
        // If train exists, return the train information
        res.json(train);
    } catch (error) {
        // Handle error
        console.error('Error fetching train details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint to send booking confirmation email
app.post('/send-email', async (req, res) => {
    try {
        const { trainname ,to,where, arrival, departure, ticketPrice, email, Mobile, username, state, travellersData,  } = req.body;

        const transporter = nodemailer.createTransport({
            host: 'smtp.elasticemail.com',
            port: 2525,
            secure: false,
            auth: {
                user: 'mohammedlokhand2021@gmail.com',
                pass: '7478D7631F14030E1603D43578B0AABFC3B5',
            },
        });

        const mailOptions = {
            from: 'mohammedlokhand2021@gmail.com',
            to: email,
            subject: 'Ticket Confirmation | IRCTC',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f2f2f2;">
                    <h1 style="color: #007bff; text-align: center; margin-bottom: 20px;">Ticket Confirmation | IRCTC</h1>
                    <p>Dear Customer,</p>
                    <p>Thank you for using IRCTC's online rail reservation facility. Your e-ticket has been booked and the details are indicated below.</p>
                    <br>
                    <p>Booking details:</p>
                    <p>Train Name: ${trainname} | Train No: {trainNo} </p>
                    <p>Train Name:{trainName} | From:${where} | To: ${to} | Date: {date}</p>
                    <p>Class: {classType} | Boarding Point: {boardingPoint} | Reservation Upto: {reservationUpto} | Quota: {quota}</p>
                    <br>
                    <p>Passenger Details:</p>
                    <table border="1" cellpadding="5" cellspacing="0">
                        <thead>
                            <tr>
                                <th>S#</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Sex</th>
                                <th>Seat/Berth</th>
                                <th>Coach</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        
                    </table>
                    <p>Total Fare: ${Train.ticketPrice} </p>
                    <br>
                    <p>For cancellation of your ticket, please log in to your account, select the PNR you wish to cancel, and cancel your ticket online. Cancellation of your e-Ticket is possible only on the website <a href="https://www.irctc.co.in/">www.irctc.co.in</a>, and is NOT possible on PRS Counters.</p>
                    <p>Once you have cancelled your ticket, the fresh details and changes made by you will be available on the Cancelled e-Tickets History.</p>
                    <br>
                    <p>Passengers are advised not to carry inflammable/dangerous/explosive articles as part of their luggage and also to desist from smoking in the trains.</p>
                    <br>
                    <p>For any further assistance, please contact us at 24*7 Hrs. Customer Support at 011-39340000 or mail us at <a href="mailto:care@irctc.co.in">care@irctc.co.in</a>.</p>
                    <p>Just dial 139 from your landline, mobile & CDMA phones for railway enquiries.</p>
                    <br>
                    <p>Warm Regards,</p>
                    <p>Customer Care Internet Ticketing IRCTC</p>
                    <br>
                    <hr>
                    <div style="font-size: 12px;">
                        <p>For any enquiries or information regarding your transaction with IRCTC, do not provide your credit/debit card details by any means to IRCTC. All your queries can be replied on the basis of 10 digit IRCTC Transaction id/ PNR no./User id.</p>
                        <p>IRCTC does not store the credit/debit card information in any form during the transaction.</p>
                    </div>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent:', info.messageId);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
