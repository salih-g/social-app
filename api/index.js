import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import apiRoutes from './routes/api.js';
import postRoutes from './routes/posts.js';
import userRouter from './routes/user.js';

dotenv.config();
const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/api', apiRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() =>
		app.listen(PORT, () => {
			console.log('DB Connected!');
			console.log(`Server running on port: ${PORT}`);
		})
	)
	.catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
