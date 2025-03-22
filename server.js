const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample user data (in a real app, use a database)
let users = [];

// Register endpoint
app.post("/register", (req, res) => {
    const { username, password, inviteCode } = req.body;

    if (!username || !password || !inviteCode) {
        return res.status(400).send("All fields are required.");
    }

    // Check if the user already exists
    const userExists = users.find((user) => user.username === username);
    if (userExists) {
        return res.status(400).send("User already exists.");
    }

    // Add the user to the database (in-memory array for this example)
    users.push({ username, password, inviteCode });
    res.status(201).send("User registered successfully!");
});

// Login endpoint
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Both username and password are required.");
    }

    // Verify user credentials
    const user = users.find((user) => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).send("Invalid credentials.");
    }

    res.status(200).send(`Welcome, ${username}!`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
