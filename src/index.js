import express from 'express'
import handlebars from 'express-handlebars'
import expressSession from 'express-session';
import routes from './routes.js';
import showRating from './helpers/ratingHelper.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middlewares/authMiddleware.js';
import 'dotenv/config';
import { tempData } from './middlewares/tempDataMiddleware.js';

const app = express();

try {
    const uri = 'mongodb://localhost:27017/magic-movies';
    await mongoose.connect(uri);
    console.log('Db Connected successfuly');
} catch (err) {
    console.log('Db cannot connect');
    console.error(err.message);
}

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    },
    helpers: {
        showRating: showRating
    }
}));

app.set('view engine', 'hbs');
app.set('views', './src/views')

app.use('/static', express.static('src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }
}));
app.use(authMiddleware);
app.use(tempData);
app.use(routes);


app.listen(5001, () => console.log('Server is listening on port http://localhost:5001...'));