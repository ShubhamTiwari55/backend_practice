import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.router.js';
import errorMiddleware from './middleware/error.middleware.js';
import morgan from 'morgan';
import paymentRoutes from './routes/payment.route.js'
import courseRoutes from './routes/course.routes.js'
import cloudinary from 'cloudinary';
const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: [process.env.FRONTEND_URL], // Replace with your frontend URL
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(morgan('dev'));

app.use(cors(corsOptions));

app.use('/ping', (req, res) => {
  res.send('pong');
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);

app.use(errorMiddleware);

app.all('*', (req, res, next) => {
  res.status(404).send('OOPS! 404 not found!');
});

export default app;
