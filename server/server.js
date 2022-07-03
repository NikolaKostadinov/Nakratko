import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import adminRouter from './routes/admin.routes.js';
import bookRouter from './routes/book.routes.js';
import userRouter from './routes/user.routes.js';
import paymentRouter from './routes/payment.routes.js';

import * as serverController from './controllers/server.controller.js';

dotenv.config();
const {
	PORT,
	DATA_LIMIT,
	DB_URI
} = process.env;

const app = express();
app.use(express.json());

const bodyParserSettings = { 
	limit: DATA_LIMIT,
	extended: true
};
app.use(bodyParser.json(bodyParserSettings));
app.use(bodyParser.urlencoded(bodyParserSettings));

app.use(cors());

app.use(helmet());

app.get('/', serverController.serverCheck);
app.use('/admin', adminRouter);
app.use('/books', bookRouter);
app.use('/users', userRouter);
app.use('/payment', paymentRouter);
app.use('*', serverController.nonExisting);

mongoose.connect(DB_URI, () => {
	app.listen(PORT, () => {
		console.log(`NAKRATKO WEB SERVER RUNNING ON PORT:${PORT}`);
	});
});