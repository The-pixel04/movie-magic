import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = '6791460f2cb80a2e492ecb56iv4';

export default {
    register(userData) {
        return User.create(userData);
    },
    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('User not found');
        }

        const payload = {
            _id: user._id,
            email: user.email,
        }
        const token = jwt.sign(payload, SECRET, { expiresIn: '2h' });
        return token;
    }
}