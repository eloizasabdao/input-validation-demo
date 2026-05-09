const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const validateUser = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields (name, email, password) are required."
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format. Please provide a valid email."
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters long."
        });
    }

    next();
};


app.post('/register', validateUser, (req, res) => {
    res.status(201).json({
        success: true,
        message: "User registered successfully!"
    });
});

app.listen(PORT, () => {
    console.log(`Validation Server running on http://localhost:${PORT}`);
});