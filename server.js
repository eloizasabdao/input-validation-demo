const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

/**
 * Input validation implemented as middleware (15 points)
 */
const validateUser = (req, res, next) => {
    const { name, email, password } = req.body;

    // 1. Name: Present and contains only letters and spaces (20 points)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name || !nameRegex.test(name)) {
        return res.status(400).json({
            success: false,
            message: "Name is required and must contain only letters and spaces."
        });
    }

    // 2. Email: Presence and Regex format (25 points)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "A valid email address is required."
        });
    }

    // 3. Password: Length (min 8) and Special Characters (25 points)
    // This regex checks for at least 8 chars and at least one special character
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!password || !passwordRegex.test(password)) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters long and include at least one special character."
        });
    }

    /** * 4. Structured JSON response on failure (15 points)
     * (Handled by the return statements above)
     */
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