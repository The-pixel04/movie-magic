import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

export default {
    async register(userData) {
        if (userData.email === '') {
            throw new Error('Email is required');
        }
        console.log('Registering user with email:', userData.email); // Add logging
        console.log('Passwords:', userData.password, userData.rePassword);
        
        if (userData.password !== userData.rePassword) {
            throw new Error('Passwords do not match');
        }

        const count = await User.countDocuments({ email: userData.email });

        if (count > 0) {
            throw new Error('Email already exists');
        }
        return User.create(userData);
    },
    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid password');
        }

        const payload = {
            _id: user._id,
            email: user.email,
        }
        const token = jwt.sign(payload, SECRET, { expiresIn: '2h' });
        return token;
    }
}