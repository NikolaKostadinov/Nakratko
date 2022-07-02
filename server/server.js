import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const { PORT } = process.env;
const { DATA_LIMIT } = process.env;
const { DB_URI } = process.env;

const app = express();
app.use(express.json());

const bodyParserSettings = { limit: DATA_LIMIT, extended: true };
app.use(bodyParser.json(bodyParserSettings));
app.use(bodyParser.urlencoded(bodyParserSettings));

app.use(cors( ));
app.get('/', (request, response) => {
	response.send('SERVER ALL RIGHT');
});

mongoose.connect(DB_URI, () => {
	app.listen(PORT, () => {
		console.log(`SERVER RUNNING ON PORT::${PORT}`);
	});
});