import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next()
    }

    try {
        const decodedToken = jwt.verify(token, SECRET);
        req.user = decodedToken;

        res.locals.user = decodedToken;
    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }

    next();
};